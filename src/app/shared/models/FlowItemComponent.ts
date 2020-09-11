import { IconWarning, IconError, Utils } from "code-easy-components";

import { ContextModalListService } from "../components/context-modais/ContextModalListService";
import { EFlowItemType, EItemType, IConnection } from "../components/flow-editor";
import { IProperty, TypeOfValues } from "../components/properties-editor";
import { ITreeItem } from "../components/tree-manager";
import { IFlowItemComponent } from "../interfaces";
import { DefaultPropsHelper } from "../services";
import { PropertieTypes } from "../enuns";

export class FlowItemComponent implements IFlowItemComponent {
    public flowItemType: EFlowItemType = EFlowItemType.acorn;
    public isEnabledNewConnetion: boolean = false;
    public itemType: EItemType = EItemType.START;
    public connections: IConnection[] = [];
    public properties: IProperty[] = [];
    public isSelected: boolean = false;
    public hasWarning: boolean = false;
    public isDisabled: boolean = false;
    public hasError: boolean = false;
    public description: string = '';
    public id: string | undefined;
    public icon: any = undefined;
    public height: number = 40;
    public label: string = '';
    public width: number = 40;
    public name: string = "";
    public left: number = 0;
    public top: number = 0;

    constructor(
        private _fields: {
            connections: IConnection[],
            properties?: IProperty[],
            id: string | undefined,
            description?: string,
            isDisabled?: boolean,
            hasWarning?: boolean,
            isSelected: boolean,
            itemType: EItemType,
            hasError?: boolean,
            label?: string,
            name: string,
            left: number,
            top: number,
            icon?: any,
        },
    ) {
        this.isDisabled = _fields.isDisabled || false;
        this.hasWarning = _fields.hasWarning || false;
        this.description = _fields.description || '';
        this.properties = _fields.properties || [];
        this.hasError = _fields.hasError || false;
        this.connections = _fields.connections;
        this.isSelected = _fields.isSelected;
        this.itemType = _fields.itemType;
        this.label = _fields.label || '';
        this.name = _fields.name;
        this.icon = _fields.icon;
        this.left = _fields.left;
        this.top = _fields.top;
        this.id = _fields.id;

        this._updateProperties(this._fields.properties || [], this._fields.itemType);
        this.getProblems();
    }

    public getProblems(): ITreeItem[] {
        let problems: ITreeItem[] = [];
        this.hasWarning = false;
        this.hasError = false;

        const addProblem = (label: string, type: 'warning' | 'error') => {
            problems.push({
                icon: type === 'warning' ? IconWarning : IconError,
                isDisabledSelect: true,
                nodeExpanded: false,
                isSelected: false,
                id: undefined,
                iconSize: 15,
                type: "ITEM",
                label,
            });
        }

        // Se for diferente de END e COMMENT valida se tem sucessores
        if ((this.itemType !== EItemType.END && this.itemType !== EItemType.COMMENT) && this.connections.length === 0) {
            addProblem(`The flow item "${this.name}" is missing a connector`, 'error');
            this.hasError = true;
        }

        // Valida o name
        if (this.name === '') {
            addProblem(`We do not recommend that the flow item be empty in "${this.name}"`, 'error');
            this.properties.filter(prop => prop.propertieType === PropertieTypes.label).forEach(prop => prop.valueHasError = true);
            this.hasError = true;
        } else if (this.name.length < 3) {
            addProblem(`A suitable name for a stream item must be longer than 3 characters in "${this.name}"`, 'warning');
            this.properties.filter(prop => prop.propertieType === PropertieTypes.label).forEach(prop => { prop.valueHasWarning = true; prop.valueHasError = false });
            this.hasWarning = true;
        } else if (this.name.length > 20 && this.itemType !== EItemType.COMMENT) {
            addProblem(`A suitable name for a stream item must be less than 20 characters in "${this.name}"`, 'warning');
            this.properties.filter(prop => prop.propertieType === PropertieTypes.label).forEach(prop => { prop.valueHasWarning = true; prop.valueHasError = false });
            this.hasWarning = true;
        } else {
            this.properties.filter(prop => prop.propertieType === PropertieTypes.label).forEach(prop => { prop.valueHasWarning = false; prop.valueHasError = false });
        }

        // Valida condições para itens específico
        switch (this.itemType) {

            case EItemType.ASSIGN:
                this.properties.filter(prop => prop.propertieType === PropertieTypes.assigns).forEach(prop => {
                    prop.valueHasError = false;
                    prop.nameHasError = false;

                    if (prop.name !== '' && prop.value === '') {
                        addProblem(`In the "${this.name}" item, no value is being assigned to the "${prop.name}"`, 'error');
                        prop.valueHasError = true;
                    } else if (prop.name === '' && prop.value !== '') {
                        addProblem(`In ${this.name} the value "${prop.value}" is not being assigned to any variable or parameter`, 'error');
                        prop.nameHasError = true;
                    }
                });
                break;

            case EItemType.SWITCH:
                this.properties.filter(prop => prop.propertieType === PropertieTypes.condition).forEach(prop => {
                    prop.valueHasError = false;

                    if (prop.value === '') {
                        addProblem(`In the "${this.name}" item, the "${prop.name}" condition must have an informed expression`, 'error');
                        prop.valueHasError = true;
                    }

                });
                break;

            case EItemType.IF:

                // Valida a condition do IF
                this.properties.filter(prop => prop.propertieType === PropertieTypes.condition).forEach(prop => {
                    prop.valueHasError = false;
                    if (prop.value === '') {
                        addProblem(`In the "${this.name}" item, the "${prop.name}" condition must have an informed expression`, 'error');
                        prop.valueHasError = true;
                        this.hasError = true;
                    }
                });
                // Valida as connection
                if (this.connections.length >= 1 && this.connections.length < 2) {
                    addProblem(`Flow item "${this.name}" is missing a connector`, 'error');
                    this.hasError = true;
                }

                break;

            case EItemType.END:
                // Nada para validar aqui
                break;

            case EItemType.ACTION:
                // Nada para validar aqui ainda
                break;

            case EItemType.FOREACH:
                // Nada para validar aqui ainda
                break;

            default: break;

        }

        // Valida as propriedades
        this.properties.forEach(prop => {
            prop.valueHasError = false;

            // Valida se action está com o campo "action" vazio.
            if (prop.propertieType === PropertieTypes.action && prop.value === "") {
                addProblem(`The flow item "${this.name}" must have a valid value in the "${prop.name}" field.`, 'error');
                prop.valueHasError = true;
                this.hasError = true;
            }

        });

        if (problems.length <= 1) {
            return problems;
        } else {
            const newId = Utils.getUUID();
            return [
                ...problems.map(problem => ({ ...problem, ascendantId: newId })),
                {
                    // icon: this.hasError ? IconError : IconWarning,
                    label: `Inconsistences in flow item "${this.name}"`,
                    isDisabledSelect: true,
                    nodeExpanded: true,
                    isSelected: false,
                    id: newId,
                    iconSize: 15,
                    type: "ITEM",
                },
            ];
        }
    }

    private _updateProperties(properties: IProperty[], type: EItemType) {

        // Remove o auto focus caso exista em algum componente
        this.properties.forEach(prop => prop.focusOnRender = false);

        // Define a função que abre a modal para edição
        this.properties.forEach(prop => prop.onPickerValueClick = () => { prop.id && ContextModalListService.showModal({ editingId: prop.id }); });

        const originalProperties = DefaultPropsHelper.getNewProps(type, this.name);

        originalProperties.forEach(originalProp => {

            if (!properties.some(prop => prop.propertieType === originalProp.propertieType)) {
                properties.push(originalProp);
            }

        });

        /** Define o nome da label encontrado nas properties do componente */
        const propLabel = this.properties.find(prop => prop.propertieType === PropertieTypes.label);
        if (propLabel) {
            this.name = propLabel.value;
        }

        switch (type) {

            case EItemType.ASSIGN:
                this._propertiesFromAssigns();
                break;

            case EItemType.ACTION:
                this._propertiesFromAction();
                break;

            case EItemType.IF:
                this._propertiesFromIf();
                break;

            case EItemType.SWITCH:
                this._propertiesFromSwitch();
                break;

            case EItemType.FOREACH:
                this._propertiesFromForeach();
                break;

            case EItemType.COMMENT:
                this._propertiesFromComment();
                break;

            case EItemType.END:
                this._propertiesFromEnd();
                break;

            case EItemType.START:
                this._propertiesFromStart();
                break;

            default:
                break;
        }

        this.properties = properties;
    }

    /**
     * Atualiza as propriedades do assign:
     * * Validaçoes de erros
     * * Adição automática de novos assigments
     */
    private _propertiesFromAssigns() {
        /** Essa sequência de código garante que sempre terá apenas um assigment vazio disponível */
        const emptyAssigments = this.properties.filter(prop => (prop.name === '' && prop.value === ''));
        if (emptyAssigments.length === 0) {
            const newId = Utils.getUUID();

            // Está adicionando items nos assigments
            this.properties.push({
                name: '',
                id: newId,
                value: '',
                group: 'Assigments',
                type: TypeOfValues.assign,
                propertieType: PropertieTypes.assigns,
            });

        } else if (emptyAssigments.length > 1) {

            // Está removendo items desnecessários do assigment
            emptyAssigments.forEach((empAssig, index) => {
                let indexToRemove = this.properties.findIndex(prop => prop.id === empAssig.id);
                if (index < (emptyAssigments.length - 1)) {
                    this.properties.splice(indexToRemove, 1);
                }
            });

        }

        // Enable or disable new connections
        if (this.connections.length === 0) {
            this.isEnabledNewConnetion = true;
        } else {
            this.isEnabledNewConnetion = false;
        }
    }

    private _propertiesFromAction() {

        // Enable or disable new connections
        if (this.connections.length === 0) {
            this.isEnabledNewConnetion = true;
        } else {
            this.isEnabledNewConnetion = false;
        }
    }

    private _propertiesFromForeach() {
        this.connections = this.connections.map((connection, index) => {
            // Renomeando a label da connection
            if (index === 0)
                return { ...connection, connectionLabel: 'Cycle' };

            return connection;
        });

        // Enable or disable new connections
        if (this.connections.length < 2) {
            this.isEnabledNewConnetion = true;
        } else {
            this.isEnabledNewConnetion = false;
        }
    }

    private _propertiesFromIf() {

        this.connections = [
            ...this.connections.map((connection, index) => {
                // Renomeando a label da connection
                if (index === 0) {
                    return {
                        ...connection,
                        connectionLabel: 'True'
                    };
                } else {
                    return {
                        ...connection,
                        connectionLabel: 'False'
                    };
                }
            })
        ];

        // Enable or disable new connections
        if (this.connections.length < 2) {
            this.isEnabledNewConnetion = true;
        } else {
            this.isEnabledNewConnetion = false;
        }
    }

    private _propertiesFromSwitch() {

        this.isEnabledNewConnetion = true;

        this.connections = this.connections.map((connection, index) => {
            if (index === 0) {
                return { ...connection, connectionLabel: 'Default' };
            } else {
                // Renomeando a label da connection
                connection = { ...connection, connectionLabel: 'Condition' + index };

                // Encontra a connection adicionada préviamente
                let existentProp = this.properties.find(prop => prop.id === connection.id);
                if (!existentProp) {
                    this.properties.push({
                        value: '',
                        id: connection.id,
                        group: 'Conditions',
                        name: 'Condition' + index,
                        type: TypeOfValues.expression,
                        propertieType: PropertieTypes.condition,
                    });
                } else {
                    // Está atualizando direto no "this.properties" por referência
                    existentProp.name = 'Condition' + index;
                }

                return connection;
            }
        });

        // Remove todos as props que não tiverem connections com o mesmo id
        let indexToRemove = this.properties.findIndex(prop => (prop.propertieType === PropertieTypes.condition && !this.connections.some(connection => connection.id === prop.id)));
        while (indexToRemove >= 0) {
            this.properties.splice(indexToRemove, 1);
            indexToRemove = this.properties.findIndex(prop => (prop.propertieType === PropertieTypes.condition && !this.connections.some(connection => connection.id === prop.id)));
        }

    }

    private _propertiesFromComment() {

        this.flowItemType = EFlowItemType.comment;
        this.isEnabledNewConnetion = true;

        const propLabel = this.properties.find(prop => prop.propertieType === PropertieTypes.label);
        const propComment = this.properties.find(prop => prop.propertieType === PropertieTypes.comment);
        this.name = propComment?.value || 'Write here your comment';
        if (propLabel) {
            propLabel.value = propComment?.value || 'Write here your comment';
        }
    }

    private _propertiesFromStart() {

        // Enable or disable new connections
        if (this.connections.length === 0) {
            this.isEnabledNewConnetion = true;
        } else {
            this.isEnabledNewConnetion = false;
        }
    }

    private _propertiesFromEnd() {
        this.isEnabledNewConnetion = false;
    }
}

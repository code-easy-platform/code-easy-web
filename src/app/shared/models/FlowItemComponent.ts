import { IconError, IconWarning, Utils } from "code-easy-components";

import { EItemType, IConnection, EFlowItemType, IProperty, TypeOfValues, ITreeItem } from "./../components/external";
import { BasicConfigurations } from "./BasicConfigurations";
import { IFlowItemComponent } from "./../interfaces";
import { DefaultPropsHelper } from "./../services";
import { PropertieTypes } from "./../enuns";


type OmitInConstructor = Omit<IFlowItemComponent, 'flowItemType' | 'isEnabledNewConnetion' | 'height' | 'width' | 'name' | 'problems' | 'hasError' | 'hasWarning' | 'addProblem'>;

export class FlowItemComponent extends BasicConfigurations<EItemType> implements IFlowItemComponent {
    public flowItemType: EFlowItemType = EFlowItemType.acorn;
    public isEnabledNewConnetion: boolean = false;
    public height: number = 40;
    public width: number = 40;

    public isDisabled?: boolean | undefined;
    public left: number;
    public top: number;

    private _connections: IConnection[] = [];
    public get connections(): IConnection[] {
        return this._connections || [];
    }
    public set connections(connects: IConnection[]) {
        this._connections = connects;
    }

    public get properties(): IProperty[] { return super.properties; }
    public set properties(props: IProperty[]) {

        // Update the type of item in flow editor
        this.flowItemType = this.type === EItemType.COMMENT ? EFlowItemType.comment : EFlowItemType.acorn;

        // Ensures that the original properties are present, and add to the list if any are not
        const originalProperties = DefaultPropsHelper.getNewProps(this.type, this.name);
        originalProperties.forEach(originalProp => {
            if (!props.some(prop => prop.propertieType === originalProp.propertieType)) {
                props.push(originalProp);
            }
        });

        switch (this.type) {

            case EItemType.ASSIGN:
                props = this._propertiesFromAssigns(props);
                break;

            case EItemType.ACTION:
                props = this._propertiesFromAction(props);
                break;

            case EItemType.IF:
                props = this._propertiesFromIf(props);
                break;

            case EItemType.SWITCH:
                props = this._propertiesFromSwitch(props);
                break;

            case EItemType.FOREACH:
                props = this._propertiesFromForeach(props);
                break;

            case EItemType.COMMENT:
                props = this._propertiesFromComment(props);
                break;

            case EItemType.END:
                props = this._propertiesFromEnd(props);
                break;

            case EItemType.START:
                props = this._propertiesFromStart(props);
                break;

            default:
                break;
        }

        super.properties = props;
    }

    public get problems(): ITreeItem[] {
        let problems = super.problems;

        const addProblem = (label: string, type: 'warning' | 'error') => {
            problems.push({
                icon: type === 'warning' ? IconWarning : IconError,
                nodeExpanded: false,
                isSelected: false,
                id: undefined,
                iconSize: 15,
                type: "ITEM",
                label,
            });
        }

        // Se for diferente de END e COMMENT valida se tem sucessores
        if ((this.type !== EItemType.END && this.type !== EItemType.COMMENT) && this.connections.length === 0) {
            addProblem(`The flow item "${this.name}" is missing a connector.`, 'error');
        }

        // Validates for each item
        switch (this.type) {
            case EItemType.ASSIGN:
                this.properties.filter(prop => prop.propertieType === PropertieTypes.assigns).forEach(prop => {
                    prop.valueHasError = false;
                    prop.nameHasError = false;

                    if (prop.name !== '' && prop.value === '') {
                        addProblem(`In the "${this.name}" item, no value is being assigned to the "${prop.name}."`, 'error');
                        prop.valueHasError = true;
                    } else if (prop.name === '' && prop.value !== '') {
                        addProblem(`In ${this.name} the value "${prop.value}" is not being assigned to any variable or parameter.`, 'error');
                        prop.nameHasError = true;
                    }
                });
                break;

            case EItemType.SWITCH:
                this.properties.filter(prop => prop.propertieType === PropertieTypes.condition).forEach(prop => {
                    prop.valueHasError = false;

                    if (prop.value === '') {
                        addProblem(`In the "${this.name}" item, the "${prop.name}" condition must have an informed expression.`, 'error');
                        prop.valueHasError = true;
                    }

                });
                break;

            case EItemType.IF:

                // Valida a condition do IF
                this.properties.filter(prop => prop.propertieType === PropertieTypes.condition).forEach(prop => {
                    prop.valueHasError = false;
                    if (prop.value === '') {
                        addProblem(`In the "${this.name}" item, the "${prop.name}" condition must have an informed expression.`, 'error');
                        prop.valueHasError = true;
                    }
                });
                // Valida as connection
                if (this.connections.length >= 1 && this.connections.length < 2) {
                    addProblem(`Flow item "${this.name}" is missing a connector.`, 'error');
                }

                break;

            case EItemType.END:
                // Nothing to valid yet
                break;

            case EItemType.ACTION:
                this.properties.filter(prop => prop.propertieType === PropertieTypes.action).forEach(prop => {
                    prop.valueHasError = false;

                    if (prop.value === '') {
                        addProblem(`The flow item "${this.name}" must have a valid value in the "${prop.name}" field.`, 'error');
                        prop.valueHasError = true;
                    }

                });
                break;

            case EItemType.FOREACH:
                this.properties.filter(prop => prop.propertieType === PropertieTypes.sourceList).forEach(prop => {
                    prop.valueHasError = false;

                    if (prop.value === '') {
                        addProblem(`The flow item "${this.name}" must have a valid value in the "${prop.name}" field.`, 'error');
                        prop.valueHasError = true;
                    }
                });
                break;

            default: break;
        }

        if (problems.length <= 1) {
            return problems;
        } else {
            const newId = Utils.getUUID();
            return [
                ...problems.map(problem => ({ ...problem, ascendantId: newId })),
                {
                    label: `Inconsistences in flow item "${this.name}."`,
                    nodeExpanded: true,
                    isSelected: false,
                    iconSize: 15,
                    type: "ITEM",
                    id: newId,
                },
            ];
        }
    }

    constructor(fields: OmitInConstructor) {
        super(fields);

        this.top = fields.top;
        this.left = fields.left;
        this.properties = fields.properties || this.properties;
        this.connections = fields.connections || this.connections;
    }

    /**
     * Atualiza as propriedades do assign:
     * * Validaçoes de erros
     * * Adição automática de novos assigments
     */
    private _propertiesFromAssigns(props: IProperty[]): IProperty[] {

        /** Essa sequência de código garante que sempre terá apenas um assigment vazio disponível */
        const emptyAssigments = props.filter(prop => (prop.name === '' && prop.value === ''));
        if (emptyAssigments.length === 0) {
            const newId = Utils.getUUID();

            // Está adicionando items nos assigments
            props.push({
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
                let indexToRemove = props.findIndex(prop => prop.id === empAssig.id);
                if (index < (emptyAssigments.length - 1)) {
                    props.splice(indexToRemove, 1);
                }
            });

        }

        // Enable or disable new connections
        if (this.connections.length === 0) {
            this.isEnabledNewConnetion = true;
        } else {
            this.isEnabledNewConnetion = false;
        }

        let prop = this.properties?.find(prop => prop.propertieType === PropertieTypes.description);
        if (prop) {
            prop.type = TypeOfValues.hidden;
        }

        return props;
    }

    private _propertiesFromForeach(props: IProperty[]): IProperty[] {

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

        let prop = this.properties?.find(prop => prop.propertieType === PropertieTypes.description);
        if (prop) {
            prop.type = TypeOfValues.hidden;
        }

        return props;
    }

    private _propertiesFromComment(props: IProperty[]): IProperty[] {

        this.flowItemType = EFlowItemType.comment;
        this.isEnabledNewConnetion = true;

        const propComment = props.find(prop => prop.propertieType === PropertieTypes.comment);
        const propLabel = props.find(prop => prop.propertieType === PropertieTypes.label);
        if (propLabel) {
            propLabel.value = propComment?.value || 'Write here your comment';
        }

        let prop = this.properties?.find(prop => prop.propertieType === PropertieTypes.description);
        if (prop) {
            prop.type = TypeOfValues.hidden;
        }

        return props;
    }

    private _propertiesFromAction(props: IProperty[]): IProperty[] {

        // Enable or disable new connections
        if (this.connections.length === 0) {
            this.isEnabledNewConnetion = true;
        } else {
            this.isEnabledNewConnetion = false;
        }

        /** Define se pode modificar o nome caso tenha uma action selecionada */
        const propAction = props.find(prop => prop.propertieType === PropertieTypes.action);
        const propLabel = props.find(prop => prop.propertieType === PropertieTypes.label);
        if (propLabel && propAction) {
            propLabel.editValueDisabled = propAction?.value !== '';
        }

        let prop = this.properties?.find(prop => prop.propertieType === PropertieTypes.description);
        if (prop) {
            prop.type = TypeOfValues.hidden;
        }

        return props;
    }

    private _propertiesFromSwitch(props: IProperty[]): IProperty[] {

        this.isEnabledNewConnetion = true;

        this.connections = this.connections.map((connection, index) => {
            if (index === 0) {
                return { ...connection, connectionLabel: 'Default' };
            } else {
                // Renomeando a label da connection
                connection = { ...connection, connectionLabel: 'Condition' + index };

                // Encontra a connection adicionada préviamente
                let existentProp = props.find(prop => prop.id === connection.id);
                if (!existentProp) {
                    props.push({
                        value: '',
                        id: connection.id,
                        group: 'Conditions',
                        name: 'Condition' + index,
                        type: TypeOfValues.expression,
                        propertieType: PropertieTypes.condition,
                    });
                } else {
                    // Está atualizando direto no "props" por referência
                    existentProp.name = 'Condition' + index;
                }

                return connection;
            }
        });

        // Remove todos as props que não tiverem connections com o mesmo id
        let indexToRemove = props.findIndex(prop => (prop.propertieType === PropertieTypes.condition && !this.connections.some(connection => connection.id === prop.id)));
        while (indexToRemove >= 0) {
            props.splice(indexToRemove, 1);
            indexToRemove = props.findIndex(prop => (prop.propertieType === PropertieTypes.condition && !this.connections.some(connection => connection.id === prop.id)));
        }

        let prop = this.properties?.find(prop => prop.propertieType === PropertieTypes.description);
        if (prop) {
            prop.type = TypeOfValues.hidden;
        }

        return props;
    }

    private _propertiesFromStart(props: IProperty[]): IProperty[] {

        // Enable or disable new connections
        if (this.connections.length === 0) {
            this.isEnabledNewConnetion = true;
        } else {
            this.isEnabledNewConnetion = false;
        }

        this.properties.forEach(prop => prop.type = TypeOfValues.hidden);

        return props;
    }

    private _propertiesFromEnd(props: IProperty[]): IProperty[] {

        this.isEnabledNewConnetion = false;

        this.properties.forEach(prop => prop.type = TypeOfValues.hidden);

        return props;
    }

    private _propertiesFromIf(props: IProperty[]): IProperty[] {

        this.connections = [
            ...this.connections.map((connection, index) => {
                // Rename label of the connection
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

        let prop = this.properties?.find(prop => prop.propertieType === PropertieTypes.description);
        if (prop) {
            prop.type = TypeOfValues.hidden;
        }

        return props;
    }
}

import { IFlowItem, ICoords, IConnections } from "../components/code-editor/shared/Interfaces";
import { IProperties, TypeValues } from "../components/properties-editor/shared/interfaces";
import { TreeInterface } from '../components/tree-manager/shared/models/TreeInterface';
import { DefaultPropsHelper } from '../services/helpers/DefaultPropsHelper';
import { ItemType } from "../components/code-editor/shared/enums/ItemType";
import { Utils, IconWarning, IconError } from "code-easy-components";
import { PropertieTypes } from "../enuns/PropertieTypes";

interface IItemFlowComplete extends IFlowItem {
    select(coords: ICoords): any;
    connections: IConnections[];
    properties: IProperties[];
    id: string | undefined;
    isDisabled?: boolean;
    isSelected: boolean;
    hasError?: boolean;
    itemType: ItemType;
    height: number;
    width: number;
    name: string;
    left: number;
    top: number;
    icon: any;
}
export class ItemFlowComplete implements IItemFlowComplete {
    public itemType: ItemType = ItemType.START;
    public connections: IConnections[] = [];
    public properties: IProperties[] = [];
    public isSelected: boolean = false;
    public hasError: boolean = false;
    public id: string | undefined;
    public icon: any = undefined;
    public height: number = 50;
    public select = () => { };
    public width: number = 50;
    public name: string = "";
    public left: number = 0;
    public top: number = 0;

    constructor(
        private _fields: {
            connections: IConnections[],
            properties?: IProperties[],
            id: string | undefined,
            isSelected: boolean,
            itemType: ItemType,
            hasError?: boolean,
            height?: number,
            width?: number,
            name: string,
            left: number,
            top: number,
            icon?: any,
        },
    ) {
        this.properties = _fields.properties || [];
        this.hasError = _fields.hasError || false;
        this.connections = _fields.connections;
        this.isSelected = _fields.isSelected;
        this.height = _fields.height || 50;
        this.width = _fields.width || 50;
        this.itemType = _fields.itemType;
        this.name = _fields.name;
        this.icon = _fields.icon;
        this.left = _fields.left;
        this.top = _fields.top;
        this.id = _fields.id;

        this._updateProperties(this._fields.properties || [], this._fields.itemType);
        this.getProblems();

    }

    public getProblems(): TreeInterface[] {
        let problems: TreeInterface[] = [];
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
                childs: [],
                label,
            });
        }

        // Se for diferente de END e COMMENT valida se tem sucessores
        if ((this.itemType !== ItemType.END && this.itemType !== ItemType.COMMENT) && this.connections.length === 0) {
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
            this.hasError = true;
        } else if (this.name.length > 20) {
            addProblem(`A suitable name for a stream item must be less than 20 characters in "${this.name}"`, 'warning');
            this.hasError = true;
        } else {
            this.properties.filter(prop => prop.propertieType === PropertieTypes.label).forEach(prop => prop.valueHasError = false);
        }

        // Valida condições para itens específico
        switch (this.itemType) {

            case ItemType.ASSIGN:
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

            case ItemType.SWITCH:
                this.properties.filter(prop => prop.propertieType === PropertieTypes.condition).forEach(prop => {
                    prop.valueHasError = false;

                    if (prop.value === '') {
                        addProblem(`In the "${this.name}" item, the "${prop.name}" condition must have an informed expression`, 'error');
                        prop.valueHasError = true;
                    }

                });
                break;

            case ItemType.IF:

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

            case ItemType.END:
                // Nada para validar aqui
                break;

            case ItemType.ACTION:
                // Nada para validar aqui
                break;

            default:
                break;

        }

        if (problems.length <= 1) {
            return problems;
        } else {
            return [{
                // icon: this.hasError ? IconError : IconWarning,
                label: `Inconsistences in flow item "${this.name}"`,
                isDisabledSelect: true,
                nodeExpanded: true,
                isSelected: false,
                childs: problems,
                id: undefined,
                iconSize: 15,
                type: "ITEM",
            }];
        }

    }

    private _updateProperties(properties: IProperties[], type: ItemType) {
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

            case ItemType.ASSIGN:
                this._propertiesFromAssigns();
                break;

            case ItemType.ACTION:
                this._propertiesFromAction();
                break;

            case ItemType.IF:
                this._propertiesFromIf();
                break;

            case ItemType.SWITCH:
                this._propertiesFromSwitch();
                break;

            case ItemType.FOREACH:
                this._propertiesFromForeach();
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

            // Está adicionando items nos assigments
            this.properties.push({
                name: '',
                value: '',
                group: 'Assigments',
                id: Utils.getUUID(),
                type: TypeValues.assign,
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
    }

    private _propertiesFromAction() { }

    private _propertiesFromForeach() {
        this.connections.forEach((connection, index) => {
            // Renomeando a label da connection
            if (index === 0) connection.connectionLabel = 'Cycle';
        });
    }

    private _propertiesFromIf() {
        this.connections.forEach((connection, index) => {

            // Renomeando a label da connection
            if (index === 0) connection.connectionLabel = 'True';
            else connection.connectionLabel = 'False';

        });
    }

    private _propertiesFromSwitch() {

        this.connections.forEach((connection, index) => {
            if (index === 0) {
                connection.connectionLabel = 'Default';
            } else {
                // Renomeando a label da connection
                connection.connectionLabel = 'Condition' + index;

                // Encontra a connection adicionada préviamente
                let existentProp = this.properties.find(prop => prop.id === connection.id);
                if (!existentProp) {
                    this.properties.push({
                        value: '',
                        id: connection.id,
                        group: 'Conditions',
                        name: 'Condition' + index,
                        type: TypeValues.expression,
                        propertieType: PropertieTypes.condition,
                    });
                } else {
                    // Está atualizando direto no "this.properties" por referência
                    existentProp.name = 'Condition' + index;
                }
            }
        });

        // Remove todos as props que não tiverem connections com o mesmo id
        let indexToRemove = this.properties.findIndex(prop => (prop.propertieType === PropertieTypes.condition && !this.connections.some(connection => connection.id === prop.id)));
        while (indexToRemove >= 0) {
            this.properties.splice(indexToRemove, 1);
            indexToRemove = this.properties.findIndex(prop => (prop.propertieType === PropertieTypes.condition && !this.connections.some(connection => connection.id === prop.id)));
        }

    }

}

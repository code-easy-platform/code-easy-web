import { IFlowItem, ICoords, IConnections } from "../components/code-editor/shared/Interfaces";
import { IProperties, TypeValues } from "../components/properties-editor/shared/interfaces";
import { DefaultPropsHelper } from '../services/helpers/DefaultPropsHelper';
import { ItemType } from "../components/code-editor/shared/enums/ItemType";
import { PropertieTypes } from "../enuns/PropertieTypes";
import { Utils } from "code-easy-components";

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

    private _propertiesFromAction() {

    }

    private _propertiesFromIf() {

    }

    private _propertiesFromSwitch() {



        this.connections.forEach((connection, index) => {

            // Renomea a label da connection
            connection.connectionLabel = 'Condition' + (index + 1);

            // Encontra a connection adicionada préviamente
            let existentProp = this.properties.find(prop => prop.id === connection.id);
            if (!existentProp) {
                this.properties.push({
                    value: '',
                    id: connection.id,
                    group: 'Conditions',
                    type: TypeValues.expression,
                    name: 'Condition' + (index + 1),
                    propertieType: PropertieTypes.condition,
                });
            } else {
                // Está atualizando direto no "this.properties" por referência
                existentProp.name = 'Condition' + (index + 1);
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

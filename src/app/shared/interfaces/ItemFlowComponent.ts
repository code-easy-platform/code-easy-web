import { IFlowItem, ICoords, IConnections } from "../components/code-editor/shared/Interfaces";
import { IProperties } from "../components/properties-editor/shared/interfaces";
import { DefaultPropsHelper } from '../services/helpers/DefaultPropsHelper';
import { ItemType } from "../components/code-editor/shared/enums/ItemType";

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

        this.properties = properties;
    }
}
import { ItemType, IConnections, ItemFluxo } from "../components/code-editor/models/ItemFluxo";
import { IProperties } from "../components/properties-editor/shared/interfaces";
import { Coords } from "../components/code-editor/shared/Interfaces/CodeEditorInterfaces";

interface IItemFlowComplete extends ItemFluxo {
    select(coords: Coords): any;
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
        props: {
            connections: IConnections[],
            properties: IProperties[],
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
        // super(props);
        this.hasError = props.hasError || false;
        this.connections = props.connections;
        this.isSelected = props.isSelected;
        this.properties = props.properties;
        this.height = props.height || 50;
        this.width = props.width || 50;
        this.itemType = props.itemType;
        this.name = props.name;
        this.icon = props.icon;
        this.left = props.left;
        this.top = props.top;
        this.id = props.id;
    }

    public toStatic(): IItemFlowComplete {
        return {
            connections: this.connections,
            properties: this.properties,
            isSelected: this.isSelected,
            itemType: this.itemType,
            hasError: this.hasError,
            select: this.select,
            height: this.height,
            width: this.width,
            icon: this.icon,
            name: this.name,
            left: this.left,
            top: this.top,
            id: this.id,
        };
    }

}
import { ItemType } from "../enums/ItemType";
import { IConnections } from "./Connections";
import { ICoords } from "./Coords";

export interface IFlowItem {
    select(coords: ICoords): any;
    connections: IConnections[];
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

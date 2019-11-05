import ComponentType from "../../enuns/ComponentType";

export interface TreeInterface {
    itemId: number;
    itemLabel: string;
    itemType: ComponentType;
    nodeExpanded: boolean;
    itemChilds: TreeInterface[];
}

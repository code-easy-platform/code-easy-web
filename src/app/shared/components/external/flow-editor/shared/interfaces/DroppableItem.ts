import { EFlowItemType } from "../enums";

export interface IDroppableItem {
    type: string;
    itemProps: {
        icon: any;
        width: number;
        height: number;
        id: string | undefined;
        label: string | undefined;
        flowItemType: EFlowItemType;
        itemType: string | undefined;
    }
}
export interface IDroppableItem {
    type: string;
    itemProps: {
        icon: any;
        width: number;
        height: number;
        id: string | undefined;
        label: string | undefined;
        itemType: string | undefined;
    }
}
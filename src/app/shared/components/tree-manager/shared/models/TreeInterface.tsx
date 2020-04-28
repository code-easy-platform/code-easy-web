export interface TreeInterface {
    type: any;
    label: string;
    hasError?: boolean;
    isSelected: boolean;
    description?: string;
    nodeExpanded: boolean;
    canDropList?: string[];
    id: string | undefined;
    childs: TreeInterface[];
    isDisabledDrag?: boolean;
    isDisabledDrop?: boolean;
    isDisabledSelect?: boolean;
    isAllowedToggleNodeExpand?: boolean;
}

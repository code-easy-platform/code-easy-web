export interface TreeInterface {
    type: any;
    icon?: any;
    label: string;
    isEditing?: boolean;
    hasError?: boolean;
    isSelected: boolean;
    description?: string;
    isDisabled?: boolean;
    nodeExpanded: boolean;
    canDropList?: string[];
    id: string | undefined;
    childs: TreeInterface[];
    isDisabledDrag?: boolean;
    isDisabledDrop?: boolean;
    isDisabledSelect?: boolean;
    isAllowedToggleNodeExpand?: boolean;
}

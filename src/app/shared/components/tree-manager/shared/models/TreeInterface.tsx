export interface TreeInterface {
    type: any;
    icon?: any;
    label: string;
    iconSize?: number;
    hasError?: boolean;
    isEditing?: boolean;
    isSelected: boolean;
    description?: string;
    isDisabled?: boolean;
    nodeExpanded: boolean;
    canDropList?: string[];
    id: string | undefined;
    childs: TreeInterface[];
    showExpandIcon?: boolean;
    isDisabledDrag?: boolean;
    isDisabledDrop?: boolean;
    isDisabledSelect?: boolean;
    useCustomIconToExpand?: boolean;
    isAllowedToggleNodeExpand?: boolean;
}

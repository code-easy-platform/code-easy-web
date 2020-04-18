import { TreeItensTypes } from './TreeItensTypes';

export interface TreeInterface {
    id: string | undefined;
    label: string;
    hasError?: boolean;
    isSelected: boolean;
    type: TreeItensTypes;
    description?: string;
    nodeExpanded: boolean;
    childs: TreeInterface[];
    isDisabledDrag?: boolean;
    isDisabledDrop?: boolean;
    isDisabledSelect?: boolean;
    isAllowedToggleNodeExpand?: boolean;
}

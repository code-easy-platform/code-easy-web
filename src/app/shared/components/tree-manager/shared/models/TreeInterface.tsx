import { TreeItensTypes } from './TreeItensTypes';

export interface TreeInterface {
    itemId: string;
    itemLabel: string;
    isSelected: boolean;
    nodeExpanded: boolean;
    itemType: TreeItensTypes;
    itemChilds: TreeInterface[];
}

import { TreeItensTypes } from './TreeItensTypes';

export interface TreeInterface {
    itemId: string | undefined;
    itemLabel: string;
    isSelected: boolean;
    nodeExpanded: boolean;
    itemType: TreeItensTypes;
    itemChilds: TreeInterface[];
}

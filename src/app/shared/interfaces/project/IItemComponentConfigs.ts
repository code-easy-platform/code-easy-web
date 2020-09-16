import { EComponentType } from "../../enuns";
import { IBasicFields } from "./IBasicFields";

export interface IItemComponentConfigs extends IBasicFields {
    /** 
     * Used to be able to tell the item flow which items in a tree are currently being edited
     */
    isEditing: boolean;
    /** 
     * Indicates where the item is selected in the tree.
     */
    isSelected: boolean;
    /**
     * Used on the tree, it helps to know if the item is expanded or collapsed
     */
    isExpanded?: boolean;
    /**
     * Used for tree it helps to know if the item is a folder or a file
     */
    type: EComponentType;
}

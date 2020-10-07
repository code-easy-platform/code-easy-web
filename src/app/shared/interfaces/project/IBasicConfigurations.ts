import { IProperty, ITreeItem, EItemType } from "./../../components/external";
import { EComponentType, EProjectType } from "./../../enuns";

/**
 * Common fields between the different project structures
 */
export interface IBasicConfigurations<T = EComponentType | EProjectType | EItemType> {
    /**
     * Used to visually represent the record
     */
    icon?: any;
    /**
     * Used for tree it helps to know if the item is a folder or a file
     */
    type: T;
    /**
     * Used to name a record visually only
     */
    label: string;
    /**
     * Used to control the ordering of items
     */
    ordem?: number;
    /**
     * Indicates if the item has an error
     */
    hasError?: boolean;
    /**
     * Field used to store criation date
     */
    createdDate?: Date;
    /**
     * Field used to store updated date
     */
    updatedDate?: Date;
    /** 
     * Used to be able to tell the item flow which items in a tree are currently being edited
     */
    isEditing?: boolean;
    /**
     * Indicates whether the item has any type of warning
     */
    hasWarning?: boolean;
    /**
     * Used to describe some more specific detail
     */
    description?: string;
    /** 
     * Indicates where the item is selected in the tree.
     */
    isSelected?: boolean;
    /**
     * Used on the tree, it helps to know if the item is expanded or collapsed
     */
    isExpanded?: boolean;
    /**
     * Used to identify a record more simply.
     * 
     *  * Can't have space
     *  * Cannot have special characters
     *  * It cannot be empty
     */
    readonly name: string;
    /**
     * Uuid used as identifier
     * 
     * If ***undefined*** the record is being created
     */
    id: string | undefined;
    /**
     * Used to list all properties of an item
     */
    properties?: IProperty[];
    /**
     * Used to list all problems in this component
     */
    readonly problems: ITreeItem[];
    /**
     * Used to add problems in this component
     */
    addProblem(label: string, type: 'warning' | 'error'): void;
}

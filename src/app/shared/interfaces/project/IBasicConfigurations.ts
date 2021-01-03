import { IObservable } from "react-observing";

import { IProperty, EItemType } from "./../../components/external";
import { EComponentType, EProjectType } from "./../../enuns";

/**
 * Common fields between the different project structures
 */
export interface IBasicConfigurations<T = EComponentType | EProjectType | EItemType> {
    /**
     * Used for tree it helps to know if the item is a folder or a file
     */
    type: IObservable<T>;
    /**
     * Used to name a record visually only
     */
    label: IObservable<string>;
    /**
     * Used to identify a record more simply.
     * 
     *  * Can't have space
     *  * Cannot have special characters
     *  * It cannot be empty
     */
    readonly name: IObservable<string>;
    /**
     * Used to visually represent the record
     */
    icon: IObservable<any | undefined>;
    /**
     * Uuid used as identifier
     * 
     * If ***undefined*** the record is being created
     */
    id: IObservable<string | undefined>;
    /**
     * Used to control the ordering of items
     */
    ordem: IObservable<number | undefined>;
    /**
     * Indicates if the item has an error
     */
    hasError: IObservable<boolean | undefined>;
    /**
     * Field used to store criation date
     */
    createdDate: IObservable<Date | undefined>;
    /**
     * Field used to store updated date
     */
    updatedDate: IObservable<Date | undefined>;
    /** 
     * Used to be able to tell the item flow which items in a tree are currently being edited
     */
    isEditing: IObservable<boolean | undefined>;
    /**
     * Indicates whether the item has any type of warning
     */
    hasWarning: IObservable<boolean | undefined>;
    /**
     * Used to describe some more specific detail
     */
    description: IObservable<string | undefined>;
    /** 
     * Indicates where the item is selected in the tree.
     */
    isSelected: IObservable<boolean | undefined>;
    /**
     * Used on the tree, it helps to know if the item is expanded or collapsed
     */
    isExpanded: IObservable<boolean | undefined>;
    /**
     * Used to list all properties of an item
     */
    properties: IObservable<IProperty[] | undefined>;
}

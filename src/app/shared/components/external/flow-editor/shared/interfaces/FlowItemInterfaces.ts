import { EFlowItemType } from "../enums/EFlowItemType";

/**
 * Used to represente lines in the flow between flow items
 */
export interface IConnection {
    /**
     * This will apper in the line as a tooltip
     */
    connectionDescription?: string;
    /**
     * This will apper in the line as a title
     */
    connectionLabel?: string;
    /**
     * Unique id to identify the connection
     */
    id: string | undefined;
    /**
     * Used to identify when the user click over the line
     */
    isSelected: boolean;
    /**
     * Identifier of the element that is connected by the line 
     */
    originId: string;
    /**
     * Identifier of the element that is connected by the line 
     */
    targetId: string;
}
/**
 * 
 */
export interface IBasicFlowItem {
    label?: string;
    top: number | 0;
    left: number | 0;
    isSelected?: boolean;
    description?: string;
    isDisabled?: boolean;
    /**
     * Unique id to identify the element
     */
    id: string | undefined;
    flowItemType: EFlowItemType;
}
/**
 * 
 */
export interface ILine {
    /**
     * Unique id to identify the element
     */
    id: string;
    originId?: string;
    targetId?: string | undefined;
}
/**
 * 
 */
export interface IFlowItem extends IBasicFlowItem {
    icon?: any;
    width?: number;
    height?: number;
    /**
     * Used to define a type of the item.
     * Ex: start, assign, foreach, etc...
     */
    itemType?: string;
    hasError?: boolean;
    hasWarning?: boolean;
    connections?: IConnection[];
    /**
     * Used to validate that this item can be connected with another item
     */
    isEnabledNewConnetion?: boolean;
}

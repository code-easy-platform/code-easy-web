import { TreeInterface } from "./TreeInterface";

export interface TreeManagerProps {
    /**
     * Enabled to drop items on this item
     */
    isUseDrop?: boolean;
    /**
     * Enabled to drag this item
     */
    isUseDrag?: boolean;
    /**
     * When there are no elements being displayed this message is shown.
     * 
     * It is also possible to force this message to appear
     */
    emptyMessage?: string;
    /**
     * Show empty message
     */
    showEmptyMessage?: boolean;
    /**
     * Tree-shaped list of items to be displayed
     */
    items: TreeInterface[];
    /**
     * Emitted event always identifies the focus in the area of this component
     */
    onFocus?(e: React.FocusEvent<HTMLDivElement>): void;
    /**
     * Event emitted whenever the key press is identified
     */
    onKeyDown?(e: React.FocusEvent<HTMLDivElement>): void;
    /**
     * Event emitted whenever an item of the allowed type is dropped on any element of the tree
     */
    onDropItem?(targetItemId: string, dropppedItemId: string, droppedItemProps: any): void;
    /**
     * Event emitted whenever the right mouse click is identified
     */
    onContextMenu?(itemTreeId: string | undefined, e: React.MouseEvent<HTMLDivElement, MouseEvent>): void | undefined;
    /**
     * Event emitted whenever a mouse click is identified
     */
    onClick?(itemTreeId: string, item: TreeInterface, e: React.MouseEvent<HTMLDivElement, MouseEvent>): void | undefined;
    /**
     * Event emitted whenever a tree node is expanded
     */
    onExpandNode?(itemTreeId: string, item: TreeInterface, e: React.MouseEvent<HTMLDivElement, MouseEvent>): void | undefined;
    /**
     * Event emitted whenever a double click with the mouse is identified
     */
    onDoubleClick?(itemTreeId: string, item: TreeInterface, e: React.MouseEvent<HTMLDivElement, MouseEvent>): void | undefined;
    /**
     * Stylizes some aspects of the component
     */
    style?: {
        /**
         * Background color of the item that has the property isEditing = true
         */
        editingItemBackgroundColor?: string,
        /**
         * Background color of the item that has the property isSelected = true
         */
        activeItemBackgroundColor?: string,
        /**
         * Text color of the item that has the property hasError = true
         */
        hasErrorItemBackgroundColor?: string,
    }
}

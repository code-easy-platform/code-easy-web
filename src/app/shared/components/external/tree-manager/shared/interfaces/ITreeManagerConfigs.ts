export interface ITreeManagerConfigs {
    /**
     * Background color of the item that has focused
     */
    hoveredItemBackgroundColor?: string,
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
    errorTextColor?: string,
    /**
     * Text color of the item that has the property hasWarning = true
     */
    warningTextColor?: string,
    /**
     * Show empty message
     * 
     * @default true
     */
    showEmptyMessage?: boolean;
    /**
     * Enabled to drop items on this item
     * 
     * @default true
     */
    isUseDrop?: boolean;
    /**
     * Enabled to drag this item
     * 
     * @default true
     */
    isUseDrag?: boolean;
    /**
     * Used to form the tree view for items.
     * When informed it represents the size of the left padding
     * 
     * @default 8px
     */
    leftPadding?: number;
    /**
     * Identify the tree in the dom
     * 
     * @default '...abc...' // random uuid
     */
    id?: string;
}

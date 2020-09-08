export interface ITreeManagerConfigs {
    /**
     * When an item is dragged, a custom layer remains on the element. React DND Draglayer must be configured
     */
    customDragLayer?(item: React.ReactNode): React.ReactNode;
    /**
     * Background color of the item that has focused
     */
    focusedItemBackgroundColor?: string,
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
     */
    showEmptyMessage?: boolean;
    /**
     * Enabled to drop items on this item
     */
    isUseDrop?: boolean;
    /**
     * Enabled to drag this item
     */
    isUseDrag?: boolean;
    /**
     * Identifier
     */
    id?: string | undefined;
}

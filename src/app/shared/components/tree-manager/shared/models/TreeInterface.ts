export interface TreeInterface {
    /**
     * Current item type
     */
    type: any;
    /**
     * Custom Icon
     */
    icon?: any;
    /**
     * Text that will be displayed in the items
     */
    label: string;
    /**
     * Custom icon size
     */
    iconSize?: number;
    /**
     * Leaves item text in red to indicate an error
     */
    hasError?: boolean;
    /**
     * Indicates that the current feature is being edited
     */
    isEditing?: boolean;
    /**
     * Indicates that the current element is being selected
     */
    isSelected: boolean;
    /**
     * Message displayed when hovering over an item in the tree
     */
    description?: string;
    /**
     * Property indicates whether the item in the tree is disabled, preventing most standard events for that type of item from running
     */
    isDisabled?: boolean;
    /**
     * Property that controls whether the item's node is expanded or not
     */
    nodeExpanded: boolean;
    /**
     * List of types allowed to be dropped on the current item
     */
    canDropList?: string[];
    /**
     * Unique identifier
     */
    id: string | undefined;
    /**
     * Items that will be displayed when the current item's node is expanded
     */
    childs: TreeInterface[];
    /**
     * Property that controls whether the expand and shrink node icon is displayed or not
     */
    showExpandIcon?: boolean;
    /**
     * Enables or disables dragging the current item
     */
    isDisabledDrag?: boolean;
    /**
     * Enables or disables the drop of the current item
     */
    isDisabledDrop?: boolean;
    /**
     * Enables or disables the selection of the current item
     */
    isDisabledSelect?: boolean;
    /**
     * Enables or disables the click over the current item
     */
    isDisabledClick?: boolean;
    /**
     * Enables or disables the double click over the current item
     */
    isDisabledDoubleClick?: boolean;
    /**
     * Use custom icon to expand the node
     */
    useCustomIconToExpand?: boolean;
    /**
     * Indicates whether or not the current item's node will be allowed to be expanded or collapsed
     */
    isAllowedToggleNodeExpand?: boolean;
}


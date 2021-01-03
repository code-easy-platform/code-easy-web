import { IObservable } from 'react-observing';

export interface ITreeItem {
    /**
     * Current item type
     */
    type: IObservable<string>;
    /**
     * Text that will be displayed in the items
     */
    label: IObservable<string>;
    /**
     * Indicates that the current element is being selected
     */
    isSelected: IObservable<boolean>;
    /**
     * Property that controls whether the item's node is expanded or not
     */
    nodeExpanded: IObservable<boolean>;
    /**
     * Custom Icon
     */
    icon: IObservable<any | undefined>;
    /**
     * Unique identifier
     */
    id: IObservable<string | undefined>;
    /**
     * Custom icon size
     */
    iconSize: IObservable<number | undefined>;
    /**
     * Leaves item text in red to indicate an error
     */
    hasError: IObservable<boolean | undefined>;
    /**
     * Leaves item text in yellow to indicate an error
     */
    hasWarning: IObservable<boolean | undefined>;
    /**
     * Indicates that the current feature is being edited
     */
    isEditing: IObservable<boolean | undefined>;
    /**
     * Used to be found by the item that comes before, your igniter.
     */
    ascendantId: IObservable<string | undefined>;
    /**
     * Message displayed when hovering over an item in the tree
     */
    description: IObservable<string | undefined>;
    /**
     * Property indicates whether the item in the tree is disabled, preventing most standard events for that type of item from running
     */
    isDisabled: IObservable<boolean | undefined>;
    /**
     * List of types allowed to be dropped on the current item
     */
    canDropList: IObservable<string[] | undefined>;
    /**
     * Property that controls whether the expand and shrink node icon is displayed or not
     */
    showExpandIcon: IObservable<boolean | undefined>;
    /**
     * Enables or disables dragging the current item
     */
    isDisabledDrag: IObservable<boolean | undefined>;
    /**
     * Enables or disables the drop of the current item
     */
    isDisabledDrop: IObservable<boolean | undefined>;
    /**
     * Enables or disables the click over the current item
     */
    isDisabledClick: IObservable<boolean | undefined>;
    /**
     * Enables or disables the selection of the current item
     */
    isDisabledSelect: IObservable<boolean | undefined>;
    /**
     * Enables or disables the double click over the current item
     */
    isDisabledDoubleClick: IObservable<boolean | undefined>;
    /**
     * Use custom icon to expand the node
     */
    useCustomIconToExpand: IObservable<boolean | undefined>;
    /**
     * Indicates whether or not the current item's node will be allowed to be expanded or collapsed
     */
    isAllowedToggleNodeExpand: IObservable<boolean | undefined>;
}

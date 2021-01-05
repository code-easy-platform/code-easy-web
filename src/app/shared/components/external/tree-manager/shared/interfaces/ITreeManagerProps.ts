import { ITreeItem } from "./ITreeItem";

export interface ITreeManagerEvents {
    /**
     * Emitted event always identifies the focus in the area of this component
     */
    onFocus?(e: React.FocusEvent<HTMLDivElement>): void;
    /**
     * Event emitted whenever the key press is identified
     */
    onKeyDown?(e: React.KeyboardEvent<HTMLDivElement> | React.FocusEvent<HTMLDivElement>): void;
    /**
     * Event emitted whenever an item of the allowed type is dropped on any element of the tree
     */
    onDropItem?(targetItemId: string, dropppedItemId: string, droppedItemProps: any): void;
    /**
     * Event emitted whenever the right mouse click is identified
     */
    onContextMenu?(itemTreeId: string | undefined, e: React.MouseEvent<HTMLDivElement, MouseEvent>): void | undefined;
    /**
     * Event emitted whenever a tree node is expanded
     */
    onExpandNode?(itemTreeId: string, e: React.MouseEvent<HTMLDivElement, MouseEvent>): void | undefined;
}

export interface ITreeManagerProps {
    /**
     * When there are no elements being displayed this message is shown.
     * 
     * It is also possible to force this message to appear
     */
    childrenWhenEmpty?: React.ReactNode;
    /**
     * Tree-shaped list of items to be displayed
     */
    items: ITreeItem[];
}
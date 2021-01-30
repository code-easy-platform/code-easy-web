import { IFlowItem } from "./FlowItemInterfaces";

/** Set of events used by FlowEditorBoard */
export interface IFlowEditorBoardEvents {
    /**
     * Executed whenever a flow item is selected
     * @param uids Selecteds uids
     */
    onSelect?(uids: string[]): void;
    /**
     * Executed whenever there is a change in the base structure of the flow items
     * @param items New item structure modified
     */
    onChangeItems?(items: IFlowItem[]): void;
    /**
     * Event executed when the the board is focused
     * @param event React event
     */
    onFocus?(event: React.FocusEvent<SVGSVGElement>): void;
    /**
     * Event executed when the context menu is triggered, by keyboard or by the mouse event
     * @param event React event
     */
    onContextMenu?(event: React.MouseEvent<any, MouseEvent>): void;
    /**
     * Event executed when any key is pressed
     * @param event Keyboard react event
     */
    onAnyKeyDown?(event: React.KeyboardEvent<SVGSVGElement>): void;
    /**
     * Event executed when the **Ctrl + C** key combination is pressed
     * @param event Keyboard react event
     */
    onKeyDownCtrlC?(event: React.KeyboardEvent<SVGSVGElement>): void;
    /**
     * Event executed when the **Ctrl + D** key combination is pressed
     * @param event Keyboard react event
     */
    onKeyDownCtrlD?(event: React.KeyboardEvent<SVGSVGElement>): void;
    /**
     * Event executed when the **Ctrl + V** key combination is pressed
     * @param event Keyboard react event
     */
    onKeyDownCtrlV?(event: React.KeyboardEvent<SVGSVGElement>): void;
    /**
     * Event executed when the mouse enters the board area
     * @param event React event
     */
    onMouseEnter?(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
    /**
     * Event executed when the mouse leaves the board area
     * @param event React event
     */
    onMouseLeave?(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
    /**
     * Function - Fired when an item is dropped in the editor expects the same item, but the item may undergo additional changes
     */
    onDropItem?(oldItemId: string | undefined, newItemId: string, newItem: IFlowItem): IFlowItem | undefined;
}

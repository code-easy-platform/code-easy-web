import { IFlowItem } from "./FlowItemInterfaces";
import { IBreadCrumbButton } from "./BreadCrumbButton";

/** Specific set of settings used in the flow editor */
export interface IFlowEditorConfigs {
    /**
     * Usado para custumizar o background do painel
     */
    backgroundType?: 'dotted' | 'checkered' | 'custom';
    /**
     * Ajustar à grade enquanto arrasta
     */
    snapGridWhileDragging?: boolean;
    /**
     * Se "true" desabilita a área de seleção na tela.
     */
    disableSelection?: boolean;
    /**
     * Used when a flow item is disabled 
     */
    disableOpacity?: number;
    /**
     * Used when a flow item is disabled
     */
    dottedSize?: number;
    /**
     * Used to define which items are allowed in the flow
     */
    typesAllowedToDrop?: string[];
    /**
     * Used to define the color of the text that will be displayed above a flow item
     */
    flowItemTextColor?: string;
    /**
     * Color used to represent that an item is selected
     */
    flowItemSelectedColor?: string;
    /**
     * Color used to represent an warning in some flow item
     */
    flowItemWarningColor?: string;
    /**
     * Color used to represent an error in some flow item
     */
    flowItemErrorColor?: string;
    /**
     * Color used to the texts in comments in the flow
     */
    commentTextColor?: string;
    /**
     * Color used in comments in the flow
     */
    commentColor?: string;
    /**
     * Color used in lines in the flow
     * 
     * Default value: **gray**
     */
    linesColor?: string;
    /**
     * Stroke width used in lines in the flow
     * 
     * Default value: **1**
     */
    lineWidth?: number;
    /**
     * Selection border type
     * 
     * Default value: **normal**
     */
    selectionBorderType?: 'dash' | 'normal',
    /**
     * Selection border width
     */
    selectionBorderWidth?: number,
    /**
     * Selection border color
     */
    selectionBorderColor?: string,
    /**
     * Selection background color
     */
    selectionBackgroundColor?: string,
    /**
     * Board background color
     */
    backgroundColor?: string,
    /**
     * Dot color
     * 
     * This property is used only when the background type is set to "dotted"
     * 
     * Default value: **#484848**
     */
    dotColor?: string,
    /**
     * Toolbar border color
     * 
     * Default value: **#000**
     */
    toolbarBorderColor?: string,
    /**
     * Toolbar background color
     */
    toolbarBackgroundColor?: string,
    /**
     * Toolbar item width
     */
    toolbarItemWidth?: number;
    /**
     * When true show the tool bar in left side
     * 
     * Default value: **True**
     */
    showToolbar?: boolean;
    /**
     * Breadcrumb text color
     */
    breadcrumbTextColor?: string;
    /**
     * Breadcrumb border color
     */
    breadcrumbBorderColor?: string;
    /**
     * Breadcrumb background color
     */
    breadcrumbBackgroundColor?: string;
    /**
     * Used to display an elevation of the toolbar and breadcrumb relative to the board
     * 
     * Default value: **False**
     */
    useElevation?: boolean;
    /**
     * Elevation color
     * 
     * Default value: **#000**
     */
    elevationColor?: string;
}

/** Set of events used by FlowEditorBoard */
export interface IFlowEditorBoardEvents {
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

/** Set of properties used by FlowEditorBoard */
export interface IFlowEditorBoardProps extends IFlowEditorBoardEvents {
    /**
     * Unique identifier
     */
    id: string;
    /**
     * The component is showed when the items props is empty
     */
    childrenWhenItemsEmpty?: React.ReactNode;
    /**
     * 
     */
    breadcrumbs?: IBreadCrumbButton[];
    /**
     * 
     */
    toolItems?: IFlowItem[];
}

/** Set of all properties used in FlowEditor component */
export interface IFlowEditorProps extends IFlowEditorBoardProps {
    /**
     * FlowItem[] - Usado para exibir os items na tela do editor
     */
    items: IFlowItem[];
    /**
     * Configurations for the Flow editor component
     */
    configs: IFlowEditorConfigs
}

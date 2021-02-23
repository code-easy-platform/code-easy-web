
/** Specific set of settings used in the flow editor */
export interface IFlowEditorConfigs {
    /**
     * Customize the background panel
     */
    backgroundType?: 'dotted' | 'checkered' | 'custom';
    /**
     * Fit to grid while dragging
     */
    snapGridWhileDragging?: boolean;
    /**
     * If "true" disable selection area.
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
    /**
     * Render vertical rulers after a certain number of characters.
     * Use multiple values for multiple rulers.
     * No rulers are drawn if array is empty.
     */
    rulers?: number[];
}

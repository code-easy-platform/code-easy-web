import { IFlowEditorBoardEvents } from "./IFlowEditorBoardEvents";
import { IFlowEditorConfigs } from "./IFlowEditorConfigs";
import { IBreadCrumbButton } from "./BreadCrumbButton";
import { IFlowItem } from "./FlowItemInterfaces";

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
    configs: IFlowEditorConfigs;
}

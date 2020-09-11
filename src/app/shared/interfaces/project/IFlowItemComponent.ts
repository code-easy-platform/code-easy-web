import { IProperty } from "./../../components/properties-editor";
import { IFlowItem } from "./../../components/flow-editor";

export interface IFlowItemComponent extends IFlowItem {
    properties: IProperty[];
    name: string;
}

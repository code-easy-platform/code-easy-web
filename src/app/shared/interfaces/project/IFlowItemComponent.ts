import { EItemType, IFlowItem } from "./../../components/flow-editor";
import { IProperty } from "./../../components/properties-editor";

export interface IFlowItemComponent extends IFlowItem {
    properties: IProperty[];
    itemType: EItemType;
    name: string;
    /**
     * Field used to store criation date
     */
    createdDate?: Date;
    /**
     * Field used to store updated date
     */
    updatedDate?: Date;
}

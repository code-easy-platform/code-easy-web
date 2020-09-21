import { IBasicConfigurations } from "./IBasicConfigurations";
import { IFlowItemComponent } from "./IFlowItemComponent";
import { EComponentType } from "./../../enuns";

/**
 * Tree item representation with all its properties
 */
export interface ITreeItemComponent extends IBasicConfigurations<EComponentType> {
    /**
     * Used to contain items in a stream
     */
    items: IFlowItemComponent[];
    /**
     * Used to be found by the item that comes before, your igniter.
     */
    ascendantId?: string;
}

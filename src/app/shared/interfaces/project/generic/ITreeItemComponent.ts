import { IObservable } from "react-observing";

import { IBasicConfigurations } from "./../IBasicConfigurations";
import { IFlowItemComponent } from "./../IFlowItemComponent";
import { EComponentType } from "./../../../enuns";

/**
 * Tree item representation with all its properties
 */
export interface ITreeItemComponent<T = EComponentType> extends IBasicConfigurations<T> {
    /**
     * Used to contain items in a stream
     */
    items: IObservable<IFlowItemComponent[]>;
    /**
     * Used to be found by the item that comes before, your igniter.
     */
    ascendantId: IObservable<string | undefined>;
}

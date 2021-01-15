import { IObservable } from "react-observing";

import { EItemType } from "../components/external";
import { IFlowItemComponent } from "./project";

export interface IFlowItemsStoreCurrent {
    /**
     * Current editing item id
     */
    itemId: IObservable<string | undefined>;
    /**
     * Items from the current editing item
     */
    items: IObservable<IFlowItemComponent<EItemType>[]>;
}

export interface IFlowItemsStore {
    /**
     * Represents the current editing item
     */
    current: IObservable<IFlowItemsStoreCurrent>;
    /**
     * Allow to set a new item as a current editing 
     */
    next: (nextCurrent: IFlowItemsStoreCurrent) => void;
    /**
     * Remove editing item
     */
    clear: () => void;
}

import { IObservable, observe, set } from "react-observing";

import { IFlowItemsStore, IFlowItemsStoreCurrent } from "../interfaces";

export class FlowItemsStore implements IFlowItemsStore {

    private _current: IObservable<IFlowItemsStoreCurrent> = observe({
        itemId: observe(undefined),
        items: observe([])
    });
    public get current(): IObservable<IFlowItemsStoreCurrent> {
        return this._current;
    }

    constructor(initialCurrent?: IFlowItemsStoreCurrent) {
        if (initialCurrent) {
            this._current = observe<IFlowItemsStoreCurrent>(initialCurrent);
        }
    }

    public next(nextCurrent: IFlowItemsStoreCurrent) {
        set(this._current, nextCurrent);
    }

    public clear() {
        set(this.current, {
            itemId: observe(undefined),
            items: observe([])
        });
    };
}

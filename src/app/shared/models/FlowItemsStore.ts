import { IObservable, observe, set } from "react-observing";

import { IFlowItemsStore, IFlowItemsStoreCurrent } from "../interfaces";

export class FlowItemsStore implements IFlowItemsStore {

    private _current: IObservable<IFlowItemsStoreCurrent>;
    public get current(): IObservable<IFlowItemsStoreCurrent> {
        return this._current;
    }

    constructor(initialCurrent?: IFlowItemsStoreCurrent) {
        this._current = observe<IFlowItemsStoreCurrent>(initialCurrent || {
            itemId: observe(undefined),
            items: observe([])
        })
    }

    public next(nextCurrent: IFlowItemsStoreCurrent) {
        set(this._current, nextCurrent);
    }

    public clear() {
        set(this._current, {
            itemId: observe(undefined),
            items: observe([])
        });
    };
}

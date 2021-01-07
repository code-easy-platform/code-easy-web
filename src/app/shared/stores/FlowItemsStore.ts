import { IObservable, observe } from "react-observing";

import { IFlowItemComponent } from "../interfaces";

export const FlowItemsStore: IObservable<{ treeItemId?: string | undefined, items: IObservable<IFlowItemComponent[]> }> = observe({ items: observe([]) });

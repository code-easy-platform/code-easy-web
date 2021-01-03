import { observe } from 'react-observing';

import { IFlowItem } from "../interfaces";

export const FlowItemsState = observe<IFlowItem[]>([]);

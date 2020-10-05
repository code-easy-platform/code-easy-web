import { selector } from "recoil";

import { FlowItemsStore, FlowItemStore } from "./FlowItems.Store";
import { IFlowItem } from "../../interfaces";

export const GetFlowItemsSelector = selector<IFlowItem[]>({
    key: 'get-flow-items',
    get: ({ get }) => get(FlowItemsStore).map((id) => get(FlowItemStore(id))),
});

export const GetSelectedFlowItemsSelector = selector<IFlowItem[]>({
    key: 'get-selecteds-flow-items',
    get: ({ get }) => {
        return get(FlowItemsStore)
            .map((id) => get(FlowItemStore(id)))
            .filter(item => (
                item.isSelected ||
                (item.connections || []).some(connection => connection.isSelected)
            ));
    },
});

export const GetBoardSizeSelector = selector<{ width: number, height: number }>({
    key: 'get-board-size',
    get: ({ get }) => {
        const flowItems = get(GetFlowItemsSelector).map(item => item);

        try {
            return {
                width: flowItems.length > 0 ? flowItems.sort((a, b) => b.left - a.left)[0].left + 200 : 0,
                height: flowItems.length > 0 ? flowItems.sort((a, b) => b.top - a.top)[0].top + 300 : 0,
            }
        } catch (e) {
            console.log(e)
            return {
                width: 0,
                height: 0,
            }
        }
    }
});

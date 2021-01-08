import React, { createContext, useEffect } from 'react';
import { IObservable, observe, set } from 'react-observing';

import { IFlowItem } from '../interfaces';
import { EFlowItemType } from '../enums';
import { useSizeByText } from '../hooks';

export const ItemsContext = createContext<IObservable<IFlowItem[]>>(observe([]));

interface ItemsProviderProps {
    items: IFlowItem[];
}
export const ItemsProvider: React.FC<ItemsProviderProps> = ({ children, items }) => {
    const ItemsStore = observe<IFlowItem[]>([]);
    const getSizeByText = useSizeByText();

    useEffect(() => {
        set(ItemsStore, items.map(item => {
            if (item.flowItemType.value !== EFlowItemType.comment) {
                return item;
            }

            const commentSizes = getSizeByText(item.description.value || '');
            return {
                ...item,
                height: observe(commentSizes.height),
                width: observe(commentSizes.width),
            };
        }))
    }, [getSizeByText, ItemsStore, items]);

    return (
        <ItemsContext.Provider value={ItemsStore}>
            {children}
        </ItemsContext.Provider>
    );
};

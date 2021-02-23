import React, { createContext, useEffect } from 'react';
import { IObservable, ISubscription, observe, set } from 'react-observing';

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
        set(ItemsStore, items)
    }, [ItemsStore, items]);

    useEffect(() => {
        const subscriptions: ISubscription[] = [];

        items.forEach(item => {
            if (item.flowItemType.value === EFlowItemType.comment) {

                const { height, width } = getSizeByText(item.description.value || '');
                set(item.height, height);
                set(item.width, width);

                subscriptions.push(item.description.subscribe(value => {
                    const { height, width } = getSizeByText(value || '');
                    set(item.height, height);
                    set(item.width, width);
                }));
            }
        });

        return () => subscriptions.forEach(subs => subs.unsubscribe());
    }, [getSizeByText, items]);

    return (
        <ItemsContext.Provider value={ItemsStore}>
            {children}
        </ItemsContext.Provider>
    );
};

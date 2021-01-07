import { useEffect, useState } from 'react';
import { ISubscription } from 'react-observing';

import { useEditorContext } from './useEditorContext';
import { TreeItemComponent } from '../models';

export const useTreeItems = (): TreeItemComponent[] => {
    const [items, setItems] = useState<({ treeItem: TreeItemComponent } & { tabId: string })[]>([]);
    const { tabs } = useEditorContext();

    useEffect(() => {
        const subscriptions: ISubscription[] = [];

        setItems(() => {
            const items: ({ treeItem: TreeItemComponent } & { tabId: string })[] = [];

            tabs.forEach(tab => {
                items.push(...tab.items.value.map(treeItem => ({ tabId: String(tab.id.value), treeItem })));
            });

            return items;
        });

        tabs.forEach(tab => {
            subscriptions.push(tab.items.subscribe(items => {
                setItems(oldItems => {
                    return oldItems.filter(filteredItem => {
                        return filteredItem.tabId === tab.id.value && items.some(newItem => filteredItem.treeItem.id.value === newItem.id.value)
                    });
                });

                items.forEach(item => {
                    setItems(oldItems => {
                        if (!oldItems.some(oldItem => oldItem.treeItem.id.value === item.id.value)) {
                            oldItems.push({
                                tabId: String(tab.id.value),
                                treeItem: item,
                            });
                        }
                        return oldItems;
                    });
                });
            }));
        });

        return () => subscriptions.forEach(subs => subs?.unsubscribe())
    }, [tabs]);

    console.log('aqui')

    return items.map(item => item.treeItem);
}
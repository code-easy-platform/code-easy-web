import { useCallback, useEffect, useState } from "react"
import { IObservable, ISubscription, set, useObserver, useObserverValue } from "react-observing";

import { TreeItemsStore } from "../stores";


/**
 * Get all base items
 */
export const useBaseItems = () => {
    const items = useObserverValue(TreeItemsStore);
    return items.filter(item => !item.ascendantId.value);
}

/**
 * Get all childs by id
 */
export const useItemsByAscendentId = (id: string | undefined) => {
    const items = useObserverValue(TreeItemsStore);
    const [childs, setChilds] = useState(items.filter(item => item.ascendantId.value === id));

    useEffect(() => {
        const subscriptions: ISubscription[] = [];

        items.forEach(item => {
            subscriptions.push(
                item.ascendantId.subscribe(ascendantId => {
                    if (ascendantId === id) {
                        setChilds(oldChilds => {
                            if (!oldChilds.some(child => child.id.value === item.id.value)) {
                                return [...oldChilds, item];
                            } else {
                                return oldChilds;
                            }
                        });
                    } else {
                        setChilds(oldChilds => {
                            if (oldChilds.some(child => child.id.value === item.id.value)) {
                                return [...oldChilds.filter(child => child.id.value !== item.id.value)];
                            } else {
                                return oldChilds;
                            }
                        });
                    }
                })
            );
        });

        return () => subscriptions.forEach(subs => subs?.unsubscribe());
    }, [id, items]);

    return childs;
}

export const useItems = () => {
    const [items] = useObserver(TreeItemsStore);

    const selectItem = useCallback((observeble: IObservable<boolean | undefined>, keepSelection?: boolean) => {
        if (keepSelection) {
            set(observeble, oldValue => !oldValue);
        } else {
            items.forEach(item => {
                set(item.isSelected, item.isSelected.id === observeble.id);
            });
        }
    }, [items]);

    const editItem = useCallback((observeble: IObservable<boolean | undefined>) => {
        items.forEach(item => {
            set(item.isEditing, item.isEditing.id === observeble.id);
        });
    }, [items]);

    const changeAscendentById = useCallback((id: string | undefined, targetId: string | undefined) => {
        if (!id && !targetId) return;

        if (id === targetId) return;

        const droppedItem = items.find(item => item.id.value === id);
        if (droppedItem) {
            set(droppedItem.ascendantId, targetId);
        }
    }, [items]);

    return {
        /**
         * Change the `ascendantId` by the received id
         */
        changeAscById: changeAscendentById,
        /**
         * Select a item and deselects others if necessary
         */
        selectItem,
        /**
         * Edit only a item 
         */
        editItem,
    }
} 

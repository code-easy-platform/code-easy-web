import { useCallback, useContext, useEffect, useState } from "react"
import { IObservable, ISubscription, set } from "react-observing";

import { ItemsContext } from './../contexts';

/**
 * Get all base items
 */
export const useBaseItems = () => {
    const { items } = useContext(ItemsContext);
    const [baseItems, setBaseItems] = useState(items.filter(item => !item.ascendantId.value));

    useEffect(() => {
        const subscriptions: ISubscription[] = [];

        setBaseItems(items.filter(item => !item.ascendantId.value));

        items.forEach(item => {
            subscriptions.push(
                item.ascendantId.subscribe(ascendantId => {
                    if (!ascendantId) {
                        setBaseItems(oldChilds => {
                            if (!oldChilds.some(child => child.id.value === item.id.value)) {
                                return [...oldChilds, item];
                            } else {
                                return oldChilds;
                            }
                        });
                    } else {
                        setBaseItems(oldChilds => {
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
    }, [items]);

    return baseItems;
}

/**
 * Get all childs by id
 */
export const useItemsByAscendentId = (id: string | undefined) => {
    const { items } = useContext(ItemsContext);
    const [childs, setChilds] = useState(items.filter(item => item.ascendantId.value === id));

    useEffect(() => {
        const subscriptions: ISubscription[] = [];

        setChilds(items.filter(item => item.ascendantId.value === id));

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
    const { items } = useContext(ItemsContext);

    const selectItem = useCallback((observeble: IObservable<boolean | undefined>, keepSelection?: boolean) => {
        if (keepSelection) {
            set(observeble, oldValue => !oldValue);
        } else {
            items.forEach(item => {
                if (item.isSelected.id === observeble.id) {
                    if (!item.isSelected.value) {
                        set(item.isSelected, true);
                    }
                } else {
                    if (item.isSelected.value) {
                        set(item.isSelected, false);
                    }
                }
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

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

    useEffect(() => {
        const subscriptions: ISubscription[] = [];

        childs.forEach(item => {
            subscriptions.push(
                item.order.subscribe(() => {
                    setChilds([...childs.sort((a, b) => a.order.value - b.order.value)]);
                })
            );
        });

        return () => subscriptions.forEach(subs => subs?.unsubscribe());
    }, [childs]);

    return childs.sort((a, b) => a.order.value - b.order.value);
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

    const changeAscendentById = useCallback((id: string | undefined, targetId: string | undefined, position: 'up' | 'center' | 'down' = 'center') => {
        if (!id && !targetId) return;

        if (id === targetId) return;

        /* Current drag item */
        const droppedItem = items.find(item => item.id.value === id);
        if (!droppedItem) return;

        /* Current target item */
        const targetItem = items.find(item => item.id.value === targetId);
        if (!targetItem) return;

        /* All childs of the target iterm */
        const targetChilds = items.filter(item => item.ascendantId.value === targetId);

        /* All childs of the target parent item */
        const parentChilds = items.filter(item => item.ascendantId.value === targetItem.ascendantId.value);

        // Insert the item in the last position
        if (position === 'center') {
            const filteredTargetChilds = targetChilds.filter(item => item.id.value !== id);

            set(droppedItem.ascendantId, targetId);

            filteredTargetChilds.splice(filteredTargetChilds.length, 0, droppedItem);

            filteredTargetChilds.forEach((child, index) => set(child.order, index));
            return;
        }

        // Insert the item in the parent at the current order
        else if (position === 'up') {
            const filteredParentChilds = parentChilds.filter(item => item.id.value !== id);

            // Find the index to insert
            const indexToInsert = filteredParentChilds.findIndex(item => item.id.value === targetItem.id.value);
            if (indexToInsert === -1) return;

            filteredParentChilds.splice(indexToInsert, 0, droppedItem);

            set(droppedItem.ascendantId, targetItem.ascendantId.value);

            filteredParentChilds.forEach((child, index) => set(child.order, index));
            return;
        }

        // If this item is expanded insert the dragged item inside. If this item is collapsed insert in the current order + 1
        else if (position === 'down') {
            const filteredTargetChilds = targetChilds.filter(item => item.id.value !== id);

            if (filteredTargetChilds.length > 0 && targetItem.nodeExpanded.value) {
                set(droppedItem.ascendantId, targetId);

                filteredTargetChilds.splice(0, 0, droppedItem);

                filteredTargetChilds.forEach((child, index) => set(child.order, index));
            } else {
                const filteredParentChilds = parentChilds.filter(item => item.id.value !== id);

                // Find the index to insert
                const indexToInsert = filteredParentChilds.findIndex(item => item.id.value === targetItem.id.value);
                if (indexToInsert === -1) return;

                filteredParentChilds.splice(indexToInsert + 1, 0, droppedItem);

                set(droppedItem.ascendantId, targetItem.ascendantId.value);

                filteredParentChilds.forEach((child, index) => set(child.order, index));
            }
            return;
        }
    }, [items]);

    const handleSelectAll = useCallback(() => {
        items.forEach(item => {
            if (item.isDisabledSelect.value || item.isDisabled.value || item.isDisabledClick.value) return;

            set(item.isSelected, true);
        });
    }, [items]);

    return {
        /**
         * Change the `ascendantId` by the received id
         */
        changeAscendentById,
        /**
         * Select a item and deselects others if necessary
         */
        selectItem,
        /**
         * Edit only a item 
         */
        editItem,
        /**
         * Edit only a item 
         */
        selectAll: handleSelectAll,
    }
}

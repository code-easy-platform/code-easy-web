import { useContext, useCallback } from "react"
import { ItemsContext } from "../contexts";


export const useItems = () => {
    const { items, setItems } = useContext(ItemsContext);

    const itemsBase = items.filter(item => !item.ascendantId);

    const itemsByAscendentId = useCallback((id: string | undefined) => {
        if (!id) return [];

        return items.filter(item => item.ascendantId === id)
    }, [items]);

    const expandItemById = useCallback((id: string | undefined) => {
        if (!id) return;

        setItems(
            items.map(item => {
                if (item.id === id) {
                    item.nodeExpanded = !item.nodeExpanded;
                }
                return item;
            })
        );
    }, [items, setItems]);

    const selectItemById = useCallback((id: string | undefined, keepSelection?: boolean) => {
        if (!id) return;

        if (items.find(item => item.id === id)?.isSelected) {
            return;
        }

        setItems(
            items.map(item => {
                if (keepSelection) {
                    item = {
                        ...item,
                        isSelected: item.id === id
                    };
                } else {
                    item = {
                        ...item,
                        isSelected: item.id === id
                    };
                }
                return item;
            })
        );
    }, [items, setItems]);

    const editItemById = useCallback((id: string | undefined) => {
        if (!id) return;

        if (items.find(item => item.id === id)?.isEditing) {
            return;
        }

        setItems(
            items.map(item => {
                return {
                    ...item,
                    isEditing: item.id === id
                };
            })
        );
    }, [items, setItems]);

    const changeAscendentById = useCallback((id: string | undefined, targetId: string | undefined) => {
        if (!id && !targetId) return;

        if (id === targetId) return;

        setItems(
            items.map(item => {
                if (item.id === id) {
                    item.ascendantId = targetId;
                }
                return item;
            })
        );
    }, [items, setItems]);

    return {
        /**
         * Change the `ascendantId` by the received id
         */
        changeAscById: changeAscendentById,
        /**
         * Get all childs by id
         */
        itemsByAscId: itemsByAscendentId,
        /**
         * Get all base items
         */
        baseItems: itemsBase,
        /**
         * Expand item by id
         */
        expandItemById,
        /**
         * Select a item by id
         */
        selectItemById,
        /**
         * Edit a item by id
         */
        editItemById,
    }
} 

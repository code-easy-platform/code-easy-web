import { useEffect, useState } from "react";
import { ISubscription, observe, set, useSetObserver } from "react-observing";

import { IBreadCrumbButton, IFlowItem } from "../components/external";
import { useEditorContext } from "./useEditorContext";
import { TreeItemComponent } from "../models";
import { EComponentType } from "../enuns";


export const useFlowEditorItems = () => {
    const { tabs } = useEditorContext();
    const [editingTreeItem, setEditingTreeItem] = useState<TreeItemComponent<EComponentType>>();
    const [hasSomethingToEdit, setHasSomethingToEdit] = useState<boolean>(false);
    const [breadcamps, setBreadcamps] = useState<IBreadCrumbButton[]>([]);
    const [flowItems, setFlowItems] = useState<IFlowItem[]>([]);
    const setItems = useSetObserver(editingTreeItem?.items || observe([]));

    // Find tree item
    useEffect(() => {
        const subscriptions: (ISubscription & { itemId: string | undefined })[] = [];

        tabs.forEach(tab => {
            tab.items.value.forEach(treeItem => {
                if (treeItem.isEditing.value) {
                    setEditingTreeItem(treeItem);
                }

                if (!subscriptions.some(subs => subs.itemId === treeItem.id.value)) {
                    subscriptions.push({
                        itemId: treeItem.id.value,
                        ...treeItem.isEditing.subscribe(isEditing => {
                            if (isEditing) {
                                setEditingTreeItem(treeItem);
                            } else if (editingTreeItem?.id.value === treeItem.id.value) {
                                setEditingTreeItem(undefined);
                            }
                        }),
                    })
                }
            });

            subscriptions.push({
                itemId: tab.items.id,
                ...tab.items.subscribe(treeItems => {
                    treeItems.forEach(treeItem => {
                        if (treeItem.isEditing.value) {
                            setEditingTreeItem(treeItem);
                        }

                        if (!subscriptions.some(subs => subs.itemId === treeItem.id.value)) {
                            subscriptions.push({
                                itemId: treeItem.id.value,
                                ...treeItem.isEditing.subscribe(isEditing => {
                                    if (isEditing) {
                                        setEditingTreeItem(treeItem);
                                    } else if (editingTreeItem?.id.value === treeItem.id.value) {
                                        setEditingTreeItem(undefined);
                                    }
                                }),
                            })
                        }
                    });
                })
            });
        });

        return () => subscriptions.forEach(subs => subs?.unsubscribe());
    }, [editingTreeItem, tabs]);

    // Get list of flow items
    useEffect(() => {
        const subscriptions: ISubscription[] = [];

        if (editingTreeItem?.items) {
            setFlowItems(editingTreeItem.items.value.map<IFlowItem>(flowItem => ({
                id: flowItem.id,
                top: flowItem.top,
                left: flowItem.left,
                icon: flowItem.icon,
                label: flowItem.label,
                width: flowItem.width,
                height: flowItem.height,
                itemType: flowItem.type,
                hasError: flowItem.hasError,
                hasWarning: flowItem.hasWarning,
                isSelected: flowItem.isSelected,
                isDisabled: flowItem.isDisabled,
                connections: flowItem.connections,
                description: flowItem.description,
                flowItemType: flowItem.flowItemType,
                isEditingTitle: flowItem.isEditingTitle,
                isEnabledNewConnetion: flowItem.isEnabledNewConnetion,
                isAcceptingConnections: flowItem.isAcceptingConnections,
                isEditableOnDoubleClick: flowItem.isEditableOnDoubleClick,
            })));

            subscriptions.push(
                editingTreeItem.items.subscribe(items => {
                    setFlowItems(items.map<IFlowItem>(flowItem => ({
                        id: flowItem.id,
                        top: flowItem.top,
                        left: flowItem.left,
                        icon: flowItem.icon,
                        label: flowItem.label,
                        width: flowItem.width,
                        height: flowItem.height,
                        itemType: flowItem.type,
                        hasError: flowItem.hasError,
                        hasWarning: flowItem.hasWarning,
                        isSelected: flowItem.isSelected,
                        isDisabled: flowItem.isDisabled,
                        connections: flowItem.connections,
                        description: flowItem.description,
                        flowItemType: flowItem.flowItemType,
                        isEditingTitle: flowItem.isEditingTitle,
                        isEnabledNewConnetion: flowItem.isEnabledNewConnetion,
                        isAcceptingConnections: flowItem.isAcceptingConnections,
                        isEditableOnDoubleClick: flowItem.isEditableOnDoubleClick,
                    })));
                })
            );
        } else {
            setFlowItems([]);
        }

        return () => subscriptions.forEach(subs => subs?.unsubscribe());
    }, [editingTreeItem]);

    // Get breadcrumps
    useEffect(() => {
        const subscriptions: ISubscription[] = [];

        if (!editingTreeItem) {
            setBreadcamps([]);
        } else {
            tabs.forEach(tab => {
                tab.items.value.forEach(treeItem => {
                    if (treeItem.id.value === editingTreeItem.id.value) {
                        setBreadcamps([
                            {
                                label: tab.label,
                                onClick: observe(() => {
                                    tabs.forEach(tabToUpdate => set(tabToUpdate.isEditing, tabToUpdate.id.value === tab.id.value));
                                })
                            },
                            {
                                label: treeItem.label,
                                onClick: observe(() => {
                                    tabs.forEach(tabToUpdate => {
                                        set(tabToUpdate.isEditing, tabToUpdate.id.value === tab.id.value)
                                        tabToUpdate.items.value.forEach(item => {
                                            set(item.isSelected, item.id.value === treeItem.id.value);
                                        });
                                    });
                                }),
                            }
                        ]);
                    }
                });
            });
        }

        return () => subscriptions.forEach(subs => subs?.unsubscribe());
    }, [editingTreeItem, tabs]);

    // Set has something to edit
    useEffect(() => {
        setHasSomethingToEdit(tabs.some(tab => tab.items.value.length > 0));
    }, [tabs]);

    return {
        setItems,
        flowItems,
        breadcamps,
        hasSomethingToEdit,
        hasSomethingEditing: !!editingTreeItem,
    };
}

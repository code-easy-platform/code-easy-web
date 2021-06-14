import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ISubscription, observe, transform, useObserver, useObserverValue } from 'react-observing';
import { IconTrash, Utils } from 'code-easy-components';

import { Tab, TreeItemFolder, TreeItemGlobalAction, TreeItemInputVariable, TreeItemLocalVariable, TreeItemOutpuVariable, TreeItemRouterConsume, TreeItemRouterExpose, TreeItemRouterInputVariable } from '../../../shared/models';
import { TreeManager, ITreeItem } from '../../../shared/components/external';
import { useEditorContext, useTabList, useCurrentFocus } from '../../../shared/hooks';
import { ECurrentFocus, EComponentType, ETabType, } from '../../../shared/enuns';
import { AssetsService, openContextMenu } from '../../../shared/services';
import { IContextItemList } from '../../../shared/interfaces';

const useCurrentTab = () => {
    const [currentTab, setCurrentTab] = useState<Tab>();

    const { project } = useEditorContext();
    const tabs = useObserverValue(project.tabs);
    const [itemsCurrent, setItemsCurrent] = useObserver(currentTab?.items || observe([]));

    useEffect(() => {
        const subscriptions: ISubscription[] = [];

        tabs.forEach(tab => {

            if (tab.isEditing.value) {
                setCurrentTab(tab);
            }

            subscriptions.push(tab.isEditing.subscribe(isEditing => {
                if (isEditing) {
                    setCurrentTab(tab);
                }
            }));
        });

        return () => subscriptions.forEach(subs => subs?.unsubscribe());
    }, [tabs]);

    return {
        currentTab,
        itemsCurrent,
        setItemsCurrent
    };
}

export const TreeManagerController: React.FC = () => {
    const { itemsCurrent, currentTab } = useCurrentTab();
    const { setCurrentFocus } = useCurrentFocus();
    const { tabListStore } = useTabList();

    const treeManagerOnKeyDowm = useCallback((e: React.FocusEvent<HTMLDivElement> | any) => {
        if (e.key === 'Delete') {
            const itemsToRemove = itemsCurrent.filter(itemCurrent => itemCurrent.isSelected.value);
            itemsToRemove.forEach(itemToRemove => {
                if (itemToRemove.id.value) {
                    currentTab?.removeItem(itemToRemove.id.value);

                    // Remove item from the tab
                    tabListStore.closeTab(itemToRemove.id.value);
                }
            });
        }
    }, [itemsCurrent, currentTab, tabListStore])

    /** Quando clicado com o botão esquerdo do mouse no interior da árvore esta função é acionada. */
    const treeManagerContextMenu = useCallback((itemId: string | undefined) => {
        let options: IContextItemList[] = [];

        /** Add a new param into other type of tree item */
        const addParam = (inputItemId: string | undefined, paramType: EComponentType.inputVariable | EComponentType.localVariable | EComponentType.outputVariable) => {
            if (!currentTab) return;

            if (paramType === EComponentType.inputVariable) {
                const newName = Utils.newName('Input', itemsCurrent.map(item => item.label.value));
                const newTreeItem = TreeItemInputVariable.newVariable(currentTab, newName, inputItemId);
                currentTab.addItem(newTreeItem);
            } else if (paramType === EComponentType.localVariable) {
                const newName = Utils.newName('Local', itemsCurrent.map(item => item.label.value));
                const newTreeItem = TreeItemLocalVariable.newVariable(currentTab, newName, inputItemId);
                currentTab.addItem(newTreeItem);
            } else if (paramType === EComponentType.outputVariable) {
                const newName = Utils.newName('Out', itemsCurrent.map(item => item.label.value));
                const newTreeItem = TreeItemOutpuVariable.newVariable(currentTab, newName, inputItemId);
                currentTab.addItem(newTreeItem);
            }
        }

        /** Add a new param into a route */
        const addParamToARoute = (inputItemId: string | undefined, paramType: EComponentType.inputVariable | EComponentType.localVariable | EComponentType.outputVariable) => {
            if (!currentTab) return;

            if (paramType === EComponentType.inputVariable) {
                const newName = Utils.newName('Input', itemsCurrent.map(item => item.label.value));
                const newTreeItem = TreeItemRouterInputVariable.newVariable(currentTab, newName, inputItemId);
                currentTab.addItem(newTreeItem);
            } else if (paramType === EComponentType.localVariable) {
                const newName = Utils.newName('Local', itemsCurrent.map(item => item.label.value));
                const newTreeItem = TreeItemLocalVariable.newVariable(currentTab, newName, inputItemId);
                currentTab.addItem(newTreeItem);
            } else if (paramType === EComponentType.outputVariable) {
                const newName = Utils.newName('Out', itemsCurrent.map(item => item.label.value));
                const newTreeItem = TreeItemOutpuVariable.newVariable(currentTab, newName, inputItemId);
                currentTab.addItem(newTreeItem);
            }
        }

        /** Add a new route */
        const addRoute = (inputItemId: string | undefined, routerType: EComponentType.routeConsume | EComponentType.routeExpose) => {
            if (!currentTab) return;

            const newName = Utils.newName('NewRouter', itemsCurrent.map(item => item.label.value));
            if (routerType === EComponentType.routeConsume) {
                const newTreeItem = TreeItemRouterConsume.newRoute(currentTab, newName, inputItemId);
                currentTab.addItem(newTreeItem);
            } else if (routerType === EComponentType.routeExpose) {
                const newTreeItem = TreeItemRouterExpose.newRoute(currentTab, newName, inputItemId);
                currentTab.addItem(newTreeItem);
            }
        }

        /** Add a new global action */
        const addAction = (inputItemId: string | undefined) => {
            if (!currentTab) return;

            const newName = Utils.newName('NewAction', itemsCurrent.map(item => item.label.value));
            const newTreeItem = TreeItemGlobalAction.newAction(currentTab, newName, inputItemId);
            currentTab.addItem(newTreeItem);
        }

        /** Add a new folder */
        const addFolder = () => {
            if (!currentTab) return;

            const newName = Utils.newName('NewFolder', itemsCurrent.map(item => item.label.value));
            const newTreeItem = TreeItemFolder.newFolder(currentTab, newName);
            currentTab.addItem(newTreeItem);
        }

        /** Remove tree items */
        const removeItem = (inputItemId: string | undefined) => {
            if (!inputItemId) return;
            currentTab?.removeItem(inputItemId);

            // Remove item from the tab
            tabListStore.closeTab(inputItemId);
        };

        switch (currentTab?.type.value) {
            case ETabType.tabRoutes:
                const itemTabRoutes = itemsCurrent.find(item => item.id.value === itemId);
                if (itemId === undefined || itemTabRoutes?.type.value === EComponentType.grouper) {
                    options.push({
                        action: () => addRoute(itemId, EComponentType.routeExpose),
                        icon: AssetsService.getIcon(EComponentType.routeExpose),
                        label: 'Expose a new route'
                    });
                    options.push({
                        action: () => addRoute(itemId, EComponentType.routeConsume),
                        icon: AssetsService.getIcon(EComponentType.routeConsume),
                        label: 'Consume a new route'
                    });
                }
                if (itemId === undefined) {
                    options.push({
                        icon: AssetsService.getIcon(EComponentType.grouper),
                        action: () => addFolder(),
                        label: 'New folder',
                    });
                }
                break;
            case ETabType.tabActions:
                const itemTabAction = itemsCurrent.find(item => item.id.value === itemId);
                if (itemId === undefined || itemTabAction?.type.value === EComponentType.grouper) {
                    options.push({
                        icon: AssetsService.getIcon(EComponentType.globalAction),
                        action: () => addAction(itemId),
                        label: 'Add new action'
                    });
                }
                if (itemId === undefined) {
                    options.push({
                        icon: AssetsService.getIcon(EComponentType.grouper),
                        action: () => addFolder(),
                        label: 'New folder',
                    });
                }
                break;
            default: break;
        }

        itemsCurrent.forEach(item => {
            if (item.id.value === itemId) {
                switch (item.type.value) {
                    case EComponentType.globalAction:
                        if (options.length > 0) {
                            options.push({
                                action: () => { },
                                label: '-',
                            });
                        }
                        options.push({
                            action: () => addParam(itemId, EComponentType.inputVariable),
                            icon: AssetsService.getIcon(EComponentType.inputVariable),
                            disabled: itemId === undefined,
                            label: 'Add input variable',
                        });
                        options.push({
                            action: () => addParam(itemId, EComponentType.outputVariable),
                            icon: AssetsService.getIcon(EComponentType.outputVariable),
                            disabled: itemId === undefined,
                            label: 'Add output variable'
                        });
                        options.push({
                            action: () => addParam(itemId, EComponentType.localVariable),
                            icon: AssetsService.getIcon(EComponentType.localVariable),
                            disabled: itemId === undefined,
                            label: 'Add local variable'
                        });
                        break;
                    case EComponentType.localAction:
                        if (options.length > 0) {
                            options.push({
                                action: () => { },
                                label: '-',
                            });
                        }
                        options.push({
                            action: () => addParam(itemId, EComponentType.inputVariable),
                            icon: AssetsService.getIcon(EComponentType.inputVariable),
                            disabled: itemId === undefined,
                            label: 'Add input variable'
                        });
                        options.push({
                            action: () => addParam(itemId, EComponentType.outputVariable),
                            icon: AssetsService.getIcon(EComponentType.outputVariable),
                            disabled: itemId === undefined,
                            label: 'Add output variable'
                        });
                        options.push({
                            action: () => addParam(itemId, EComponentType.localVariable),
                            icon: AssetsService.getIcon(EComponentType.localVariable),
                            disabled: itemId === undefined,
                            label: 'Add local variable'
                        });
                        break;
                    case EComponentType.routeExpose:
                        if (options.length > 0) {
                            options.push({
                                action: () => { },
                                label: '-',
                            });
                        }
                        options.push({
                            action: () => addParamToARoute(itemId, EComponentType.inputVariable),
                            icon: AssetsService.getIcon(EComponentType.inputVariable),
                            disabled: itemId === undefined,
                            label: 'Add input param'
                        });
                        options.push({
                            action: () => addParamToARoute(itemId, EComponentType.outputVariable),
                            icon: AssetsService.getIcon(EComponentType.outputVariable),
                            disabled: itemId === undefined,
                            label: 'Add output param'
                        });
                        options.push({
                            action: () => addParamToARoute(itemId, EComponentType.localVariable),
                            icon: AssetsService.getIcon(EComponentType.localVariable),
                            disabled: itemId === undefined,
                            label: 'Add local variable'
                        });
                        break;
                    case EComponentType.routeConsume:
                        if (options.length > 0) {
                            options.push({
                                action: () => { },
                                label: '-',
                            });
                        }
                        options.push({
                            action: () => addParamToARoute(itemId, EComponentType.inputVariable),
                            icon: AssetsService.getIcon(EComponentType.inputVariable),
                            disabled: itemId === undefined,
                            label: 'Add input param'
                        });
                        break;
                    default: break;
                }
            }
        });

        // Add delete option
        if (itemId !== undefined) {
            if (options.length > 0) {
                options.push({
                    action: () => { },
                    label: '-',
                });
            }
            options.push({
                action: () => removeItem(itemId),
                disabled: itemId === undefined,
                useConfirmation: false,
                icon: IconTrash,
                label: 'Delete',
            });
        }

        return options;
    }, [currentTab, itemsCurrent, tabListStore]);

    /** Monta a estrutura da árvore e devolve no return */
    const treeManagerItems = useMemo((): ITreeItem[] => {

        /** Disable doucle click by type */
        const cannotPerformDoubleClick = (type: EComponentType) => {
            switch (type) {
                case EComponentType.inputVariable:
                    return true;
                case EComponentType.grouper:
                    return true;
                case EComponentType.localVariable:
                    return true;
                case EComponentType.outputVariable:
                    return true;
                case EComponentType.routeConsume:
                    return true;
                default:
                    return false;
            }
        }

        /** Allowed drop list by type */
        const getCanDropList = (type: EComponentType) => {
            switch (type) {
                case EComponentType.inputVariable:
                    return [];
                case EComponentType.localAction:
                    return [EComponentType.inputVariable, EComponentType.localVariable, EComponentType.outputVariable];
                case EComponentType.localVariable:
                    return [];
                case EComponentType.outputVariable:
                    return [];
                case EComponentType.routeConsume:
                    return [EComponentType.inputVariable];
                case EComponentType.extension:
                    return [EComponentType.inputVariable, EComponentType.outputVariable];
                case EComponentType.globalAction:
                    return [EComponentType.inputVariable, EComponentType.localVariable, EComponentType.outputVariable];
                case EComponentType.grouper:
                    return [EComponentType.localAction, EComponentType.globalAction, EComponentType.extension, EComponentType.routeConsume, EComponentType.routeExpose];
                case EComponentType.routeExpose:
                    return [EComponentType.inputVariable, EComponentType.localVariable, EComponentType.outputVariable];
                default:
                    return [];
            }
        }

        return itemsCurrent.map(item => ({
            isDisabledDoubleClick: transform(item.type, value => cannotPerformDoubleClick(value)),
            nodeExpanded: transform(item.isExpanded, value => !!value, value => !!value),
            canDropList: transform(item.type, value => getCanDropList(value)),
            description: item.description,
            ascendantId: item.ascendantId,
            hasWarning: item.hasWarning,
            isSelected: item.isSelected,
            isEditing: item.isEditing,
            hasError: item.hasError,
            label: item.label,
            type: item.type,
            icon: item.icon,
            id: item.id,

            isAllowedToggleNodeExpand: observe(undefined),
            useCustomIconToExpand: observe(undefined),
            isDisabledSelect: observe(undefined),
            isDisabledClick: observe(undefined),
            isDisabledDrag: observe(undefined),
            showExpandIcon: observe(undefined),
            isDisabledDrop: observe(undefined),
            isDisabled: observe(undefined),
            iconSize: observe(undefined),
            order: observe(0),
        }));
    }, [itemsCurrent]);

    const handleOnSelect = useCallback((uids: string[]) => {
        if (uids.length === 0) return;

        const selectedItems = currentTab?.items.value.filter(item => uids.includes(String(item.id.value)));
        if (selectedItems?.length === 0) return;

    }, [currentTab]);

    const handleOnEdit = useCallback((uid: string | undefined) => {
        if (!uid) return;

        const newEditingItem = currentTab?.items.value.find(item => item.id.value === uid);
        if (!newEditingItem) return;

        tabListStore.addTab({
            icon: newEditingItem.icon,
            title: newEditingItem.label,
            hasError: newEditingItem.hasError,
            isSelected: newEditingItem.isEditing,
            hasWarning: newEditingItem.hasWarning,
            description: newEditingItem.description,
            id: transform(newEditingItem.id, id => String(id), id => id),
        });
    }, [currentTab, tabListStore]);

    const handleOnFocus = useCallback(() => {
        setCurrentFocus(ECurrentFocus.tree);
    }, [setCurrentFocus]);

    return (
        <TreeManager
            onEdit={handleOnEdit}
            onFocus={handleOnFocus}
            items={treeManagerItems}
            onSelect={handleOnSelect}
            onKeyDown={treeManagerOnKeyDowm}
            onContextMenu={(treeItemId, e) => {
                e.preventDefault();
                openContextMenu(e.clientX, e.clientY, treeManagerContextMenu(treeItemId));
            }}
            configs={{
                id: 'Inspector',
                isUseDrag: true,
                isUseDrop: true,
                showEmptyMessage: treeManagerItems.length === 0,
            }}
        />
    );
}

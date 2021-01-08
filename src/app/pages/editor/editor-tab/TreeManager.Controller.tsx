import React, { useCallback, useEffect, useState } from 'react';
import { ISubscription, observe, useObserver, useObserverValue, useSetObserver } from 'react-observing';
import { IconTrash, Utils } from 'code-easy-components';

import { TreeManager, ITreeItem, CustomDragLayer } from '../../../shared/components/external';
import { AssetsService, openContextMenu } from '../../../shared/services';
import { ECurrentFocus, EComponentType, } from '../../../shared/enuns';
import { IContextItemList } from '../../../shared/interfaces';
import { CurrentFocusStore } from '../../../shared/stores';
import { useEditorContext } from '../../../shared/hooks';
import { Tab } from '../../../shared/models';

const useCurrentTab = () => {
    const [currentTab, setCurrentTab] = useState<Tab>(new Tab({ items: [], type: EComponentType.tabRoutes, properties: [] }));

    const { project } = useEditorContext();
    const tabs = useObserverValue(project.tabs);
    const [itemsCurrent, setItemsCurrent] = useObserver(currentTab.items);

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
    const { itemsCurrent, setItemsCurrent, currentTab } = useCurrentTab();
    const setCurrentFocus = useSetObserver(CurrentFocusStore);

    /** Remove tree items */
    const treeManagerRemoveItem = useCallback((inputItemId: string | undefined) => {

        // Se for undefined não faz nada
        if (!inputItemId) return;

        setItemsCurrent(oldCurrentItems => oldCurrentItems
            .filter(item => item.id.value !== inputItemId)
            .filter(item => item.ascendantId.value !== inputItemId)
        );

    }, [setItemsCurrent]);

    const treeManagerOnKeyDowm = useCallback((e: React.FocusEvent<HTMLDivElement> | any) => {
        if (e.key === 'Delete') {
            const itemToEdit = itemsCurrent.find(item => item.isSelected.value);
            if (itemToEdit) {
                treeManagerRemoveItem(itemToEdit.id.value);
            }
        }
    }, [itemsCurrent, treeManagerRemoveItem])

    /** Quando clicado com o botão esquerdo do mouse no interior da árvore esta função é acionada. */
    const treeManagerContextMenu = useCallback((itemId: string | undefined) => {
        let options: IContextItemList[] = [];

        const addParam = (inputItemId: string | undefined, paramType: EComponentType.inputVariable | EComponentType.localVariable | EComponentType.outputVariable) => {
            const newName = Utils.newName('NewParam', itemsCurrent.map(item => item.label.value));
            currentTab.addItem(newName, paramType, inputItemId);
        }

        const addRoute = (inputItemId: string | undefined, routerType: EComponentType.routerConsume | EComponentType.routerExpose) => {
            if (inputItemId === undefined) {
                const newName = Utils.newName('NewRouter', itemsCurrent.map(item => item.label.value));
                currentTab.addItem(newName, routerType);
            }
        }

        const addAction = (inputItemId: string | undefined) => {
            if (inputItemId === undefined) {
                const newName = Utils.newName('NewAction', itemsCurrent.map(item => item.label.value));
                currentTab.addItem(newName, EComponentType.globalAction);
            }
        }

        if (currentTab.type.value === EComponentType.tabRoutes) {

            options.push({
                action: () => addRoute(itemId, EComponentType.routerExpose),
                icon: AssetsService.getIcon(EComponentType.routerExpose),
                disabled: itemId !== undefined,
                label: 'Expose a new route'
            });

            options.push({
                icon: AssetsService.getIcon(EComponentType.routerConsume),
                action: () => addRoute(itemId, EComponentType.routerConsume),
                disabled: itemId !== undefined,
                label: 'Consume a new route'
            });

        } else if (currentTab.type.value === EComponentType.tabActions) {

            options.push({
                icon: AssetsService.getIcon(EComponentType.globalAction),
                action: () => addAction(itemId),
                disabled: itemId !== undefined,
                label: 'Add new action'
            });

        } else if (currentTab.type.value === EComponentType.tabDates) {

        }

        itemsCurrent.forEach(item => {
            if (item.id.value === itemId) {
                switch (item.type.value) {
                    case EComponentType.globalAction:
                        options.push({
                            action: () => { },
                            label: '-',
                        });

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
                        options.push({
                            action: () => { },
                            label: '-',
                        });

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

                    case EComponentType.routerExpose:
                        options.push({
                            action: () => { },
                            label: '-',
                        });

                        options.push({
                            action: () => addParam(itemId, EComponentType.inputVariable),
                            icon: AssetsService.getIcon(EComponentType.inputVariable),
                            disabled: itemId === undefined,
                            label: 'Add input param'
                        });
                        options.push({
                            action: () => addParam(itemId, EComponentType.outputVariable),
                            icon: AssetsService.getIcon(EComponentType.outputVariable),
                            disabled: itemId === undefined,
                            label: 'Add output param'
                        });
                        options.push({
                            action: () => addParam(itemId, EComponentType.localVariable),
                            icon: AssetsService.getIcon(EComponentType.localVariable),
                            disabled: itemId === undefined,
                            label: 'Add local variable'
                        });
                        break;

                    case EComponentType.routerConsume:
                        options.push({
                            action: () => { },
                            label: '-',
                        });

                        options.push({
                            action: () => addParam(itemId, EComponentType.inputVariable),
                            icon: AssetsService.getIcon(EComponentType.inputVariable),
                            disabled: itemId === undefined,
                            label: 'Add input param'
                        });
                        break;

                    default: break;
                }
            }
        });

        if (itemId !== undefined) {
            options.push({
                action: () => { },
                label: '-',
            });
            options.push({
                action: () => treeManagerRemoveItem(itemId),
                disabled: itemId === undefined,
                useConfirmation: false,
                icon: IconTrash,
                label: 'Delete',
            });
        }

        return options;
    }, [currentTab, itemsCurrent, treeManagerRemoveItem]);

    /** Monta a estrutura da árvore e devolve no return */
    const treeManagerItems = ((): ITreeItem[] => {

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
                case EComponentType.routerConsume:
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
                case EComponentType.routerConsume:
                    return [EComponentType.inputVariable];
                case EComponentType.extension:
                    return [EComponentType.inputVariable, EComponentType.outputVariable];
                case EComponentType.globalAction:
                    return [EComponentType.inputVariable, EComponentType.localVariable, EComponentType.outputVariable];
                case EComponentType.grouper:
                    return [EComponentType.localAction, EComponentType.globalAction, EComponentType.extension, EComponentType.routerConsume, EComponentType.routerExpose];
                case EComponentType.routerExpose:
                    return [EComponentType.inputVariable, EComponentType.localVariable, EComponentType.outputVariable];
                default:
                    return [];
            }
        }

        let items: ITreeItem[] = itemsCurrent.map((item): ITreeItem => ({
            isDisabledDoubleClick: observe(cannotPerformDoubleClick(item.type.value)),
            isDisabledDrag: observe(item.type.value === EComponentType.routerExpose),
            canDropList: observe(getCanDropList(item.type.value)),
            nodeExpanded: observe(Boolean(item.isExpanded)),
            icon: observe(item.icon.value.content),
            description: item.description,
            ascendantId: item.ascendantId,
            hasWarning: item.hasWarning,
            isSelected: item.isSelected,
            isEditing: item.isEditing,
            hasError: item.hasError,
            label: item.label,
            type: item.type,
            id: item.id,

            isAllowedToggleNodeExpand: observe(undefined),
            useCustomIconToExpand: observe(undefined),
            isDisabledSelect: observe(undefined),
            isDisabledClick: observe(undefined),
            showExpandIcon: observe(undefined),
            isDisabledDrop: observe(undefined),
            isDisabled: observe(undefined),
            iconSize: observe(undefined),
        }));

        return items;
    })();

    return (
        <TreeManager
            items={treeManagerItems}
            onKeyDown={treeManagerOnKeyDowm}
            onFocus={() => setCurrentFocus(ECurrentFocus.tree)}
            onContextMenu={(treeItemId, e) => {
                e.preventDefault();
                openContextMenu(e.clientX, e.clientY, treeManagerContextMenu(treeItemId));
            }}
            configs={{
                id: 'Inspector',
                isUseDrag: true,
                isUseDrop: true,
                activeItemBackgroundColor: '#ffffff05',
                focusedItemBackgroundColor: '#ffffff05',
                editingItemBackgroundColor: '#ffffff10',
                showEmptyMessage: treeManagerItems.length === 0,
                customDragLayer: (item) => (
                    <CustomDragLayer children={item} />
                )
            }}
        />
    );
}

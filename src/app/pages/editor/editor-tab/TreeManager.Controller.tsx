import React, { useCallback } from 'react';
import { IconTrash, Utils, IconFlowStart, IconFlowEnd } from 'code-easy-components';

import { TreeManager, ITreeItem, CustomDragLayer } from '../../../shared/components/tree-manager';
import { ContextMenuService } from '../../../shared/components/context-menu/ContextMenuService';
import { IContextItemList } from '../../../shared/components/context-menu/ContextMenu';
import { TreeItemComponent, FlowItemComponent, Tab } from '../../../shared/models';
import { ECurrentFocus, EComponentType } from '../../../shared/enuns';
import { EItemType } from '../../../shared/components/flow-editor';
import { useEditorContext } from '../../../shared/contexts';
import { AssetsService } from '../../../shared/services';

export const TreeManagerController: React.FC = () => {

    const { project, setProject } = useEditorContext();

    /** Remove tree items */
    const treeManagerRemoveItem = useCallback((inputItemId: string | undefined) => {

        // Se for undefined não faz nada
        if (!inputItemId) return;

        let indexTabToRemove: number | any;
        let indexItemToRemove: number | any;

        // Pega a lista de items corrente na árvore
        project.tabs.forEach((tab: Tab, indexTab) => {
            tab.items.forEach((item, index) => {
                if (item.id === inputItemId) {
                    indexTabToRemove = indexTab;
                    indexItemToRemove = index;
                }
            });
        });

        if (indexItemToRemove !== undefined && indexTabToRemove !== undefined) {

            // Select a new item
            if ((indexItemToRemove - 1) >= 0) {
                project.tabs[indexTabToRemove].items[indexItemToRemove - 1].isSelected = true;
            }

            // Remove o item e retorna ele mesmo para que possa ser removido os seus dependentes
            const deletedItem = project.tabs[indexTabToRemove].items.splice(indexItemToRemove, 1)[0];

            // Busca para o caso de ter um dependente
            let indexToRemove = project.tabs[indexTabToRemove].items.findIndex(item => item.ascendantId === deletedItem.id);
            while (indexToRemove > -1) {
                //Remove o item dependente
                project.tabs[indexTabToRemove].items.splice(indexToRemove, 1);
                //Busca para o caso de ter outro item dependente
                indexToRemove = project.tabs[indexTabToRemove].items.findIndex(item => item.ascendantId === deletedItem.id);
            }
        }

        setProject(project);
    }, [project, setProject]);

    const treeManagerOnKeyDowm = useCallback((e: React.FocusEvent<HTMLDivElement> | any) => {
        if (e.key === 'Delete') {
            let items: TreeItemComponent[] = [];
            project.tabs.forEach((tab: Tab) => {
                if (tab.isEditing) {
                    items = tab.items;
                }
            });

            const itemToEdit = items.find(item => item.isSelected);
            if (itemToEdit) {
                treeManagerRemoveItem(itemToEdit.id);
            }
        }
    }, [project.tabs, treeManagerRemoveItem])

    /** Quando clicado com o botão esquerdo do mouse no interior da árvore esta função é acionada. */
    const treeManagerContextMenu = useCallback((itemId: string | undefined) => {
        let options: IContextItemList[] = [];

        const addParam = (inputItemId: string | undefined, paramType: EComponentType.inputVariable | EComponentType.localVariable | EComponentType.outputVariable) => {
            let tabIndex: number | undefined;

            project.tabs.forEach((tab: Tab, indexTab) => {
                tab.items.forEach(item => {
                    if (item.id === inputItemId) {
                        tabIndex = indexTab;
                    }
                    // Garante não existirá duas tabs sendo editadas ao mesmo tempo.
                    tab.items.forEach(item => {
                        item.isSelected = false;
                    });
                });
            });

            if (tabIndex !== undefined) {
                const newName = Utils.newName('NewParam', project.tabs[tabIndex].items.map(item => item.label));

                project.tabs[tabIndex].items.push(new TreeItemComponent({
                    items: [],
                    label: newName,
                    type: paramType,
                    description: '',
                    isSelected: true,
                    isEditing: false,
                    isExpanded: false,
                    id: Utils.getUUID(),
                    ascendantId: inputItemId,
                }));
            }

            setProject(project);
        }

        const addRoute = (inputItemId: string | undefined, routerType: EComponentType.routerConsume | EComponentType.routerExpose) => {
            if (inputItemId === undefined) {
                let tabIndex: number | undefined;
                project.tabs.forEach((tab: Tab, indexTab) => {
                    if (tab.isEditing) {
                        tabIndex = indexTab;
                    }
                    // Garante não existirá duas tabs sendo editadas ao mesmo tempo.
                    tab.items.forEach(item => {
                        item.isEditing = false;
                        item.isSelected = false;
                    });
                });

                if (tabIndex !== undefined) {
                    const newName = Utils.newName('NewRouter', project.tabs[tabIndex].items.map(item => item.label));

                    project.tabs[tabIndex].items.push(new TreeItemComponent({
                        items: (
                            routerType === EComponentType.routerExpose
                                ? [
                                    new FlowItemComponent({ id: '1', label: EItemType.START, icon: IconFlowStart, type: EItemType.START, left: 188, top: Math.round(128 / 15) * 15, connections: [{ id: Utils.getUUID(), targetId: '2', originId: '1', isSelected: false }] }),
                                    new FlowItemComponent({ id: '2', label: EItemType.END, icon: IconFlowEnd, type: EItemType.END, left: 188, top: Math.round(384 / 15) * 15, connections: [] })
                                ]
                                : []
                        ),
                        label: newName,
                        description: '',
                        type: routerType,
                        isSelected: true,
                        isExpanded: true,
                        id: Utils.getUUID(),
                        ascendantId: inputItemId,
                        isEditing: routerType === EComponentType.routerExpose,
                    }));
                }
            }
            setProject(project);
        }

        const addAction = (inputItemId: string | undefined) => {
            if (inputItemId === undefined) {
                let tabIndex: number | undefined;
                project.tabs.forEach((tab: Tab, indexTab) => {
                    if (tab.isEditing) {
                        tabIndex = indexTab;
                    }
                    // Garante não existirá duas tabs sendo editadas ao mesmo tempo.
                    tab.items.forEach(item => {
                        item.isEditing = false;
                        item.isSelected = false;
                    });
                });

                if (tabIndex !== undefined) {
                    const newName = Utils.newName('NewAction', project.tabs[tabIndex].items.map(item => item.label));

                    project.tabs[tabIndex].items.push(new TreeItemComponent({
                        label: newName,
                        description: '',
                        isEditing: true,
                        isSelected: true,
                        isExpanded: true,
                        id: Utils.getUUID(),
                        ascendantId: inputItemId,
                        type: EComponentType.globalAction,
                        items: [
                            new FlowItemComponent({ id: '1', label: EItemType.START, icon: IconFlowStart, type: EItemType.START, left: 188, top: Math.round(128 / 15) * 15, isSelected: false, connections: [{ id: Utils.getUUID(), targetId: '2', originId: '1', isSelected: false }], properties: [] }),
                            new FlowItemComponent({ id: '2', label: EItemType.END, icon: IconFlowEnd, type: EItemType.END, left: 188, top: Math.round(384 / 15) * 15, isSelected: false, connections: [], properties: [] })
                        ],
                    }));
                }
            }

            setProject(project);
        }

        project.tabs.forEach((tab: Tab) => {
            if (tab.isEditing) {
                if (tab.type === EComponentType.tabRoutes) {

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

                } else if (tab.type === EComponentType.tabActions) {

                    options.push({
                        icon: AssetsService.getIcon(EComponentType.globalAction),
                        action: () => addAction(itemId),
                        disabled: itemId !== undefined,
                        label: 'Add new action'
                    });

                } else if (tab.type === EComponentType.tabDates) {

                }

                tab.items.forEach(item => {
                    if (item.id === itemId) {
                        switch (item.type) {
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
    }, [project, setProject, treeManagerRemoveItem]);

    const handleOnChange = useCallback((updatedItems: ITreeItem[]) => {

        project.tabs.forEach((tab: Tab) => {
            if (tab.isEditing) {

                tab.items = tab.items.map(item => {
                    const updatedItem = updatedItems.find(updatedItem => updatedItem.id === item.id);
                    if (!updatedItem) return item;

                    return new TreeItemComponent({
                        ...item,
                        isEditing: updatedItem.isEditing || false,
                        ascendantId: updatedItem.ascendantId,
                        isExpanded: updatedItem.nodeExpanded,
                        isSelected: updatedItem.isSelected,
                        description: item.description,
                        properties: item.properties,
                        items: item.items,
                        label: item.label,
                        id: item.id,
                    });
                });

            } else {

                const isSelected = updatedItems.find(updatedItem => updatedItem.isSelected);
                const isEditing = updatedItems.find(updatedItem => updatedItem.isEditing);

                tab.items.forEach(item => {
                    if (isSelected) item.isSelected = false;
                    if (isEditing) item.isEditing = false;
                });
            }
        });

        setProject(project);
    }, [project, setProject]);

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

        let items: ITreeItem[] = [];

        project.tabs.forEach((tab: Tab) => {
            if (tab.isEditing) {
                items = tab.items.map((item): ITreeItem => ({
                    ...item,
                    isDisabledDoubleClick: cannotPerformDoubleClick(item.type),
                    isDisabledDrag: item.type === EComponentType.routerExpose,
                    canDropList: getCanDropList(item.type),
                    nodeExpanded: Boolean(item.isExpanded),
                    description: item.description,
                    ascendantId: item.ascendantId,
                    hasWarning: item.hasWarning,
                    icon: item.icon.content,
                    hasError: item.hasError,
                    label: item.label,
                    id: item.id,
                }));
            }
        });

        return items;
    })();

    return (
        <TreeManager
            items={treeManagerItems}
            onChangeItems={handleOnChange}
            onKeyDown={treeManagerOnKeyDowm}
            onFocus={() => project.currentFocus = ECurrentFocus.tree}
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
            onContextMenu={(treeItemId, e) => {
                e.preventDefault();
                console.log(treeItemId)
                ContextMenuService.showMenu(e.clientX, e.clientY, treeManagerContextMenu(treeItemId));
            }}
        />
    );
}

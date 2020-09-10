import React, { useCallback } from 'react';
import { IconTrash, Utils, IconFlowStart, IconFlowEnd } from 'code-easy-components';

import { TreeManager, ITreeItem, CustomDragLayer } from '../../../shared/components/tree-manager';
import { ContextMenuService } from '../../../shared/components/context-menu/ContextMenuService';
import { IContextItemList } from '../../../shared/components/context-menu/ContextMenu';
import { ItemFlowComplete } from '../../../shared/interfaces/ItemFlowComponent';
import { ItemComponent } from '../../../shared/interfaces/ItemTreeComponent';
import { AssetsService } from '../../../shared/services/AssetsService';
import { ComponentType } from '../../../shared/enuns/ComponentType';
import { EItemType } from '../../../shared/components/flow-editor';
import { CurrentFocus } from '../../../shared/enuns/CurrentFocus';
import { useEditorContext } from '../../../shared/contexts';
import { PropertieTypes } from '../../../shared/enuns';
import { Tab } from '../../../shared/interfaces/Tabs';

export const TreeManagerController: React.FC = () => {

    const { project, setProject } = useEditorContext();

    /** Atualiza o contexto do projeto */
    const onChangeState = useCallback(() => setProject(project), [project, setProject]);

    /** Atualiza o foco do editor de propriedades */
    const changeFocus = useCallback(() => project.currentComponentFocus = CurrentFocus.tree, [project.currentComponentFocus]);

    /** Remove items da árvore */
    const treeManagerRemoveItem = (inputItemId: string | undefined) => {

        changeFocus();

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
            let indexToRemove = project.tabs[indexTabToRemove].items.findIndex(item => item.itemPaiId === deletedItem.id);
            while (indexToRemove > -1) {
                //Remove o item dependente
                project.tabs[indexTabToRemove].items.splice(indexToRemove, 1);
                //Busca para o caso de ter outro item dependente
                indexToRemove = project.tabs[indexTabToRemove].items.findIndex(item => item.itemPaiId === deletedItem.id);
            }
        }

        onChangeState();
    };

    const treeManagerOnKeyDowm = (e: React.FocusEvent<HTMLDivElement> | any) => {
        if (e.key === 'Delete') {
            let items: ItemComponent[] = [];
            project.tabs.forEach((tab: Tab) => {
                if (tab.configs.isEditing) {
                    items = tab.items;
                }
            });

            const itemToEdit = items.find(item => item.isSelected);
            if (itemToEdit) {
                treeManagerRemoveItem(itemToEdit.id);
            }

        }
    }

    /** Quando clicado com o botão esquerdo do mouse no interior da árvore esta função é acionada. */
    const treeManagerContextMenu = (itemId: string | undefined) => {

        changeFocus();

        let options: IContextItemList[] = [];

        const addParam = (inputItemId: string | undefined, paramType: ComponentType.inputVariable | ComponentType.localVariable | ComponentType.outputVariable) => {
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

                project.tabs[tabIndex].items.push(new ItemComponent({
                    items: [],
                    name: newName,
                    label: newName,
                    type: paramType,
                    description: '',
                    isSelected: true,
                    isEditing: false,
                    id: Utils.getUUID(),
                    nodeExpanded: false,
                    itemPaiId: inputItemId,
                }));
            }

            onChangeState();
        }

        const addRoute = (inputItemId: string | undefined, routerType: ComponentType.routerConsume | ComponentType.routerExpose) => {
            if (inputItemId === undefined) {
                let tabIndex: number | undefined;
                project.tabs.forEach((tab: Tab, indexTab) => {
                    if (tab.configs.isEditing) {
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

                    project.tabs[tabIndex].items.push(new ItemComponent({
                        items: (
                            routerType === ComponentType.routerExpose
                                ? [
                                    new ItemFlowComplete({ id: '1', name: EItemType.START, icon: IconFlowStart, itemType: EItemType.START, left: 188, top: 128, isSelected: false, connections: [{ id: Utils.getUUID(), targetId: '2', originId: '1', isSelected: false }], properties: [] }),
                                    new ItemFlowComplete({ id: '2', name: EItemType.END, icon: IconFlowEnd, itemType: EItemType.END, left: 188, top: 384, isSelected: false, connections: [], properties: [] })
                                ]
                                : []
                        ),
                        label: newName,
                        description: '',
                        type: routerType,
                        isSelected: true,
                        nodeExpanded: true,
                        id: Utils.getUUID(),
                        itemPaiId: inputItemId,
                        isEditing: routerType === ComponentType.routerExpose,
                    }));
                }
            }
            onChangeState();
        }

        const addAction = (inputItemId: string | undefined) => {
            if (inputItemId === undefined) {
                let tabIndex: number | undefined;
                project.tabs.forEach((tab: Tab, indexTab) => {
                    if (tab.configs.isEditing) {
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

                    project.tabs[tabIndex].items.push(new ItemComponent({
                        id: Utils.getUUID(),
                        label: newName,
                        description: '',
                        isEditing: true,
                        isSelected: true,
                        nodeExpanded: true,
                        itemPaiId: inputItemId,
                        type: ComponentType.globalAction,
                        items: [
                            new ItemFlowComplete({ id: '1', name: "START", icon: IconFlowStart, itemType: EItemType.START, left: 188, top: 128, isSelected: false, connections: [{ id: Utils.getUUID(), targetId: '2', originId: '1', isSelected: false }], properties: [] }),
                            new ItemFlowComplete({ id: '2', name: "END", icon: IconFlowEnd, itemType: EItemType.END, left: 188, top: 384, isSelected: false, connections: [], properties: [] })
                        ],
                    }));
                }
            }
            onChangeState()
        }

        project.tabs.forEach((tab: Tab) => {
            if (tab.configs.isEditing) {
                if (tab.configs.type === ComponentType.tabRoutes) {

                    options.push({
                        action: () => addRoute(itemId, ComponentType.routerExpose),
                        icon: AssetsService.getIcon(ComponentType.routerExpose),
                        disabled: itemId !== undefined,
                        label: 'Expose a new route'
                    });

                    options.push({
                        icon: AssetsService.getIcon(ComponentType.routerConsume),
                        action: () => addRoute(itemId, ComponentType.routerConsume),
                        disabled: itemId !== undefined,
                        label: 'Consume a new route'
                    });

                } else if (tab.configs.type === ComponentType.tabActions) {

                    options.push({
                        icon: AssetsService.getIcon(ComponentType.globalAction),
                        action: () => addAction(itemId),
                        disabled: itemId !== undefined,
                        label: 'Add new action'
                    });

                } else if (tab.configs.type === ComponentType.tabDates) {

                }

                tab.items.forEach(item => {
                    if (item.id === itemId) {
                        switch (item.type) {
                            case ComponentType.globalAction:
                                options.push({
                                    action: () => { },
                                    label: '-',
                                });

                                options.push({
                                    action: () => addParam(itemId, ComponentType.inputVariable),
                                    icon: AssetsService.getIcon(ComponentType.inputVariable),
                                    disabled: itemId === undefined,
                                    label: 'Add input variable',
                                });
                                options.push({
                                    action: () => addParam(itemId, ComponentType.outputVariable),
                                    icon: AssetsService.getIcon(ComponentType.outputVariable),
                                    disabled: itemId === undefined,
                                    label: 'Add output variable'
                                });
                                options.push({
                                    action: () => addParam(itemId, ComponentType.localVariable),
                                    icon: AssetsService.getIcon(ComponentType.localVariable),
                                    disabled: itemId === undefined,
                                    label: 'Add local variable'
                                });
                                break;

                            case ComponentType.localAction:
                                options.push({
                                    action: () => { },
                                    label: '-',
                                });

                                options.push({
                                    action: () => addParam(itemId, ComponentType.inputVariable),
                                    icon: AssetsService.getIcon(ComponentType.inputVariable),
                                    disabled: itemId === undefined,
                                    label: 'Add input variable'
                                });
                                options.push({
                                    action: () => addParam(itemId, ComponentType.outputVariable),
                                    icon: AssetsService.getIcon(ComponentType.outputVariable),
                                    disabled: itemId === undefined,
                                    label: 'Add output variable'
                                });
                                options.push({
                                    action: () => addParam(itemId, ComponentType.localVariable),
                                    icon: AssetsService.getIcon(ComponentType.localVariable),
                                    disabled: itemId === undefined,
                                    label: 'Add local variable'
                                });
                                break;

                            case ComponentType.routerExpose:
                                options.push({
                                    action: () => { },
                                    label: '-',
                                });

                                options.push({
                                    action: () => addParam(itemId, ComponentType.inputVariable),
                                    icon: AssetsService.getIcon(ComponentType.inputVariable),
                                    disabled: itemId === undefined,
                                    label: 'Add input param'
                                });
                                options.push({
                                    action: () => addParam(itemId, ComponentType.outputVariable),
                                    icon: AssetsService.getIcon(ComponentType.outputVariable),
                                    disabled: itemId === undefined,
                                    label: 'Add output param'
                                });
                                options.push({
                                    action: () => addParam(itemId, ComponentType.localVariable),
                                    icon: AssetsService.getIcon(ComponentType.localVariable),
                                    disabled: itemId === undefined,
                                    label: 'Add local variable'
                                });
                                break;

                            case ComponentType.routerConsume:
                                options.push({
                                    action: () => { },
                                    label: '-',
                                });

                                options.push({
                                    action: () => addParam(itemId, ComponentType.inputVariable),
                                    icon: AssetsService.getIcon(ComponentType.inputVariable),
                                    disabled: itemId === undefined,
                                    label: 'Add input param'
                                });
                                break;

                            default:
                                break;
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
    }

    const handleOnChange = useCallback((updatedItems: ITreeItem[]) => {

        project.tabs.forEach((tab: Tab) => {
            if (tab.configs.isEditing) {

                tab.items = tab.items.map(item => {
                    const updatedItem = updatedItems.find(updatedItem => updatedItem.id === item.id);
                    if (!updatedItem) return item;

                    return new ItemComponent({
                        ...item,
                        isEditing: updatedItem.isEditing || false,
                        nodeExpanded: updatedItem.nodeExpanded,
                        isSelected: updatedItem.isSelected,
                        itemPaiId: updatedItem.ascendantId,
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

        changeFocus();
        onChangeState();
    }, [project.tabs, onChangeState, changeFocus]);

    /** Monta a estrutura da árvore e devolve no return */
    const treeManagerItems = ((): ITreeItem[] => {

        const cannotPerformDoubleClick = (type: ComponentType) => {
            switch (type) {
                case ComponentType.inputVariable:
                    return true;
                case ComponentType.grouper:
                    return true;
                case ComponentType.localVariable:
                    return true;
                case ComponentType.outputVariable:
                    return true;
                case ComponentType.routerConsume:
                    return true;

                default:
                    return false;
            }
        }

        const getCanDropList = (type: ComponentType) => {
            switch (type) {
                case ComponentType.inputVariable:
                    return [];
                case ComponentType.localAction:
                    return [ComponentType.inputVariable, ComponentType.localVariable, ComponentType.outputVariable];
                case ComponentType.localVariable:
                    return [];
                case ComponentType.outputVariable:
                    return [];
                case ComponentType.routerConsume:
                    return [ComponentType.inputVariable];
                case ComponentType.extension:
                    return [ComponentType.inputVariable, ComponentType.outputVariable];
                case ComponentType.globalAction:
                    return [ComponentType.inputVariable, ComponentType.localVariable, ComponentType.outputVariable];
                case ComponentType.grouper:
                    return [ComponentType.localAction, ComponentType.globalAction, ComponentType.extension, ComponentType.routerConsume, ComponentType.routerExpose];
                case ComponentType.routerExpose:
                    return [ComponentType.inputVariable, ComponentType.localVariable, ComponentType.outputVariable];
                default:
                    return [];
            }
        }

        let items: ITreeItem[] = [];

        project.tabs.forEach((tab: Tab) => {
            if (tab.configs.isEditing) {
                items = tab.items.map(item => ({
                    ...item,
                    icon: item.properties.find(prop => prop.propertieType === PropertieTypes.icon)?.value.content || AssetsService.getIcon(item.type),
                    hasWarning: item.items.some(itemFlow => itemFlow.properties.some(prop => (prop.valueHasWarning || prop.nameHasWarning))),
                    hasError: item.items.some(itemFlow => itemFlow.properties.some(prop => (prop.valueHasError || prop.nameHasError))),
                    isDisabledDoubleClick: cannotPerformDoubleClick(item.type),
                    canDropList: getCanDropList(item.type),
                    ascendantId: item.itemPaiId,
                }));
            }
        });

        return items;
    })();

    return (
        <TreeManager
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
            items={treeManagerItems}
            onChangeItems={handleOnChange}
            onKeyDown={treeManagerOnKeyDowm}
            onContextMenu={(itemId, e) => {
                e.preventDefault();
                ContextMenuService.showMenu(e.clientX, e.clientY, treeManagerContextMenu(itemId));
            }}
        />
    );
}

import React, { useCallback } from 'react';
import { IconTrash, Utils, IconFlowStart, IconFlowEnd } from 'code-easy-components';

import { TreeManager, ITreeItem, CustomDragLayer } from '../../../shared/components/tree-manager';
import { ContextMenuService } from '../../../shared/components/context-menu/ContextMenuService';
import { IContextItemList } from '../../../shared/components/context-menu/ContextMenu';
import { PropertieTypes, ECurrentFocus, EComponentType } from '../../../shared/enuns';
import { TreeItemComponent, FlowItemComponent, Tab } from '../../../shared/models';
import { EItemType } from '../../../shared/components/flow-editor';
import { useEditorContext } from '../../../shared/contexts';
import { AssetsService } from '../../../shared/services';

export const TreeManagerController: React.FC = () => {

    const { project, setProject } = useEditorContext();

    /** Atualiza o contexto do projeto */
    const onChangeState = useCallback(() => setProject(project), [project, setProject]);

    /** Atualiza o foco do editor de propriedades */
    const changeFocus = useCallback(() => project.currentComponentFocus = ECurrentFocus.tree, [project.currentComponentFocus]);

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
            let items: TreeItemComponent[] = [];
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
                    name: newName,
                    label: newName,
                    type: paramType,
                    description: '',
                    isSelected: true,
                    isEditing: false,
                    isExpanded: false,
                    id: Utils.getUUID(),
                    itemPaiId: inputItemId,
                }));
            }

            onChangeState();
        }

        const addRoute = (inputItemId: string | undefined, routerType: EComponentType.routerConsume | EComponentType.routerExpose) => {
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

                    project.tabs[tabIndex].items.push(new TreeItemComponent({
                        items: (
                            routerType === EComponentType.routerExpose
                                ? [
                                    new FlowItemComponent({ id: '1', name: EItemType.START, icon: IconFlowStart, itemType: EItemType.START, left: 188, top: 128, isSelected: false, connections: [{ id: Utils.getUUID(), targetId: '2', originId: '1', isSelected: false }], properties: [] }),
                                    new FlowItemComponent({ id: '2', name: EItemType.END, icon: IconFlowEnd, itemType: EItemType.END, left: 188, top: 384, isSelected: false, connections: [], properties: [] })
                                ]
                                : []
                        ),
                        name: newName,
                        label: newName,
                        description: '',
                        type: routerType,
                        isSelected: true,
                        isExpanded: true,
                        id: Utils.getUUID(),
                        itemPaiId: inputItemId,
                        isEditing: routerType === EComponentType.routerExpose,
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

                    project.tabs[tabIndex].items.push(new TreeItemComponent({
                        name: newName,
                        label: newName,
                        description: '',
                        isEditing: true,
                        isSelected: true,
                        id: Utils.getUUID(),
                        isExpanded: true,
                        itemPaiId: inputItemId,
                        type: EComponentType.globalAction,
                        items: [
                            new FlowItemComponent({ id: '1', name: EItemType.START, icon: IconFlowStart, itemType: EItemType.START, left: 188, top: 128, isSelected: false, connections: [{ id: Utils.getUUID(), targetId: '2', originId: '1', isSelected: false }], properties: [] }),
                            new FlowItemComponent({ id: '2', name: EItemType.END, icon: IconFlowEnd, itemType: EItemType.END, left: 188, top: 384, isSelected: false, connections: [], properties: [] })
                        ],
                    }));
                }
            }
            onChangeState()
        }

        project.tabs.forEach((tab: Tab) => {
            if (tab.configs.isEditing) {
                if (tab.configs.type === EComponentType.tabRoutes) {

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

                } else if (tab.configs.type === EComponentType.tabActions) {

                    options.push({
                        icon: AssetsService.getIcon(EComponentType.globalAction),
                        action: () => addAction(itemId),
                        disabled: itemId !== undefined,
                        label: 'Add new action'
                    });

                } else if (tab.configs.type === EComponentType.tabDates) {

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

                    return new TreeItemComponent({
                        ...item,
                        isEditing: updatedItem.isEditing || false,
                        isExpanded: updatedItem.nodeExpanded,
                        isSelected: updatedItem.isSelected,
                        itemPaiId: updatedItem.ascendantId,
                        description: item.description,
                        properties: item.properties,
                        label: item.label,
                        name: item.name,
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
            if (tab.configs.isEditing) {
                items = tab.items.map((item): ITreeItem => ({
                    ...item,
                    label: item.label,
                    icon: item.properties.find(prop => prop.propertieType === PropertieTypes.icon)?.value.content || AssetsService.getIcon(item.type),
                    hasWarning: item.items.some(itemFlow => itemFlow.properties.some(prop => (prop.valueHasWarning || prop.nameHasWarning))),
                    description: item.properties.find(prop => prop.propertieType === PropertieTypes.description)?.value || item.description,
                    hasError: item.items.some(itemFlow => itemFlow.properties.some(prop => (prop.valueHasError || prop.nameHasError))),
                    //label: item.properties.find(prop => prop.propertieType === PropertieTypes.label)?.value || item.label,
                    isDisabledDoubleClick: cannotPerformDoubleClick(item.type),
                    isDisabledDrag: item.type === EComponentType.routerExpose,
                    canDropList: getCanDropList(item.type),
                    nodeExpanded: item.isExpanded,
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

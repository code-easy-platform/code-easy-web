import React from 'react';
import { IconTrash, Utils } from 'code-easy-components';

import { TreeInterface } from '../../../shared/components/tree-manager/shared/models/TreeInterface';
import { ContextMenuService } from '../../../shared/components/context-menu/ContextMenuService';
import { IContextItemList } from '../../../shared/components/context-menu/ContextMenu';
import { EItemType, EFlowItemType } from '../../../shared/components/flow-editor';
import { TreeManager } from '../../../shared/components/tree-manager/TreeManager';
import { ItemFlowComplete } from '../../../shared/interfaces/ItemFlowComponent';
import { ItemComponent } from '../../../shared/interfaces/ItemTreeComponent';
import { AssetsService } from '../../../shared/services/AssetsService';
import { PropertieTypes } from '../../../shared/enuns/PropertieTypes';
import { ComponentType } from '../../../shared/enuns/ComponentType';
import { CurrentFocus } from '../../../shared/enuns/CurrentFocus';
import { useCodeEditorContext } from '../../../shared/contexts';
import { Tab } from '../../../shared/interfaces/Tabs';

export const TreeManagerController: React.FC = () => {

    const { project, updateProjectState } = useCodeEditorContext();


    /** Atualiza o contexto do projeto */
    const onChangeState = () => updateProjectState(project);

    /** Atualiza o foco do editor de propriedades */
    const changeFocus = () => project.currentComponentFocus = CurrentFocus.tree;


    /** Quando um item da árvore for clicado, está função será chamada */
    const treeManagerOnClick = (itemTreeId: string, item: TreeInterface) => {

        changeFocus();

        project.tabs.forEach((tab: Tab) => {
            tab.items.forEach(item_loop => {
                if (item_loop.id === itemTreeId) {
                    item_loop.isSelected = true;
                } else {
                    item_loop.isSelected = false;
                }
            });
        });

        onChangeState();

    }

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

        if (indexItemToRemove !== undefined && indexItemToRemove !== undefined) {

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

    /** Quando um item for expandido na árvore está função será chamada */
    const treeManagerOnNodeExpand = (itemTreeId: string, item: TreeInterface) => {

        changeFocus();

        project.tabs.forEach((tab: Tab) => {
            tab.items.forEach(item_loop => {
                if (item_loop.id === itemTreeId) {
                    item_loop.nodeExpanded = !item_loop.nodeExpanded;
                } else {
                    item_loop.isSelected = false;
                }
            });
        });

        onChangeState()
    }

    /** Quando um item for dropado na árvore está função será chamada */
    const treeManagerOnDropItem = (targetId: string, droppedId: string, droppedItem: any) => {

        changeFocus();

        // Evita loop infinito
        if (targetId === droppedId) return;

        // Pega a lista de items corrente na árvore
        let items: ItemComponent[] = [];
        project.tabs.forEach((tab: Tab) => {
            if (tab.configs.isEditing) {
                items = tab.items;
            }
        });

        // Realiza a troca de item pai
        let index: number = items.findIndex(item => item.id === droppedId);
        if (index < 0) return;
        items[index].itemPaiId = targetId;

        // Expande o elemento onde o item foi dropado
        index = items.findIndex(item => item.id === targetId);
        if (index < 0) return;
        items[index].nodeExpanded = true;

        onChangeState()
    }

    /** Quando houver um duplo clique em um item da árvore, está função será chamada */
    const treeManagerOnDoubleClick = (itemTreeId: string, item: TreeInterface) => {

        project.tabs.forEach((tab: Tab) => {
            tab.items.forEach(item => {

                /** Valida para que seja editado somente se for actions ou rotas expostas */
                if (item.type === ComponentType.globalAction || item.type === ComponentType.localAction || item.type === ComponentType.routerExpose) {
                    if (item.id === itemTreeId) {
                        item.isEditing = true;
                    } else {
                        item.isEditing = false;
                    }
                }

            });
        });

        changeFocus();

        onChangeState();
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
                    if (routerType === ComponentType.routerExpose) {
                        // Garante não existirá duas tabs sendo editadas ao mesmo tempo.
                        tab.items.forEach(item => {
                            item.isEditing = false;
                            item.isSelected = false;
                        });
                    }
                });

                if (tabIndex !== undefined) {
                    const newName = Utils.newName('NewRouter', project.tabs[tabIndex].items.map(item => item.label));

                    project.tabs[tabIndex].items.push(new ItemComponent({
                        items: (
                            routerType === ComponentType.routerExpose
                                ? [
                                    new ItemFlowComplete({ id: '1', name: "START", flowItemType: EFlowItemType.acorn, itemType: EItemType.START, left: 188, top: 128, isSelected: false, connections: [{ id: Utils.getUUID(), targetId: '2', originId: '1', isSelected: false }], properties: [] }),
                                    new ItemFlowComplete({ id: '2', name: "END", flowItemType: EFlowItemType.acorn, itemType: EItemType.END, left: 188, top: 384, isSelected: false, connections: [], properties: [] })
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
                            new ItemFlowComplete({ id: '1', name: "START", flowItemType: EFlowItemType.acorn, itemType: EItemType.START, left: 188, top: 128, isSelected: false, connections: [{ id: Utils.getUUID(), targetId: '2', originId: '1', isSelected: false }], properties: [] }),
                            new ItemFlowComplete({ id: '2', name: "END", flowItemType: EFlowItemType.acorn, itemType: EItemType.END, left: 188, top: 384, isSelected: false, connections: [], properties: [] })
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
                        icon: AssetsService.getIcon(ComponentType.routerExpose),
                        action: () => addRoute(itemId, ComponentType.routerExpose),
                        disabled: itemId !== undefined,
                        label: 'Expose a new router'
                    });

                    options.push({
                        icon: AssetsService.getIcon(ComponentType.routerConsume),
                        action: () => addRoute(itemId, ComponentType.routerConsume),
                        disabled: itemId !== undefined,
                        label: 'Consume a new router'
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

    /** Monta a estrutura da árvore e devolve no return */
    const treeManagerItems = (() => {

        let items: ItemComponent[] = [];
        project.tabs.forEach((tab: Tab) => {
            if (tab.configs.isEditing) {
                items = tab.items;
            }
        });

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

        const loadChilds = (tree: TreeInterface): TreeInterface[] => {

            // Busca todos os items que tem como pai o elemento corrente
            items.filter((item) => item.itemPaiId === tree.id).forEach(item => {
                const icon: any = item.properties.find(prop => prop.propertieType === PropertieTypes.icon);
                tree.childs.push({
                    childs: [],
                    id: item.id,
                    iconSize: 15,
                    canDropList: [],
                    type: item.type,
                    label: item.label,
                    isEditing: item.isEditing,
                    isSelected: item.isSelected,
                    description: item.description,
                    nodeExpanded: item.nodeExpanded,
                    isDisabledDoubleClick: cannotPerformDoubleClick(item.type),
                    icon: icon?.value?.content || AssetsService.getIcon(item.type),
                    hasError: item.items.some(itemFlow => itemFlow.properties.some(prop => (prop.valueHasError || prop.nameHasError))),
                });
            });

            // Carrega os filhos de cada item da árvore
            tree.childs.forEach((itemTree: any) => {
                itemTree.childs = loadChilds(itemTree);
            });

            return tree.childs;
        }

        // Mapea todos os items que não tem pai id, significa que eles estão na raiz
        let tree: TreeInterface[] = [];
        items.filter(item => item.itemPaiId === undefined).forEach(item => {
            const icon: any = item.properties.find(prop => prop.propertieType === PropertieTypes.icon);
            tree.push({
                childs: [],
                id: item.id,
                iconSize: 15,
                type: item.type,
                label: item.label,
                isEditing: item.isEditing,
                isSelected: item.isSelected,
                description: item.description,
                nodeExpanded: item.nodeExpanded,
                isDisabledDoubleClick: cannotPerformDoubleClick(item.type),
                icon: icon?.value?.content || AssetsService.getIcon(item.type),
                canDropList: [ComponentType.inputVariable, ComponentType.localVariable, ComponentType.outputVariable],
                hasError: item.items.some(itemFlow => itemFlow.properties.some(prop => (prop.valueHasError || prop.nameHasError))),
            });
        });

        // Carrega os filhos de cada item da árvore
        tree.forEach(itemTree => {
            itemTree.childs = loadChilds(itemTree);
        });

        return [
            {
                childs: tree,
                iconSize: 15,
                id: undefined,
                isSelected: false,
                nodeExpanded: true,
                isDisabledDrag: true,
                showExpandIcon: false,
                isDisabledSelect: true,
                type: ComponentType.grouper,
                icon: AssetsService.getIcon(ComponentType.grouper),
                label: project.tabs.find(item => item.configs.isEditing)?.configs.label || '',
            }
        ];

    })();


    return (
        <TreeManager
            isUseDrag={true}
            isUseDrop={true}
            items={treeManagerItems}
            onClick={treeManagerOnClick}
            onKeyDown={treeManagerOnKeyDowm}
            emptyMessage={"Right click here to add features"}
            onDropItem={treeManagerOnDropItem}
            onExpandNode={treeManagerOnNodeExpand}
            onDoubleClick={treeManagerOnDoubleClick}
            showEmptyMessage={treeManagerItems[0].childs.length < 1}
            onContextMenu={(itemId, e) => {
                e.preventDefault();
                ContextMenuService.showMenu(e.clientX, e.clientY, treeManagerContextMenu(itemId));
            }}
        />
    );
}

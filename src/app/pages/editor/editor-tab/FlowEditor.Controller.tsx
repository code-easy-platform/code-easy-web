import React from 'react';
import { IconTrash, Utils, IconFlowStart, IconFlowAction, IconFlowIf, IconFlowForeach, IconFlowSwitch, IconFlowAssign, IconFlowEnd, IconFlowComment } from 'code-easy-components';

import { FlowEditor, IFlowItem, IBreadCrumbButton, EItemType, EFlowItemType, parseEItemType } from '../../../shared/components/flow-editor';
import { ContextMenuService } from '../../../shared/components/context-menu/ContextMenuService';
import { useCodeEditorContext } from '../../../shared/contexts/CodeEditorContext';
import { IContextItemList } from '../../../shared/components/context-menu/ContextMenu';
import { ItemFlowComplete } from '../../../shared/interfaces/ItemFlowComponent';
import { ItemComponent } from '../../../shared/interfaces/ItemTreeComponent';
import { AssetsService } from '../../../shared/services/AssetsService';
import { PropertieTypes } from '../../../shared/enuns/PropertieTypes';
import { ComponentType } from '../../../shared/enuns/ComponentType';
import { CurrentFocus } from '../../../shared/enuns/CurrentFocus';
import { useIdeConfigs } from '../../../shared/contexts';
import { Tab } from '../../../shared/interfaces/Tabs';

export const FlowEditorController: React.FC = () => {

    const { flowBackgroundType, snapGridWhileDragging } = useIdeConfigs();
    const { project, updateProjectState } = useCodeEditorContext();

    /** Atualiza o contexto do projeto */
    const onChangeState = () => updateProjectState(project);

    /** Atualiza o foco do editor de propriedades */
    const changeFocus = () => project.currentComponentFocus = CurrentFocus.flow;

    /** Toda vez que houver uma alteração nos items de fluxo está função será executada. */
    const codeEditorOutputFlowItems = (updatedItems: IFlowItem[]) => {

        // Atualiza o currentFocus da tab
        changeFocus()

        // Encontra a tab certa e atualiza os items
        project.tabs.forEach((tab: Tab) => {
            tab.items.forEach(item => {
                if (item.isEditing) {
                    let newItems: ItemFlowComplete[] = [];

                    // Atualiza os items do item da arvore.
                    updatedItems.forEach(updatedItem => {
                        if (updatedItem.id !== undefined) {

                            const index = item.items.findIndex(item => updatedItem.id === item.id);
                            if (index >= 0) {
                                newItems.push(new ItemFlowComplete({
                                    itemType: parseEItemType(String(updatedItem.itemType)),
                                    isSelected: updatedItem.isSelected || false,
                                    connections: updatedItem.connections || [],
                                    properties: item.items[index].properties,
                                    flowItemType: updatedItem.flowItemType,
                                    hasWarning: updatedItem.hasWarning,
                                    name: updatedItem.label || '',
                                    height: updatedItem.height,
                                    // name: updatedItem.name,
                                    width: updatedItem.width,
                                    left: updatedItem.left,
                                    icon: updatedItem.icon,
                                    top: updatedItem.top,
                                    id: updatedItem.id,
                                }));
                            } else {
                                newItems.push(new ItemFlowComplete({
                                    itemType: parseEItemType(String(updatedItem.itemType)),
                                    isSelected: updatedItem.isSelected || false,
                                    connections: updatedItem.connections || [],
                                    flowItemType: updatedItem.flowItemType,
                                    hasWarning: updatedItem.hasWarning,
                                    name: updatedItem.label || '',
                                    height: updatedItem.height,
                                    // name: updatedItem.name,
                                    width: updatedItem.width,
                                    left: updatedItem.left,
                                    top: updatedItem.top,
                                    id: updatedItem.id,
                                }));
                            }
                        }
                    });

                    // Atualiza a tab com os items alterados
                    item.items = newItems;
                } else {
                    item.items.forEach(flowItem => flowItem.isSelected = false);
                }
            });
        });

        // Atualiza o context do projeto
        onChangeState();
    }

    /** Ao soltar um novo item permitido no editor está função será executada.
     * 
     * Por aqui pode ser feito alterações no item dropado no fluxo.
     */
    const codeEditorOnDropItem = (oldItemId: string, newItemId: string, newItem: IFlowItem) => {

        if (newItem.itemType?.toString() === ComponentType.globalAction.toString() || newItem.itemType?.toString() === ComponentType.localAction.toString()) {
            newItem.itemType = EItemType.ACTION;

            //TODO: Não está chegando o old id corretamente

            // Pega as antigas propriedades do item dropado para adicionar na atual
            /* this.project.tabs.forEach((tab: Tab) => {
                tab.items.forEach(item => {
                    if (item.isEditing) {


                        const oldItem = item.items.find(flowItem => flowItem.id === oldItemId);
                        if (oldItem) {

                            newItem.icon = oldItem.icon;

                        }
                    }
                });
            }); */

        } else if (
            newItem.itemType?.toString() === ComponentType.outputVariable.toString() ||
            newItem.itemType?.toString() === ComponentType.inputVariable.toString() ||
            newItem.itemType?.toString() === ComponentType.localVariable.toString()
        ) {
            newItem.itemType = EItemType.ASSIGN;
        }

        changeFocus();

        return newItem;
    }

    /** Alimenta a toolbox, de onde pode ser arrastados items para o fluxo. */
    const codeEditorGetToolBoxItems = () => [
        { id: '1', icon: IconFlowStart, name: "START", itemType: EItemType.START, top: 0, left: 0, flowItemType: EFlowItemType.acorn },
        { id: '2', icon: IconFlowAction, name: "ACTION", itemType: EItemType.ACTION, top: 0, left: 0, flowItemType: EFlowItemType.acorn },
        { id: '3', icon: IconFlowIf, name: "IF", itemType: EItemType.IF, top: 0, left: 0, flowItemType: EFlowItemType.acorn },
        { id: '4', icon: IconFlowForeach, name: "FOREACH", itemType: EItemType.FOREACH, top: 0, left: 0, flowItemType: EFlowItemType.acorn },
        { id: '6', icon: IconFlowSwitch, name: "SWITCH", itemType: EItemType.SWITCH, top: 0, left: 0, flowItemType: EFlowItemType.acorn },
        { id: '7', icon: IconFlowAssign, name: "ASSIGN", itemType: EItemType.ASSIGN, top: 0, left: 0, flowItemType: EFlowItemType.acorn },
        { id: '8', icon: IconFlowEnd, name: "END", itemType: EItemType.END, top: 0, left: 0, flowItemType: EFlowItemType.acorn },
        { id: '9', icon: IconFlowComment, name: "COMMENT", itemType: EItemType.COMMENT, top: 0, left: 0, flowItemType: EFlowItemType.acorn },
    ];

    /** Quando clicado com o botão esquerdo do mouse no interior do editor esta função é acionada. */
    const codeEditorContextMenu = (data: any, e: any): IContextItemList[] => {
        const left = e.nativeEvent.offsetX;
        const top = e.nativeEvent.offsetY;

        changeFocus();

        let options: IContextItemList[] = [];

        if (data) {
            const itemToDelete = data;

            options.push({
                icon: IconTrash,
                label: 'Delete ' + itemToDelete.itemType,
                action: () => {
                    let indexTreeToDelete: number | undefined;
                    let indexTabToDelete: number | undefined;
                    let indexToDelete: number | undefined;

                    project.tabs.forEach((tab: Tab, indexTab) => {
                        tab.items.forEach((item, indexTree) => {
                            if (item.isEditing) {
                                indexToDelete = item.items.findIndex(flow_item => flow_item.id === itemToDelete.itemId);
                                indexTreeToDelete = indexTree;
                                indexTabToDelete = indexTab;
                            }
                        })
                    });

                    if (indexTabToDelete !== undefined && indexToDelete !== undefined && indexToDelete !== -1 && indexTreeToDelete !== undefined) {
                        project.tabs[indexTabToDelete].items[indexTreeToDelete].items.splice(indexToDelete, 1);

                        // Atualiza o context do projeto
                        onChangeState();
                    }
                }
            });
            options.push({
                label: '-',
                action: () => { }
            });
        }

        codeEditorGetToolBoxItems().forEach(item => {
            options.push({
                label: 'Add ' + item.name,
                icon: AssetsService.getIcon(item.itemType),
                action: () => {

                    // Encontra a tab certa e adiciona um item de fluxo aos items
                    project.tabs.forEach((tab: Tab) => {
                        tab.items.forEach(item_tree => {
                            if (item_tree.isEditing) {

                                // Deseleciona todos os items anteriores
                                item_tree.items.forEach(item_flow => item_flow.isSelected = false);

                                // Adiciona a tab com os items alterados
                                item_tree.items.push(new ItemFlowComplete({
                                    flowItemType: EFlowItemType.acorn,
                                    itemType: item.itemType,
                                    id: Utils.getUUID(),
                                    isSelected: true,
                                    name: item.name,
                                    connections: [],
                                    height: 50,
                                    left: left,
                                    width: 50,
                                    top: top,
                                }));

                            }
                        });
                    });

                    // Atualiza o context do projeto
                    onChangeState();
                }
            });

        });

        return options;
    }

    /** Monta o breadcamps que será exibido no top do editor de fluxos. */
    const codeEditorGetBreadcamps = (): IBreadCrumbButton[] => {

        let breadcamps: IBreadCrumbButton[] = [];

        project.tabs.forEach((tab: Tab) => {
            tab.items.forEach(item => {
                if (item.isEditing) {

                    breadcamps.push({
                        label: tab.configs.label,
                        onClick: () => {
                            project.tabs.forEach((tab: Tab) => tab.configs.isEditing = false);
                            project.currentComponentFocus = CurrentFocus.tree;
                            tab.configs.isEditing = true;
                            onChangeState();
                        }
                    });

                    breadcamps.push({
                        onClick: (() => {
                            project.tabs.forEach((tab: Tab) => tab.configs.isEditing = false);

                            project.tabs.forEach(tab => {
                                tab.items.forEach(item => {
                                    item.isSelected = false;
                                });
                            });

                            project.currentComponentFocus = CurrentFocus.tree;
                            tab.configs.isEditing = true;
                            item.isSelected = true;
                            onChangeState();

                        }),
                        label: item.label
                    });

                }
            });
        });

        return breadcamps;
    }

    /** Usando o state pode pegar os items que devem ser editados pelo fluxo. */
    const flowEditorItems = (() => {

        let itemEditing: ItemComponent | undefined;

        project.tabs.forEach((tab: Tab) => {
            tab.items.forEach(item => {
                if (item.isEditing) {
                    itemEditing = item;
                }
            });
        });

        if (itemEditing) {

            // Reordena pela altura
            itemEditing.items.sort((a, b) => (a.top - b.top));

            // Se for o simples para o editor de fluxos, faz um map dos items.
            let flowItems: IFlowItem[] = [];
            itemEditing.items.forEach(item => {
                /** Prop usada para guarda o id da action referênciada */
                const actionProp = item.properties.find(prop => prop.propertieType === PropertieTypes.action);

                /** Bloco de código qu encontra o ícone que será usado no fluxo */
                let icon: any;
                project.tabs.forEach((tab: Tab) => {
                    tab.items.forEach(item => {
                        if (item.id === actionProp?.value) {
                            icon = item.properties.find(prop => prop.propertieType === PropertieTypes.icon);
                        }
                    });
                });

                flowItems.push({
                    id: item.id,
                    top: item.top,
                    left: item.left,
                    label: item.name,
                    width: item.width,
                    height: item.height,
                    itemType: item.itemType,
                    icon: icon?.value?.content,
                    isSelected: item.isSelected,
                    hasWarning: item.hasWarning,
                    connections: item.connections,
                    flowItemType: EFlowItemType.acorn,
                    hasError: item.properties.some(prop => (prop.valueHasError || prop.nameHasError)),
                });

            });

            return flowItems;
        } else {
            return [];
        }

    })();

    return (<>
        <FlowEditor
            id={"CODE_EDITOR"}
            items={flowEditorItems}
            onDropItem={codeEditorOnDropItem}
            breadcrumbs={codeEditorGetBreadcamps()}
            toolItems={codeEditorGetToolBoxItems()}
            onChangeItems={codeEditorOutputFlowItems}
            childrenWhenItemsEmpty={
                (codeEditorGetBreadcamps().length === 0)
                    ? <>
                        <div style={{ height: '-webkit-fill-available', width: '-webkit-fill-available', justifyContent: 'center', alignItems: 'center', opacity: 0.5 }}>
                            <h1>Drag and drop something here to start</h1>
                        </div>
                    </>
                    : undefined
            }
            configs={{
                backgroundType: flowBackgroundType,
                snapGridWhileDragging: snapGridWhileDragging,
                disableSelection: flowEditorItems.length === 0,
                typesAllowedToDrop: [ComponentType.globalAction, ComponentType.localAction, ComponentType.localVariable, ComponentType.inputVariable, ComponentType.outputVariable],
            }}
            onContextMenu={(e) => {
                if (e) {
                    e.preventDefault();
                    ContextMenuService.showMenu(e.clientX, e.clientY, codeEditorContextMenu(undefined, e));
                }
            }}
        />
    </>);
}

import React, { useContext } from 'react';
import { IconTrash, Utils } from 'code-easy-components';

import { ContextMenuService } from '../../../shared/components/context-menu/ContextMenuService';
import { IBreadCampButton } from '../../../shared/components/code-editor/shared/Interfaces';
import { ItemType } from '../../../shared/components/code-editor/shared/enums/ItemType';
import { CodeEditorContext } from '../../../shared/services/contexts/CodeEditorContext';
import { IContextItemList } from '../../../shared/components/context-menu/ContextMenu';
import { IdeConfigStorage } from '../../../shared/services/storage/IdeConfigStorage';
import { FlowItem } from '../../../shared/components/code-editor/models/ItemFluxo';
import { ItemFlowComplete } from '../../../shared/interfaces/ItemFlowComponent';
import { FlowEditor } from '../../../shared/components/code-editor/CodeEditor';
import { ItemComponent } from '../../../shared/interfaces/ItemTreeComponent';
import { AssetsService } from '../../../shared/services/AssetsService';
import { PropertieTypes } from '../../../shared/enuns/PropertieTypes';
import { ComponentType } from '../../../shared/enuns/ComponentType';
import { CurrentFocus } from '../../../shared/enuns/CurrentFocus';
import { Tab } from '../../../shared/interfaces/Tabs';

export const FlowEditorController: React.FC = () => {

    const ideConfigs = new IdeConfigStorage();
    const editorContext = useContext(CodeEditorContext);


    /** Atualiza o contexto do projeto */
    const onChangeState = () => editorContext.updateProjectState(editorContext.project);

    /** Atualiza o foco do editor de propriedades */
    const changeFocus = () => editorContext.project.currentComponentFocus = CurrentFocus.flow;


    /** Toda vez que houver uma alteração nos items de fluxo está função será executada. */
    const codeEditorOutputFlowItems = (updatedItems: FlowItem[]) => {

        // Atualiza o currentFocus da tab
        changeFocus()

        // Encontra a tab certa e atualiza os items
        editorContext.project.tabs.forEach((tab: Tab) => {
            tab.items.forEach(item => {
                if (item.isEditing) {
                    let newItems: ItemFlowComplete[] = [];

                    // Atualiza os items do item da arvore.
                    updatedItems.forEach(updatedItem => {
                        if (updatedItem.id !== undefined) {

                            const index = item.items.findIndex(item => updatedItem.id === item.id);
                            if (index >= 0) {
                                newItems.push(new ItemFlowComplete({
                                    properties: item.items[index].properties,
                                    connections: updatedItem.connections,
                                    hasWarning: updatedItem.hasWarning,
                                    isSelected: updatedItem.isSelected,
                                    itemType: updatedItem.itemType,
                                    height: updatedItem.height,
                                    width: updatedItem.width,
                                    left: updatedItem.left,
                                    name: updatedItem.name,
                                    icon: updatedItem.icon,
                                    top: updatedItem.top,
                                    id: updatedItem.id,
                                }));
                            } else {
                                newItems.push(new ItemFlowComplete({
                                    connections: updatedItem.connections,
                                    hasWarning: updatedItem.hasWarning,
                                    isSelected: updatedItem.isSelected,
                                    itemType: updatedItem.itemType,
                                    height: updatedItem.height,
                                    width: updatedItem.width,
                                    left: updatedItem.left,
                                    name: updatedItem.name,
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
    const codeEditorOnDropItem = (oldItemId: string, newItemId: string, newItem: FlowItem) => {

        if (newItem.itemType.toString() === ComponentType.globalAction.toString() || newItem.itemType.toString() === ComponentType.localAction.toString()) {
            newItem.itemType = ItemType.ACTION;

            //TODO: Não está chegando o old id corretamente

            // Pega as antigas propriedades do item dropado para adicionar na atual
            /* this.editorContext.project.tabs.forEach((tab: Tab) => {
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
            newItem.itemType.toString() === ComponentType.outputVariable.toString() ||
            newItem.itemType.toString() === ComponentType.inputVariable.toString() ||
            newItem.itemType.toString() === ComponentType.localVariable.toString()
        ) {
            newItem.itemType = ItemType.ASSIGN;
        }

        changeFocus();

        return newItem;
    }

    /** Alimenta a toolbox, de onde pode ser arrastados items para o fluxo. */
    const codeEditorGetToolBoxItems = () => [
        new FlowItem({ id: '1', name: "START", itemType: ItemType.START }),
        new FlowItem({ id: '2', name: "ACTION", itemType: ItemType.ACTION }),
        new FlowItem({ id: '3', name: "IF", itemType: ItemType.IF }),
        new FlowItem({ id: '4', name: "FOREACH", itemType: ItemType.FOREACH }),
        new FlowItem({ id: '6', name: "SWITCH", itemType: ItemType.SWITCH }),
        new FlowItem({ id: '7', name: "ASSIGN", itemType: ItemType.ASSIGN }),
        new FlowItem({ id: '8', name: "END", itemType: ItemType.END }),
        new FlowItem({ id: '9', name: "COMMENT", itemType: ItemType.COMMENT }),
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

                    editorContext.project.tabs.forEach((tab: Tab, indexTab) => {
                        tab.items.forEach((item, indexTree) => {
                            if (item.isEditing) {
                                indexToDelete = item.items.findIndex(flow_item => flow_item.id === itemToDelete.itemId);
                                indexTreeToDelete = indexTree;
                                indexTabToDelete = indexTab;
                            }
                        })
                    });

                    if (indexTabToDelete !== undefined && indexToDelete !== undefined && indexToDelete !== -1 && indexTreeToDelete !== undefined) {
                        editorContext.project.tabs[indexTabToDelete].items[indexTreeToDelete].items.splice(indexToDelete, 1);

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
                    editorContext.project.tabs.forEach((tab: Tab) => {
                        tab.items.forEach(item_tree => {
                            if (item_tree.isEditing) {

                                // Deseleciona todos os items anteriores
                                item_tree.items.forEach(item_flow => item_flow.isSelected = false);

                                // Adiciona a tab com os items alterados
                                item_tree.items.push(new ItemFlowComplete({
                                    hasWarning: item.hasWarning,
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
    const codeEditorGetBreadcamps = (): IBreadCampButton[] => {

        let breadcamps: IBreadCampButton[] = [];

        editorContext.project.tabs.forEach((tab: Tab) => {
            tab.items.forEach(item => {
                if (item.isEditing) {

                    breadcamps.push({
                        label: tab.configs.label,
                        onClick: () => {
                            editorContext.project.tabs.forEach((tab: Tab) => tab.configs.isEditing = false);
                            editorContext.project.currentComponentFocus = CurrentFocus.tree;
                            tab.configs.isEditing = true;
                            onChangeState();
                        }
                    });

                    breadcamps.push({
                        onClick: (() => {
                            editorContext.project.tabs.forEach((tab: Tab) => tab.configs.isEditing = false);

                            editorContext.project.tabs.forEach(tab => {
                                tab.items.forEach(item => {
                                    item.isSelected = false;
                                });
                            });

                            editorContext.project.currentComponentFocus = CurrentFocus.tree;
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

        editorContext.project.tabs.forEach((tab: Tab) => {
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
            let flowItems: FlowItem[] = [];
            itemEditing.items.forEach(item => {
                /** Prop usada para guarda o id da action referênciada */
                const actionProp = item.properties.find(prop => prop.propertieType === PropertieTypes.action);

                /** Bloco de código qu encontra o ícone que será usado no fluxo */
                let icon: any;
                editorContext.project.tabs.forEach((tab: Tab) => {
                    tab.items.forEach(item => {
                        if (item.id === actionProp?.value) {
                            icon = item.properties.find(prop => prop.propertieType === PropertieTypes.icon);
                        }
                    });
                });

                flowItems.push(new FlowItem({
                    id: item.id,
                    top: item.top,
                    left: item.left,
                    name: item.name,
                    width: item.width,
                    height: item.height,
                    itemType: item.itemType,
                    icon: icon?.value?.content,
                    isSelected: item.isSelected,
                    hasWarning: item.hasWarning,
                    connections: item.connections,
                    hasError: item.properties.some(prop => (prop.valueHasError || prop.nameHasError)),
                }));

            });

            return flowItems;
        } else {
            return [];
        }

    })();

    return (
        <FlowEditor
            id={"CODE_EDITOR"}
            showToolbar={true}
            items={flowEditorItems}
            onDropItem={codeEditorOnDropItem}
            breadcrumbs={codeEditorGetBreadcamps()}
            toolItems={codeEditorGetToolBoxItems()}
            onChangeItems={codeEditorOutputFlowItems}
            enabledSelection={flowEditorItems.length !== 0}
            backgroundType={ideConfigs.getConfigs().flowBackgroundType}
            snapGridWhileDragging={ideConfigs.getConfigs().snapGridWhileDragging}
            emptyMessage={(codeEditorGetBreadcamps().length !== 0) ? "Drag and drop an item here to get started" : undefined}
            allowedsInDrop={[ComponentType.globalAction, ComponentType.localAction, ComponentType.localVariable, ComponentType.inputVariable, ComponentType.outputVariable]}
            onContextMenu={(data, e) => {
                if (e) {
                    e.preventDefault();
                    ContextMenuService.showMenu(e.clientX, e.clientY, codeEditorContextMenu(data, e));
                }
            }}
        />
    );
}

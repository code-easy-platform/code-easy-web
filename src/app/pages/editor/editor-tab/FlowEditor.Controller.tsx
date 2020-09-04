import React, { memo, useCallback } from 'react';
import { IconTrash, Utils, IconFlowStart, IconFlowAction, IconFlowIf, IconFlowForeach, IconFlowSwitch, IconFlowAssign, IconFlowEnd, IconFlowComment } from 'code-easy-components';

import { FlowEditor, IFlowItem, IBreadCrumbButton, EItemType, EFlowItemType, parseEItemType, EItemTypeList } from '../../../shared/components/flow-editor';
import { ContextMenuService } from '../../../shared/components/context-menu/ContextMenuService';
import { IContextItemList } from '../../../shared/components/context-menu/ContextMenu';
import { ItemFlowComplete } from '../../../shared/interfaces/ItemFlowComponent';
import { ItemComponent } from '../../../shared/interfaces/ItemTreeComponent';
import { useIdeConfigs, useEditorContext } from '../../../shared/contexts';
import { AssetsService } from '../../../shared/services/AssetsService';
// import { PropertieTypes } from '../../../shared/enuns/PropertieTypes';
import { ComponentType } from '../../../shared/enuns/ComponentType';
import { CurrentFocus } from '../../../shared/enuns/CurrentFocus';
import { Tab } from '../../../shared/interfaces/Tabs';
import { BackgroundEmpty, BackgroundEmptyLeft } from '../../../assets';
import { PropertieTypes } from '../../../shared/enuns/PropertieTypes';

export const FlowEditorController: React.FC = memo(() => {
    const { flowBackgroundType, snapGridWhileDragging } = useIdeConfigs();
    const { project, setProject } = useEditorContext();

    /** Atualiza o foco do editor de propriedades */
    const changeFocus = useCallback(() => project.currentComponentFocus = CurrentFocus.flow, [project]);

    const handleOnChangeItems = useCallback((updatedItems: IFlowItem[]) => {

        /** Toda vez que houver uma alteração nos items de fluxo está função será executada. */

        // Atualiza o currentFocus da tab
        changeFocus();

        // Encontra a tab certa e atualiza os items
        project.tabs.forEach((tab: Tab) => {
            tab.items.forEach(item => {
                if (!item.isEditing) {
                    item.items.forEach(flowItem => flowItem.isSelected = false);
                } else {
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
                                    description: updatedItem.description,
                                    hasWarning: updatedItem.hasWarning,
                                    isDisabled: updatedItem.isDisabled,
                                    hasError: updatedItem.hasError,
                                    name: updatedItem.label || '',
                                    height: updatedItem.height,
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
                                    description: updatedItem.description,
                                    hasWarning: updatedItem.hasWarning,
                                    isDisabled: updatedItem.isDisabled,
                                    hasError: updatedItem.hasError,
                                    name: updatedItem.label || '',
                                    height: updatedItem.height,
                                    width: updatedItem.width,
                                    icon: updatedItem.icon,
                                    left: updatedItem.left,
                                    top: updatedItem.top,
                                    id: updatedItem.id,
                                }));
                            }
                        }
                    });

                    // Atualiza a tab com os items alterados
                    item.items = newItems;
                }
            });
        });

        // Atualiza o context do projeto
        setProject(project);
    }, [changeFocus, setProject, project]);

    /**
     * Ao soltar um novo item permitido no editor está função será executada.
     * 
     * Por aqui pode ser feito alterações no item dropado no fluxo.
     */
    const handleOnDropItem = useCallback((oldItemId: string, newItemId: string, newItem: IFlowItem) => {

        // Action
        if (newItem.itemType?.toString() === ComponentType.globalAction.toString() || newItem.itemType?.toString() === ComponentType.localAction.toString()) {
            newItem.isEnabledNewConnetion = true;
            newItem.itemType = EItemType.ACTION;
            newItem.icon = IconFlowAction;

            // Some var type
        } else if (
            newItem.itemType?.toString() === ComponentType.outputVariable.toString() ||
            newItem.itemType?.toString() === ComponentType.inputVariable.toString() ||
            newItem.itemType?.toString() === ComponentType.localVariable.toString()
        ) {
            newItem.isEnabledNewConnetion = true;
            newItem.itemType = EItemType.ASSIGN;
            newItem.icon = IconFlowAssign;

        } else {
            newItem.isEnabledNewConnetion = true;
        }

        newItem.flowItemType = EFlowItemType.acorn;
        newItem.label = newItem.itemType;

        changeFocus();

        return newItem;
    }, [changeFocus]);

    /** Alimenta a toolbox, de onde pode ser arrastados items para o fluxo. */
    const toolBoxItems = useCallback(() => [
        { id: '1', icon: IconFlowStart, name: "START", itemType: EItemType.START, top: 0, left: 0, flowItemType: EFlowItemType.acorn },
        { id: '2', icon: IconFlowAction, name: "ACTION", itemType: EItemType.ACTION, top: 0, left: 0, flowItemType: EFlowItemType.acorn },
        { id: '3', icon: IconFlowIf, name: "IF", itemType: EItemType.IF, top: 0, left: 0, flowItemType: EFlowItemType.acorn },
        { id: '4', icon: IconFlowForeach, name: "FOREACH", itemType: EItemType.FOREACH, top: 0, left: 0, flowItemType: EFlowItemType.acorn },
        { id: '6', icon: IconFlowSwitch, name: "SWITCH", itemType: EItemType.SWITCH, top: 0, left: 0, flowItemType: EFlowItemType.acorn },
        { id: '7', icon: IconFlowAssign, name: "ASSIGN", itemType: EItemType.ASSIGN, top: 0, left: 0, flowItemType: EFlowItemType.acorn },
        { id: '8', icon: IconFlowEnd, name: "END", itemType: EItemType.END, top: 0, left: 0, flowItemType: EFlowItemType.acorn },
        { id: '9', icon: IconFlowComment, name: "COMMENT", itemType: EItemType.COMMENT, top: 0, left: 0, flowItemType: EFlowItemType.comment },
    ], []);

    /** Quando clicado com o botão esquerdo do mouse no interior do editor esta função é acionada. */
    const contextMenu = useCallback((data: any, e: any): IContextItemList[] => {
        const left = e.nativeEvent.offsetX;
        const top = e.nativeEvent.offsetY;

        let options: IContextItemList[] = [];

        if (data) {
            const itemToDelete = data;

            const handleContextDelete = () => {
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
                    setProject(project);
                }
            }

            options.push({
                icon: IconTrash,
                action: handleContextDelete,
                label: 'Delete ' + itemToDelete.itemType,
            });

            options.push({
                label: '-',
                action: () => { }
            });
        }

        toolBoxItems().forEach(item => {
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
                                    icon: AssetsService.getIcon(item.itemType),
                                    flowItemType: item.itemType === EItemType.COMMENT ? EFlowItemType.comment : EFlowItemType.acorn,
                                    itemType: item.itemType,
                                    id: Utils.getUUID(),
                                    isDisabled: false,
                                    hasWarning: false,
                                    isSelected: true,
                                    hasError: false,
                                    name: item.name,
                                    connections: [],
                                    properties: [],
                                    height: 40,
                                    width: 40,
                                    left,
                                    top,
                                }));

                            }
                        });
                    });

                    // Atualiza o context do projeto
                    setProject(project);
                }
            });

        });

        return options;
    }, [project, toolBoxItems, setProject]);

    /** Monta o breadcamps que será exibido no top do editor de fluxos. */
    const getBreadcamps = useCallback((): IBreadCrumbButton[] => {

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
                            setProject(project);
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
                            setProject(project);

                        }),
                        label: item.label
                    });

                }
            });
        });

        return breadcamps;
    }, [project, setProject]);

    /** Usando o state pode pegar os items que devem ser editados pelo fluxo. */
    const flowEditorItems = useCallback((): { hasSomethingEditing: boolean, hasSomethingToEdit: boolean, flowItems: IFlowItem[] } => {

        // Action, Router are you editing
        let itemEditing: ItemComponent | undefined;

        /** Return if the project has some action, table or route to allow edit */
        const hasSomethingToEdit = project.tabs.some(tab => tab.items.length > 0);

        /** Return if the project has some action, table or route editing */
        const hasSomethingEditing = project.tabs.some(tab => tab.items.some(item => item.isEditing));

        project.tabs.forEach((tab: Tab) => {
            tab.items.forEach(item => {
                if (item.isEditing) {
                    itemEditing = item;
                }
            });
        });

        // Se não achar um item que está sendo editado, retorna vazio
        if (!itemEditing) return {
            flowItems: [],
            hasSomethingToEdit,
            hasSomethingEditing
        };

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
                tab.items.forEach(itemToIconFind => {
                    if (itemToIconFind.id === actionProp?.value) {
                        icon = itemToIconFind.properties.find(prop => prop.propertieType === PropertieTypes.icon);
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
                isSelected: item.isSelected,
                isDisabled: item.isDisabled,
                connections: item.connections,
                flowItemType: item.flowItemType,
                icon: icon?.value?.content || item.icon,
                isEnabledNewConnetion: item.isEnabledNewConnetion,
                description: item.itemType !== EItemType.COMMENT ? item.description : item.name,
                hasError: item.properties.some(prop => (prop.valueHasError || prop.nameHasError)),
                hasWarning: item.properties.some(prop => (prop.valueHasWarning || prop.nameHasWarning)),
            });
        });

        return {
            flowItems,
            hasSomethingToEdit,
            hasSomethingEditing,
        };
    }, [project]);

    const flowEditorItemsResult = flowEditorItems();

    return (
        <FlowEditor
            id={"CODE_EDITOR"}
            toolItems={toolBoxItems()}
            breadcrumbs={getBreadcamps()}
            onDropItem={handleOnDropItem}
            items={flowEditorItemsResult.flowItems}
            onChangeItems={handleOnChangeItems}
            childrenWhenItemsEmpty={
                (flowEditorItemsResult.flowItems.length === 0)
                    ? (
                        flowEditorItemsResult.hasSomethingEditing
                            ? (
                                <div style={{ height: '-webkit-fill-available', width: '-webkit-fill-available', justifyContent: 'center', alignItems: 'center', opacity: 0.5 }}>
                                    <BackgroundEmptyLeft className="opacity-9" width={600} style={{ position: 'absolute', top: 0, left: 0 }} />
                                    <BackgroundEmpty className="opacity-9" width={600} style={{ position: 'absolute', top: 0, right: 0 }} />
                                    <h1 style={{ textAlign: 'center' }}>Drag and drop something here to start</h1>
                                </div>)
                            : (
                                <div style={{ height: '-webkit-fill-available', width: '-webkit-fill-available', justifyContent: 'center', alignItems: 'center', opacity: 0.5 }}>
                                    <h1 style={{ textAlign: 'center' }}>In the tree on the left,<br /> create a new feature to start</h1>
                                    <BackgroundEmpty className="opacity-9" width={600} style={{ position: 'absolute', top: 0, right: 0 }} />
                                </div>
                            )
                    )
                    : null
            }
            configs={{
                selectionBackgroundColor: '#ffffff11',
                selectionBorderColor: 'var(--color-botton-bar)',

                commentTextColor: '#ffffff',
                flowItemErrorColor: 'var(--main-error-color)',
                flowItemSelectedColor: 'var(--color-botton-bar)',
                flowItemWarningColor: 'var(--main-warning-color)',

                lineWidth: 1,
                backgroundType: flowBackgroundType,
                snapGridWhileDragging: snapGridWhileDragging,
                typesAllowedToDrop: [...EItemTypeList, ComponentType.globalAction, ComponentType.localAction, ComponentType.localVariable, ComponentType.inputVariable, ComponentType.outputVariable],
            }}
            onContextMenu={(e) => {
                if (e) {
                    e.preventDefault();
                    ContextMenuService.showMenu(e.clientX, e.clientY, contextMenu(undefined, e));
                }
            }}
        />
    );
});

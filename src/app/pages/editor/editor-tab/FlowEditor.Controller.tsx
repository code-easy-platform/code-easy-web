import React, { memo, useCallback } from 'react';
import { IconTrash, Utils, IconFlowStart, IconFlowAction, IconFlowIf, IconFlowForeach, IconFlowSwitch, IconFlowAssign, IconFlowEnd, IconFlowComment } from 'code-easy-components';
import { set, useObserverValue, observe, useSetObserver } from 'react-observing';

import { FlowEditor, IFlowItem, IBreadCrumbButton, EItemType, EFlowItemType, parseEItemType, EItemTypeList } from '../../../shared/components/external';
import { BackgroundEmpty, BackgroundEmptyLeft, BackgroundEmptyLeftToTop } from '../../../assets';
import { PropertieTypes, EComponentType, ECurrentFocus } from '../../../shared/enuns';
import { TreeItemComponent, FlowItemComponent } from '../../../shared/models';
import { useIdeConfigs, useEditorContext } from '../../../shared/contexts';
import { IContextItemList } from '../../../shared/interfaces';
import { openContextMenu } from '../../../shared/services';
import { CurrentFocusStore } from '../../../shared/stores';

export const FlowEditorController: React.FC = memo(() => {
    const { flowBackgroundType, snapGridWhileDragging } = useIdeConfigs();
    const setCurrentFocus = useSetObserver(CurrentFocusStore);
    const { project } = useEditorContext();

    const tabs = useObserverValue(project.tabs);

    const handleOnChangeItems = useCallback((updatedItems: IFlowItem[]) => {

        /** Toda vez que houver uma alteração nos items de fluxo está função será executada. */

        // Encontra a tab certa e atualiza os items
        tabs.forEach(tab => {
            tab.items.value.forEach(item => {
                if (!item.isEditing.value) {
                    item.items.value.forEach(flowItem => set(flowItem.isSelected, false));
                } else {
                    let newItems: FlowItemComponent[] = [];

                    // Atualiza os items do item da arvore.
                    updatedItems.forEach(updatedItem => {
                        if (updatedItem.id.value !== undefined) {

                            const index = item.items.value.findIndex(item => updatedItem.id === item.id);
                            if (index >= 0) {
                                newItems.push(new FlowItemComponent({
                                    properties: item.items.value[index].properties.value,
                                    type: parseEItemType(String(updatedItem.itemType)),
                                    connections: updatedItem.connections.value || [],
                                    id: updatedItem.id.value,
                                }));
                            } else {
                                newItems.push(new FlowItemComponent({
                                    type: parseEItemType(String(updatedItem.itemType)),
                                    connections: updatedItem.connections.value || [],
                                    id: updatedItem.id.value,
                                }));
                            }
                        }
                    });

                    // Atualiza a tab com os items alterados
                    set(item.items, newItems);
                }
            });
        });
    }, [tabs]);

    /**
     * Ao soltar um novo item permitido no editor está função será executada.
     * 
     * Por aqui pode ser feito alterações no item dropado no fluxo.
     */
    const handleOnDropItem = useCallback((oldItemId: string, newItemId: string, newItem: IFlowItem) => {

        // Action
        if (newItem.itemType?.toString() === EComponentType.globalAction.toString() || newItem.itemType?.toString() === EComponentType.localAction.toString()) {
            set(newItem.isEnabledNewConnetion, true);
            set(newItem.itemType, EItemType.ACTION);
            set(newItem.icon, IconFlowAction);

            // Encontra a tab certa e atualiza os items
            tabs.forEach(tab => {
                tab.items.value.forEach(item => {
                    if (!item.isEditing.value) {
                        item.items.value.forEach(flowItem => set(flowItem.isSelected, false));
                    } else {
                        item.items.value.push(new FlowItemComponent({
                            type: parseEItemType(String(newItem.itemType)),
                            connections: newItem.connections.value || [],
                            id: newItem.id.value,
                        }));
                    }
                })
            })

            // Some var type
        } else if (
            newItem.itemType?.toString() === EComponentType.outputVariable.toString() ||
            newItem.itemType?.toString() === EComponentType.inputVariable.toString() ||
            newItem.itemType?.toString() === EComponentType.localVariable.toString()
        ) {
            set(newItem.isEnabledNewConnetion, true);
            set(newItem.itemType, EItemType.ASSIGN);
            set(newItem.icon, IconFlowAssign);
        } else {
            set(newItem.isEnabledNewConnetion, true);
        }

        set(newItem.flowItemType, EFlowItemType.acorn);
        set(newItem.label, newItem.itemType?.value);

        return newItem;
    }, [tabs]);

    /** Alimenta a toolbox, de onde pode ser arrastados items para o fluxo. */
    const toolBoxItems = useCallback((): IFlowItem[] => [
        { id: observe('1'), top: observe(0), left: observe(0), flowItemType: observe(EFlowItemType.acorn), label: observe(EItemType.START), icon: observe(IconFlowStart), itemType: observe(EItemType.START), connections: observe([]), description: observe(''), hasError: observe(undefined), hasWarning: observe(undefined), height: observe(undefined), isDisabled: observe(false), isEnabledNewConnetion: observe(undefined), isSelected: observe(false), width: observe(undefined) },
        { id: observe('2'), top: observe(0), left: observe(0), flowItemType: observe(EFlowItemType.acorn), label: observe(EItemType.ACTION), icon: observe(IconFlowAction), itemType: observe(EItemType.ACTION), connections: observe([]), description: observe(''), hasError: observe(undefined), hasWarning: observe(undefined), height: observe(undefined), isDisabled: observe(false), isEnabledNewConnetion: observe(undefined), isSelected: observe(false), width: observe(undefined) },
        { id: observe('3'), top: observe(0), left: observe(0), flowItemType: observe(EFlowItemType.acorn), label: observe(EItemType.IF), icon: observe(IconFlowIf), itemType: observe(EItemType.IF), connections: observe([]), description: observe(''), hasError: observe(undefined), hasWarning: observe(undefined), height: observe(undefined), isDisabled: observe(false), isEnabledNewConnetion: observe(undefined), isSelected: observe(false), width: observe(undefined) },
        { id: observe('4'), top: observe(0), left: observe(0), flowItemType: observe(EFlowItemType.acorn), label: observe(EItemType.FOREACH), icon: observe(IconFlowForeach), itemType: observe(EItemType.FOREACH), connections: observe([]), description: observe(''), hasError: observe(undefined), hasWarning: observe(undefined), height: observe(undefined), isDisabled: observe(false), isEnabledNewConnetion: observe(undefined), isSelected: observe(false), width: observe(undefined) },
        { id: observe('6'), top: observe(0), left: observe(0), flowItemType: observe(EFlowItemType.acorn), label: observe(EItemType.SWITCH), icon: observe(IconFlowSwitch), itemType: observe(EItemType.SWITCH), connections: observe([]), description: observe(''), hasError: observe(undefined), hasWarning: observe(undefined), height: observe(undefined), isDisabled: observe(false), isEnabledNewConnetion: observe(undefined), isSelected: observe(false), width: observe(undefined) },
        { id: observe('7'), top: observe(0), left: observe(0), flowItemType: observe(EFlowItemType.acorn), label: observe(EItemType.ASSIGN), icon: observe(IconFlowAssign), itemType: observe(EItemType.ASSIGN), connections: observe([]), description: observe(''), hasError: observe(undefined), hasWarning: observe(undefined), height: observe(undefined), isDisabled: observe(false), isEnabledNewConnetion: observe(undefined), isSelected: observe(false), width: observe(undefined) },
        { id: observe('8'), top: observe(0), left: observe(0), flowItemType: observe(EFlowItemType.acorn), label: observe(EItemType.END), icon: observe(IconFlowEnd), itemType: observe(EItemType.END), connections: observe([]), description: observe(''), hasError: observe(undefined), hasWarning: observe(undefined), height: observe(undefined), isDisabled: observe(false), isEnabledNewConnetion: observe(undefined), isSelected: observe(false), width: observe(undefined) },
        { id: observe('9'), top: observe(0), left: observe(0), flowItemType: observe(EFlowItemType.comment), label: observe(EItemType.COMMENT), icon: observe(IconFlowComment), itemType: observe(EItemType.COMMENT), connections: observe([]), description: observe(''), hasError: observe(undefined), hasWarning: observe(undefined), height: observe(undefined), isDisabled: observe(false), isEnabledNewConnetion: observe(undefined), isSelected: observe(false), width: observe(undefined) },
    ], []);

    /** Quando clicado com o botão esquerdo do mouse no interior do editor esta função é acionada. */
    const handleShowContextMenu = useCallback((id: any, e: any): IContextItemList[] => {
        // const left = e.nativeEvent.offsetX;
        // const top = e.nativeEvent.offsetY;

        let options: IContextItemList[] = [];

        if (id) {
            let indexTreeToDelete: number | undefined;
            let indexTabToDelete: number | undefined;
            let indexToDelete: number | undefined;

            tabs.forEach((tab, indexTab) => {
                tab.items.value.forEach((item, indexTree) => {
                    if (item.isEditing.value) {
                        indexToDelete = item.items.value.findIndex(flow_item => flow_item.id.value === id);
                        indexTreeToDelete = indexTree;
                        indexTabToDelete = indexTab;
                    }
                });
            });

            const handleContextDelete = () => {
                if (indexTabToDelete !== undefined && indexToDelete !== undefined && indexToDelete !== -1 && indexTreeToDelete !== undefined) {
                    tabs[indexTabToDelete].items.value[indexTreeToDelete].items.value.splice(indexToDelete, 1);
                }
            }

            if (indexTabToDelete !== undefined && indexToDelete !== undefined && indexToDelete !== -1 && indexTreeToDelete !== undefined) {
                options.push({
                    icon: IconTrash,
                    action: handleContextDelete,
                    label: 'Delete ' + tabs[indexTabToDelete].items.value[indexTreeToDelete].items.value[indexToDelete].type.value,
                });

                options.push({
                    label: '-',
                    action: () => { }
                });
            }
        }

        toolBoxItems().forEach(item => {
            options.push({
                icon: item.icon.value,
                label: 'Add ' + item.label.value,
                action: () => {
                    // Encontra a tab certa e adiciona um item de fluxo aos items
                    tabs.forEach(tab => {
                        tab.items.value.forEach(itemTree => {
                            if (item?.itemType && itemTree.isEditing) {

                                // Deseleciona todos os items anteriores
                                itemTree.items.value.forEach(itemFlow => set(itemFlow.isSelected, false));

                                // Adiciona a tab com os items alterados
                                itemTree.items.value.push(new FlowItemComponent({
                                    type: parseEItemType(item.itemType.value),
                                    id: Utils.getUUID(),
                                    connections: [],
                                }));
                            }
                        });
                    });
                }
            });
        });

        return options;
    }, [tabs, toolBoxItems]);

    /** Monta o breadcamps que será exibido no top do editor de fluxos. */
    const getBreadcamps = useCallback((): IBreadCrumbButton[] => {

        let breadcamps: IBreadCrumbButton[] = [];

        tabs.forEach(tab => {
            tab.items.value.forEach(item => {
                if (item.isEditing.value) {

                    breadcamps.push({
                        label: tab.label,
                        onClick: observe(() => {
                            tabs.forEach(tab => set(tab.isEditing, false));
                            set(tab.isEditing, true);
                        })
                    });

                    breadcamps.push({
                        label: item.label,
                        onClick: observe(() => {
                            tabs.forEach(tab => set(tab.isEditing, false));

                            tabs.forEach(tab => {
                                tab.items.value.forEach(item => {
                                    set(item.isSelected, true);
                                });
                            });

                            set(item.isSelected, true);
                            set(tab.isEditing, true);
                        }),
                    });
                }
            });
        });

        return breadcamps;
    }, [tabs]);

    /** Usando o state pode pegar os items que devem ser editados pelo fluxo. */
    const flowEditorItems = useCallback((): { hasSomethingEditing: boolean, hasSomethingToEdit: boolean, flowItems: IFlowItem[] } => {

        // Action, Router are you editing
        let itemEditing: TreeItemComponent | undefined;

        /** Return if the project has some action, table or route to allow edit */
        const hasSomethingToEdit = tabs.some(tab => tab.items.value.length > 0);

        /** Return if the project has some action, table or route editing */
        const hasSomethingEditing = tabs.some(tab => tab.items.value.some(item => item.isEditing));

        tabs.forEach(tab => {
            tab.items.value.forEach(item => {
                if (item.isEditing.value) {
                    itemEditing = new TreeItemComponent({
                        properties: item.properties.value,
                        items: item.items.value,
                        type: item.type.value,
                        id: item.id.value,
                    });
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
        itemEditing.items.value.sort((a, b) => (a.top.value - b.top.value));


        // Se for o simples para o editor de fluxos, faz um map dos items.
        let flowItems: IFlowItem[] = [];
        itemEditing.items.value.forEach(item => {

            /** Prop usada para guarda o id da action referênciada */
            const actionProp = item.properties.value?.find(prop => prop.propertieType.value === PropertieTypes.action);

            /** Bloco de código qu encontra o ícone que será usado no fluxo */
            let selectedActionIcon: any;
            // let selectedActionDescription: IProperty | undefined;
            tabs.forEach(tab => {
                tab.items.value.forEach(itemToIconFind => {
                    if (itemToIconFind.name === actionProp?.value) {
                        selectedActionIcon = itemToIconFind.properties.value?.find(prop => prop.propertieType.value === PropertieTypes.icon);
                        // selectedActionDescription = itemToIconFind.properties.value?.find(prop => prop.propertieType.value === PropertieTypes.description);
                    }
                });
            });

            flowItems.push({
                id: item.id,
                top: item.top,
                left: item.left,
                label: item.label,
                width: item.width,
                height: item.height,
                itemType: item.type,
                hasError: item.hasError,
                hasWarning: item.hasWarning,
                isSelected: item.isSelected,
                isDisabled: item.isDisabled,
                connections: item.connections,
                description: item.description,
                flowItemType: item.flowItemType,
                isEnabledNewConnetion: item.isEnabledNewConnetion,
                icon: selectedActionIcon?.value?.content || item.icon.value.content,
                /* description: item.type.value !== EItemType.COMMENT
                    ? selectedActionDescription?.value || item.description
                    : item.properties.value?.find(prop => prop.propertieType.value === PropertieTypes.comment), */
            });
        });

        return {
            flowItems,
            hasSomethingToEdit,
            hasSomethingEditing,
        };
    }, [tabs]);

    const handleOnFocus = useCallback(() => {
        setCurrentFocus(ECurrentFocus.flow);
    }, [setCurrentFocus]);

    const handleOnContextMenu = useCallback((e: React.MouseEvent<any, MouseEvent>) => {
        if (e) {
            e.preventDefault();
            openContextMenu(e.clientX, e.clientY, handleShowContextMenu((e.target as any).id, e));
        }
    }, [handleShowContextMenu]);

    const flowEditorItemsResult = flowEditorItems();

    const getBackgroundEmpty = useCallback(() => {

        if (flowEditorItemsResult.flowItems.length !== 0) return null;

        if (flowEditorItemsResult.hasSomethingEditing) {
            return (
                <div className="opacity-6 flex-content-center flex-items-center no-events" style={{ height: '-webkit-fill-available', width: '-webkit-fill-available' }}>
                    <BackgroundEmptyLeft className="opacity-9" width={600} style={{ position: 'absolute', top: 0, left: 0 }} />
                    <BackgroundEmpty className="opacity-9" width={600} style={{ position: 'absolute', top: 0, right: 0 }} />
                    <h1 style={{ textAlign: 'center' }}>Drag and drop something here</h1>
                </div>
            );
        } else if (!flowEditorItemsResult.hasSomethingToEdit) {
            return (
                <div className="opacity-6 flex-content-center flex-items-center no-events" style={{ height: '-webkit-fill-available', width: '-webkit-fill-available' }}>
                    <h1 style={{ textAlign: 'center' }}>In the tree on the left,<br /> create a new feature to start</h1>
                    <BackgroundEmptyLeftToTop className="opacity-9" width={600} style={{ position: 'absolute', top: 0, right: 0 }} />
                </div>
            );
        } else if (flowEditorItemsResult.hasSomethingToEdit && !flowEditorItemsResult.hasSomethingEditing) {
            return (
                <div className="opacity-6 flex-content-center flex-items-center no-events" style={{ height: '-webkit-fill-available', width: '-webkit-fill-available' }}>
                    <h1 style={{ textAlign: 'center' }}>In the tree on the left,<br />double click to edit</h1>
                    <BackgroundEmptyLeftToTop className="opacity-9" width={600} style={{ position: 'absolute', top: 0, right: 0 }} />
                </div>
            );
        } else {
            return null;
        }
    }, [flowEditorItemsResult]);

    return (
        <FlowEditor
            id={"CODE_EDITOR"}
            onFocus={handleOnFocus}
            toolItems={toolBoxItems()}
            breadcrumbs={getBreadcamps()}
            onDropItem={handleOnDropItem}
            onContextMenu={handleOnContextMenu}
            onChangeItems={handleOnChangeItems}
            items={flowEditorItemsResult.flowItems}
            childrenWhenItemsEmpty={getBackgroundEmpty()}
            configs={{
                typesAllowedToDrop: [...EItemTypeList, EComponentType.globalAction, EComponentType.localAction, EComponentType.localVariable, EComponentType.inputVariable, EComponentType.outputVariable],
                snapGridWhileDragging: snapGridWhileDragging,
                backgroundType: flowBackgroundType,
                lineWidth: 1,

                showToolbar: flowEditorItemsResult.hasSomethingToEdit && flowEditorItemsResult.hasSomethingEditing,

                selectionBorderColor: 'var(--selection-border-color)',
                selectionBackgroundColor: '#ffffff11',

                flowItemSelectedColor: 'var(--selection-border-color)',
                flowItemWarningColor: 'var(--main-warning-color)',
                flowItemErrorColor: 'var(--main-error-color)',
                flowItemTextColor: '#ffffffba',
                commentTextColor: '#ffffff',
            }}
        />
    );
});

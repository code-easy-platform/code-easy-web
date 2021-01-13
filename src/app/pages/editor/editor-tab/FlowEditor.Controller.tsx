import React, { memo, useCallback, useEffect, useState } from 'react';
import { IconTrash, Utils, IconFlowStart, IconFlowAction, IconFlowIf, IconFlowForeach, IconFlowSwitch, IconFlowAssign, IconFlowEnd, IconFlowComment } from 'code-easy-components';
import { set, useObserverValue, observe, useSetObserver, ISubscription } from 'react-observing';

import { FlowEditor, IFlowItem, IBreadCrumbButton, EItemType, EFlowItemType, parseEItemType, EItemTypeList } from '../../../shared/components/external';
import { BackgroundEmpty, BackgroundEmptyLeft, BackgroundEmptyLeftToTop } from '../../../assets';
import { CurrentFocusStore, FlowItemsStore, PropertiesEditorStore } from '../../../shared/stores';
import { FlowItemAction, FlowItemAssign, FlowItemComment, FlowItemComponent, FlowItemEnd, FlowItemForeach, FlowItemIf, FlowItemStart, FlowItemSwitch } from '../../../shared/models';
import { EComponentType, ECurrentFocus } from '../../../shared/enuns';
import { IContextItemList } from '../../../shared/interfaces';
import { openContextMenu } from '../../../shared/services';
import { useIdeConfigs } from '../../../shared/contexts';
import { useEditorContext } from '../../../shared/hooks';

const useEditingItem = () => {
    const [hasSomethingToEdit, setHasSomethingToEdit] = useState<boolean>(false);
    const [breadcamps, setBreadcamps] = useState<IBreadCrumbButton[]>([]);
    const selectedTreeItem = useObserverValue(FlowItemsStore);
    const items = useObserverValue(selectedTreeItem.items);
    const { tabs } = useEditorContext();

    useEffect(() => {
        const subscriptions: ISubscription[] = [];

        setHasSomethingToEdit(tabs.some(tab => tab.items.value.length > 0));

        if (!selectedTreeItem.treeItemId) {
            setBreadcamps([]);
        } else {
            tabs.forEach(tab => {
                tab.items.value.forEach(treeItem => {
                    if (treeItem.id.value === selectedTreeItem.treeItemId) {
                        setBreadcamps([
                            {
                                label: tab.label,
                                onClick: observe(() => {
                                    tabs.forEach(tabToUpdate => set(tabToUpdate.isEditing, tabToUpdate.id.value === tab.id.value));
                                })
                            },
                            {
                                label: treeItem.label,
                                onClick: observe(() => {
                                    tabs.forEach(tabToUpdate => {
                                        set(tabToUpdate.isEditing, tabToUpdate.id.value === tab.id.value)
                                        tabToUpdate.items.value.forEach(item => {
                                            set(item.isSelected, item.id.value === treeItem.id.value);
                                        });
                                    });
                                }),
                            }
                        ]);
                    }
                });
            });
        }

        return () => subscriptions.forEach(subs => subs?.unsubscribe());
    }, [tabs, selectedTreeItem.treeItemId]);

    return {
        breadcamps,
        hasSomethingToEdit,
        hasSomethingEditing: !!selectedTreeItem.treeItemId,
        flowItems: items.map<IFlowItem>(flowItem => ({
            id: flowItem.id,
            top: flowItem.top,
            left: flowItem.left,
            icon: flowItem.icon,
            label: flowItem.label,
            width: flowItem.width,
            height: flowItem.height,
            itemType: flowItem.type,
            hasError: flowItem.hasError,
            hasWarning: flowItem.hasWarning,
            isSelected: flowItem.isSelected,
            isDisabled: flowItem.isDisabled,
            connections: flowItem.connections,
            description: flowItem.description,
            flowItemType: flowItem.flowItemType,
            isEnabledNewConnetion: flowItem.isEnabledNewConnetion,
        })),
    };
}

export const FlowEditorController: React.FC = memo(() => {
    const { tabs } = useEditorContext();

    const { flowItems, breadcamps, hasSomethingEditing, hasSomethingToEdit } = useEditingItem();
    const { flowBackgroundType, snapGridWhileDragging } = useIdeConfigs();
    const setCurrentFocus = useSetObserver(CurrentFocusStore);

    const handleOnChangeItems = useCallback((updatedItems: IFlowItem[]) => {

        const setPropertiesEditor = (item: FlowItemComponent) => {
            set(PropertiesEditorStore, {
                id: item.id,
                name: item.label,
                subname: item.type,
                properties: item.properties.value,
            });
        };

        tabs.forEach(tab => {
            tab.items.value.forEach(treeItem => {

                // Added a new item in the list of items.
                updatedItems.forEach(updatedItem => {
                    if (!treeItem.items.value.some(oldItem => oldItem.id.value === updatedItem.id.value)) {
                        set(treeItem.items, items => {
                            switch (updatedItem.itemType?.value) {
                                case EComponentType.inputVariable:
                                    const inputVariable = new FlowItemAssign({
                                        id: updatedItem.id.value,
                                        connections: updatedItem.connections.value,
                                        properties: FlowItemAssign.newItem(updatedItem.top.value, updatedItem.left.value, undefined, true).properties.value,
                                    });
                                    setPropertiesEditor(inputVariable);
                                    return [...items, inputVariable];
                                case EComponentType.localVariable:
                                    const localVariable = new FlowItemAssign({
                                        id: updatedItem.id.value,
                                        connections: updatedItem.connections.value,
                                        properties: FlowItemAssign.newItem(updatedItem.top.value, updatedItem.left.value, undefined, true).properties.value,
                                    });
                                    setPropertiesEditor(localVariable);
                                    return [...items, localVariable];
                                case EComponentType.outputVariable:
                                    const outputVariable = new FlowItemAssign({
                                        id: updatedItem.id.value,
                                        connections: updatedItem.connections.value,
                                        properties: FlowItemAssign.newItem(updatedItem.top.value, updatedItem.left.value, undefined, true).properties.value,
                                    });
                                    setPropertiesEditor(outputVariable);
                                    return [...items, outputVariable];
                                case EComponentType.globalAction:
                                    const globalAction = new FlowItemAction({
                                        id: updatedItem.id.value,
                                        connections: updatedItem.connections.value,
                                        properties: FlowItemAction.newItem(updatedItem.top.value, updatedItem.left.value, undefined, true).properties.value,
                                    });
                                    setPropertiesEditor(globalAction);
                                    return [...items, globalAction];
                                case EItemType.ACTION:
                                    const action = new FlowItemAction({
                                        id: updatedItem.id.value,
                                        connections: updatedItem.connections.value,
                                        properties: FlowItemAction.newItem(updatedItem.top.value, updatedItem.left.value, undefined, true).properties.value,
                                    });
                                    setPropertiesEditor(action);
                                    return [...items, action];
                                case EItemType.COMMENT:
                                    const comment = new FlowItemComment({
                                        id: updatedItem.id.value,
                                        connections: updatedItem.connections.value,
                                        properties: FlowItemComment.newItem(updatedItem.top.value, updatedItem.left.value, true).properties.value,
                                    });
                                    setPropertiesEditor(comment);
                                    return [...items, comment];
                                case EItemType.ASSIGN:
                                    const assign = new FlowItemAssign({
                                        id: updatedItem.id.value,
                                        connections: updatedItem.connections.value,
                                        properties: FlowItemAssign.newItem(updatedItem.top.value, updatedItem.left.value, undefined, true).properties.value,
                                    });
                                    setPropertiesEditor(assign);
                                    return [...items, assign];
                                case EItemType.END:
                                    const end = new FlowItemEnd({
                                        id: updatedItem.id.value,
                                        properties: FlowItemEnd.newItem(updatedItem.top.value, updatedItem.left.value, true).properties.value,
                                    });
                                    setPropertiesEditor(end);
                                    return [...items, end];
                                case EItemType.FOREACH:
                                    const foreach = new FlowItemForeach({
                                        id: updatedItem.id.value,
                                        connections: updatedItem.connections.value,
                                        properties: FlowItemForeach.newItem(updatedItem.top.value, updatedItem.left.value, undefined, true).properties.value,
                                    });
                                    setPropertiesEditor(foreach);
                                    return [...items, foreach];
                                case EItemType.IF:
                                    const ifComponent = new FlowItemIf({
                                        id: updatedItem.id.value,
                                        connections: updatedItem.connections.value,
                                        properties: FlowItemIf.newItem(updatedItem.top.value, updatedItem.left.value, undefined, true).properties.value,
                                    });
                                    setPropertiesEditor(ifComponent);
                                    return [...items, ifComponent];
                                case EItemType.START:
                                    const start = new FlowItemStart({
                                        id: updatedItem.id.value,
                                        connections: updatedItem.connections.value,
                                        properties: FlowItemStart.newItem(updatedItem.top.value, updatedItem.left.value, undefined, true).properties.value,
                                    });
                                    setPropertiesEditor(start);
                                    return [...items, start];
                                case EItemType.SWITCH:
                                    const switchComponent = new FlowItemSwitch({
                                        id: updatedItem.id.value,
                                        connections: updatedItem.connections.value,
                                        properties: FlowItemSwitch.newItem(updatedItem.top.value, updatedItem.left.value, undefined, true).properties.value,
                                    });
                                    setPropertiesEditor(switchComponent);
                                    return [...items, switchComponent];
                                default: return items;
                            }
                        });
                    }
                });

                // Remove deleted items
                set(treeItem.items, items => {
                    return items.filter(flowItem => updatedItems.some(oldItem => oldItem.id.value === flowItem.id.value))
                });
            });
        });
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
    const handleShowContextMenu = useCallback((id: any): IContextItemList[] => {

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
                    set(tabs[indexTabToDelete].items.value[indexTreeToDelete].items, oldItems => {
                        return oldItems.filter(oldItem => oldItem.id.value === id);
                    });
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
                                    properties: [],
                                }));
                            }
                        });
                    });
                }
            });
        });

        return options;
    }, [tabs, toolBoxItems]);

    const handleOnFocus = useCallback(() => {
        setCurrentFocus(ECurrentFocus.flow);
    }, [setCurrentFocus]);

    const handleOnContextMenu = useCallback((e: React.MouseEvent<any, MouseEvent>) => {
        if (e) {
            e.preventDefault();
            openContextMenu(e.clientX, e.clientY, handleShowContextMenu((e.target as any).id));
        }
    }, [handleShowContextMenu]);

    const getBackgroundEmpty = useCallback(() => {

        if (flowItems.length !== 0) return null;

        if (hasSomethingEditing) {
            return (
                <div className="opacity-6 flex-content-center flex-items-center no-events" style={{ height: '-webkit-fill-available', width: '-webkit-fill-available' }}>
                    <BackgroundEmptyLeft className="opacity-9" width={600} style={{ position: 'absolute', top: 0, left: 0 }} />
                    <BackgroundEmpty className="opacity-9" width={600} style={{ position: 'absolute', top: 0, right: 0 }} />
                    <h1 style={{ textAlign: 'center' }}>Drag and drop something here</h1>
                </div>
            );
        } else if (!hasSomethingToEdit) {
            return (
                <div className="opacity-6 flex-content-center flex-items-center no-events" style={{ height: '-webkit-fill-available', width: '-webkit-fill-available' }}>
                    <h1 style={{ textAlign: 'center' }}>In the tree on the left,<br /> create a new feature to start</h1>
                    <BackgroundEmptyLeftToTop className="opacity-9" width={600} style={{ position: 'absolute', top: 0, right: 0 }} />
                </div>
            );
        } else if (hasSomethingToEdit && !hasSomethingEditing) {
            return (
                <div className="opacity-6 flex-content-center flex-items-center no-events" style={{ height: '-webkit-fill-available', width: '-webkit-fill-available' }}>
                    <h1 style={{ textAlign: 'center' }}>In the tree on the left,<br />double click to edit</h1>
                    <BackgroundEmptyLeftToTop className="opacity-9" width={600} style={{ position: 'absolute', top: 0, right: 0 }} />
                </div>
            );
        } else {
            return null;
        }
    }, [flowItems.length, hasSomethingEditing, hasSomethingToEdit]);

    return (
        <FlowEditor
            items={flowItems}
            id={"CODE_EDITOR"}
            onFocus={handleOnFocus}
            breadcrumbs={breadcamps}
            toolItems={toolBoxItems()}
            // onDropItem={handleOnDropItem}
            onContextMenu={handleOnContextMenu}
            onChangeItems={handleOnChangeItems}
            childrenWhenItemsEmpty={getBackgroundEmpty()}
            configs={{
                typesAllowedToDrop: [...EItemTypeList, EComponentType.globalAction, EComponentType.localAction, EComponentType.localVariable, EComponentType.inputVariable, EComponentType.outputVariable],
                snapGridWhileDragging: snapGridWhileDragging,
                backgroundType: flowBackgroundType,
                lineWidth: 1,

                showToolbar: hasSomethingToEdit && hasSomethingEditing,

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

import React, { memo, useCallback, useEffect, useState } from 'react';
import { IconTrash, IconFlowStart, IconFlowAction, IconFlowIf, IconFlowForeach, IconFlowSwitch, IconFlowAssign, IconFlowEnd, IconFlowComment } from 'code-easy-components';
import { set, useObserverValue, observe, useSetObserver, ISubscription, useObserver } from 'react-observing';

import { FlowItemAction, FlowItemAssign, FlowItemComment, FlowItemComponent, FlowItemEnd, FlowItemForeach, FlowItemIf, FlowItemStart, FlowItemSwitch } from '../../../shared/models';
import { FlowEditor, IFlowItem, IBreadCrumbButton, EItemType, EFlowItemType, EItemTypeList } from '../../../shared/components/external';
import { CurrentFocusStore, flowItemsStore, PropertiesEditorStore } from '../../../shared/stores';
import { BackgroundEmpty, BackgroundEmptyLeft, BackgroundEmptyLeftToTop } from '../../../assets';
import { EComponentType, ECurrentFocus } from '../../../shared/enuns';
import { IContextItemList } from '../../../shared/interfaces';
import { openContextMenu } from '../../../shared/services';
import { useIdeConfigs } from '../../../shared/contexts';
import { useEditorContext } from '../../../shared/hooks';

const useEditingItem = () => {
    const [hasSomethingToEdit, setHasSomethingToEdit] = useState<boolean>(false);
    const [breadcamps, setBreadcamps] = useState<IBreadCrumbButton[]>([]);
    const selectedTreeItem = useObserverValue(flowItemsStore.current);
    const [editingItems, setItems] = useObserver(selectedTreeItem.items);
    const editingItemId = useObserverValue(selectedTreeItem.itemId);
    const { tabs } = useEditorContext();

    useEffect(() => {
        const subscriptions: ISubscription[] = [];

        setHasSomethingToEdit(tabs.some(tab => tab.items.value.length > 0));

        if (!editingItemId) {
            setBreadcamps([]);
        } else {
            tabs.forEach(tab => {
                tab.items.value.forEach(treeItem => {
                    if (treeItem.id.value === editingItemId) {
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
    }, [tabs, editingItemId]);

    return {
        setItems,
        breadcamps,
        selectedTreeItem,
        hasSomethingToEdit,
        hasSomethingEditing: !!editingItemId,
        flowItems: editingItems.map<IFlowItem>(flowItem => ({
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
    const { flowItems, breadcamps, hasSomethingEditing, hasSomethingToEdit, selectedTreeItem, setItems } = useEditingItem();
    const { flowBackgroundType, snapGridWhileDragging } = useIdeConfigs();
    const setCurrentFocus = useSetObserver(CurrentFocusStore);

    const handleOnChangeItems = useCallback((updatedItems: IFlowItem[]) => {

        const setPropertiesEditor = (item: FlowItemComponent) => {
            set(PropertiesEditorStore, {
                id: item.id,
                name: item.label,
                subname: item.type,
                properties: item.properties,
            });
        };

        // Added a new item in the list of items.
        updatedItems.forEach(updatedItem => {
            if (!selectedTreeItem.items.value.some(oldItem => oldItem.id.value === updatedItem.id.value)) {
                console.log(selectedTreeItem.items)
                setItems(items => {
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
        setItems(oldItems => {
            return oldItems.filter(flowItem => updatedItems.some(oldItem => oldItem.id.value === flowItem.id.value))
        });
    }, [selectedTreeItem.items, setItems]);

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
    const handleShowContextMenu = useCallback((id: any, top: number, left: number): IContextItemList[] => {
        const setPropertiesEditor = (item: FlowItemComponent) => {
            set(PropertiesEditorStore, {
                id: item.id,
                name: item.label,
                subname: item.type,
                properties: item.properties,
            });
        };

        const options: IContextItemList[] = [
            ...toolBoxItems().map(item => ({
                icon: item.icon.value,
                label: 'Add ' + item.label.value,
                action: () => {

                    // Add a new item
                    setItems(oldItems => {
                        if (!item.itemType) return oldItems;

                        // Unselect all old items
                        oldItems.forEach(itemFlow => set(itemFlow.isSelected, false));

                        switch (item.itemType.value) {
                            case EComponentType.inputVariable:
                                const inputVariable = FlowItemAssign.newItem(top, left, undefined, true);
                                setPropertiesEditor(inputVariable);
                                return [...oldItems, inputVariable];
                            case EComponentType.localVariable:
                                const localVariable = FlowItemAssign.newItem(top, left, undefined, true);
                                setPropertiesEditor(localVariable);
                                return [...oldItems, localVariable];
                            case EComponentType.outputVariable:
                                const outputVariable = FlowItemAssign.newItem(top, left, undefined, true);
                                setPropertiesEditor(outputVariable);
                                return [...oldItems, outputVariable];
                            case EComponentType.globalAction:
                                const globalAction = FlowItemAction.newItem(top, left, undefined, true);
                                setPropertiesEditor(globalAction);
                                return [...oldItems, globalAction];
                            case EItemType.ACTION:
                                const action = FlowItemAction.newItem(top, left, undefined, true);
                                setPropertiesEditor(action);
                                return [...oldItems, action];
                            case EItemType.COMMENT:
                                const comment = FlowItemComment.newItem(top, left, true);
                                setPropertiesEditor(comment);
                                return [...oldItems, comment];
                            case EItemType.ASSIGN:
                                const assign = FlowItemAssign.newItem(top, left, undefined, true);
                                setPropertiesEditor(assign);
                                return [...oldItems, assign];
                            case EItemType.END:
                                const end = FlowItemEnd.newItem(top, left, true);
                                setPropertiesEditor(end);
                                return [...oldItems, end];
                            case EItemType.FOREACH:
                                const foreach = FlowItemForeach.newItem(top, left, undefined, true);
                                setPropertiesEditor(foreach);
                                return [...oldItems, foreach];
                            case EItemType.IF:
                                const ifComponent = FlowItemIf.newItem(top, left, undefined, true);
                                setPropertiesEditor(ifComponent);
                                return [...oldItems, ifComponent];
                            case EItemType.START:
                                const start = FlowItemStart.newItem(top, left, undefined, true);
                                setPropertiesEditor(start);
                                return [...oldItems, start];
                            case EItemType.SWITCH:
                                const switchComponent = FlowItemSwitch.newItem(top, left, undefined, true);
                                setPropertiesEditor(switchComponent);
                                return [...oldItems, switchComponent];
                            default: return oldItems;
                        }
                    });
                }
            }))
        ];

        if (id) {
            const itemsToDelete = selectedTreeItem.items.value.filter(flowItem => flowItem.isSelected.value);

            /** Delete a item */
            const handleContextDelete = () => {
                set(selectedTreeItem.items, oldItems => oldItems.filter(oldItem => !oldItem.isSelected.value));
            }

            if (itemsToDelete.length > 0) {
                options.unshift({ label: '-' });

                if (itemsToDelete.length === 1) {
                    options.unshift({
                        icon: IconTrash,
                        action: handleContextDelete,
                        label: `Delete ${itemsToDelete[0].label.value}`,
                    });
                } else {
                    options.unshift({
                        icon: IconTrash,
                        action: handleContextDelete,
                        label: 'Delete all selecteds',
                    });
                }
            }
        }

        return options;
    }, [selectedTreeItem.items, setItems, toolBoxItems]);

    const handleOnFocus = useCallback(() => {
        setCurrentFocus(ECurrentFocus.flow);
    }, [setCurrentFocus]);

    const handleOnContextMenu = useCallback((e: React.MouseEvent<any, MouseEvent>) => {
        e.preventDefault();

        if (e && hasSomethingToEdit && hasSomethingEditing) {
            openContextMenu(e.clientX, e.clientY, handleShowContextMenu((e.target as any).id, e.clientY, e.clientX));
        }
    }, [hasSomethingToEdit, hasSomethingEditing, handleShowContextMenu]);

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
                    <h1 style={{ textAlign: 'center' }}>On the left,<br /> create a new feature to start</h1>
                    <BackgroundEmptyLeftToTop className="opacity-9" width={600} style={{ position: 'absolute', top: 0, right: 0 }} />
                </div>
            );
        } else if (hasSomethingToEdit && !hasSomethingEditing) {
            return (
                <div className="opacity-6 flex-content-center flex-items-center no-events" style={{ height: '-webkit-fill-available', width: '-webkit-fill-available' }}>
                    <h1 style={{ textAlign: 'center' }}>On the left,<br />double click to edit</h1>
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
                commentColor: '#54a878',
            }}
        />
    );
});

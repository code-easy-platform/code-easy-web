import React, { memo, useCallback, useMemo } from 'react';
import { IconTrash, IconFlowStart, IconFlowAction, IconFlowIf, IconFlowForeach, IconFlowSwitch, IconFlowAssign, IconFlowEnd, IconFlowComment } from 'code-easy-components';
import { set, observe } from 'react-observing';

import { FlowItemAction, FlowItemAssign, FlowItemComment, FlowItemComponent, FlowItemEnd, FlowItemForeach, FlowItemIf, FlowItemStart, FlowItemSwitch } from '../../../shared/models';
import { FlowEditor, IFlowItem, EItemType, EFlowItemType, EItemTypeList } from '../../../shared/components/external';
import { BackgroundEmpty, BackgroundEmptyLeft, BackgroundEmptyLeftToTop } from '../../../assets';
import { useCurrentFocus, useFlowEditorItems } from '../../../shared/hooks';
import { EComponentType, ECurrentFocus } from '../../../shared/enuns';
import { IContextItemList } from '../../../shared/interfaces';
import { openContextMenu } from '../../../shared/services';
import { useIdeConfigs } from '../../../shared/contexts';

export const FlowEditorController: React.FC = memo(() => {
    const { flowItems, breadcamps, hasSomethingEditing, hasSomethingToEdit, setItems } = useFlowEditorItems();
    const { flowBackgroundType, snapGridWhileDragging } = useIdeConfigs();
    const { setCurrentFocus } = useCurrentFocus();

    /** Alimenta a toolbox, de onde pode ser arrastados items para o fluxo. */
    const toolBoxItems = useMemo((): IFlowItem[] => [
        { itemType: observe(EItemType.START), ...FlowItemComponent.defaultProperties({ id: '1', icon: { content: IconFlowStart }, label: EItemType.START }) },
        { itemType: observe(EItemType.ACTION), ...FlowItemComponent.defaultProperties({ id: '2', icon: { content: IconFlowAction }, label: EItemType.ACTION }) },
        { itemType: observe(EItemType.IF), ...FlowItemComponent.defaultProperties({ id: '3', icon: { content: IconFlowIf }, label: EItemType.IF }) },
        { itemType: observe(EItemType.FOREACH), ...FlowItemComponent.defaultProperties({ id: '4', icon: { content: IconFlowForeach }, label: EItemType.FOREACH }) },
        { itemType: observe(EItemType.SWITCH), ...FlowItemComponent.defaultProperties({ id: '5', icon: { content: IconFlowSwitch }, label: EItemType.SWITCH }) },
        { itemType: observe(EItemType.ASSIGN), ...FlowItemComponent.defaultProperties({ id: '6', icon: { content: IconFlowAssign }, label: EItemType.ASSIGN }) },
        { itemType: observe(EItemType.END), ...FlowItemComponent.defaultProperties({ id: '7', icon: { content: IconFlowEnd }, label: EItemType.END }) },
        { itemType: observe(EItemType.COMMENT), ...FlowItemComponent.defaultProperties({ id: '8', icon: { content: IconFlowComment }, label: EItemType.COMMENT, flowItemType: EFlowItemType.comment }) },
    ], []);

    const getBackgroundEmpty = useMemo(() => {
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

    const handleOnChangeItems = useCallback((updatedItems: IFlowItem[]) => {

        // Added a new item in the list of items.
        updatedItems.forEach(updatedItem => {
            if (!flowItems.some(oldItem => oldItem.id.value === updatedItem.id.value)) {
                switch (updatedItem.itemType?.value) {
                    case EComponentType.inputVariable:
                        const inputVariable = new FlowItemAssign({
                            id: updatedItem.id.value,
                            connections: updatedItem.connections.value,
                            properties: FlowItemAssign.newItem(updatedItem.top.value, updatedItem.left.value, undefined, true).properties.value,
                        });
                        setItems(oldItems => [...oldItems, inputVariable]);;
                        break;
                    case EComponentType.localVariable:
                        const localVariable = new FlowItemAssign({
                            id: updatedItem.id.value,
                            connections: updatedItem.connections.value,
                            properties: FlowItemAssign.newItem(updatedItem.top.value, updatedItem.left.value, undefined, true).properties.value,
                        });
                        setItems(oldItems => [...oldItems, localVariable]);
                        break;
                    case EComponentType.outputVariable:
                        const outputVariable = new FlowItemAssign({
                            id: updatedItem.id.value,
                            connections: updatedItem.connections.value,
                            properties: FlowItemAssign.newItem(updatedItem.top.value, updatedItem.left.value, undefined, true).properties.value,
                        });
                        setItems(oldItems => [...oldItems, outputVariable]);
                        break;
                    case EComponentType.globalAction:
                        const globalAction = new FlowItemAction({
                            id: updatedItem.id.value,
                            connections: updatedItem.connections.value,
                            properties: FlowItemAction.newItem(updatedItem.top.value, updatedItem.left.value, undefined, true).properties.value,
                        });
                        setItems(oldItems => [...oldItems, globalAction]);
                        break;
                    case EItemType.ACTION:
                        const action = new FlowItemAction({
                            id: updatedItem.id.value,
                            connections: updatedItem.connections.value,
                            properties: FlowItemAction.newItem(updatedItem.top.value, updatedItem.left.value, undefined, true).properties.value,
                        });
                        setItems(oldItems => [...oldItems, action]);
                        break;
                    case EItemType.COMMENT:
                        const comment = new FlowItemComment({
                            id: updatedItem.id.value,
                            connections: updatedItem.connections.value,
                            properties: FlowItemComment.newItem(updatedItem.top.value, updatedItem.left.value, true).properties.value,
                        });
                        setItems(oldItems => [...oldItems, comment]);
                        break;
                    case EItemType.ASSIGN:
                        const assign = new FlowItemAssign({
                            id: updatedItem.id.value,
                            connections: updatedItem.connections.value,
                            properties: FlowItemAssign.newItem(updatedItem.top.value, updatedItem.left.value, undefined, true).properties.value,
                        });
                        setItems(oldItems => [...oldItems, assign]);
                        break;
                    case EItemType.END:
                        const end = new FlowItemEnd({
                            id: updatedItem.id.value,
                            properties: FlowItemEnd.newItem(updatedItem.top.value, updatedItem.left.value, true).properties.value,
                        });
                        setItems(oldItems => [...oldItems, end]);
                        break;
                    case EItemType.FOREACH:
                        const foreach = new FlowItemForeach({
                            id: updatedItem.id.value,
                            connections: updatedItem.connections.value,
                            properties: FlowItemForeach.newItem(updatedItem.top.value, updatedItem.left.value, undefined, true).properties.value,
                        });
                        setItems(oldItems => [...oldItems, foreach]);
                        break;
                    case EItemType.IF:
                        const ifComponent = new FlowItemIf({
                            id: updatedItem.id.value,
                            connections: updatedItem.connections.value,
                            properties: FlowItemIf.newItem(updatedItem.top.value, updatedItem.left.value, undefined, true).properties.value,
                        });
                        setItems(oldItems => [...oldItems, ifComponent]);
                        break;
                    case EItemType.START:
                        const start = new FlowItemStart({
                            id: updatedItem.id.value,
                            connections: updatedItem.connections.value,
                            properties: FlowItemStart.newItem(updatedItem.top.value, updatedItem.left.value, undefined, true).properties.value,
                        });
                        setItems(oldItems => [...oldItems, start]);
                        break;
                    case EItemType.SWITCH:
                        const switchComponent = new FlowItemSwitch({
                            id: updatedItem.id.value,
                            connections: updatedItem.connections.value,
                            properties: FlowItemSwitch.newItem(updatedItem.top.value, updatedItem.left.value, undefined, true).properties.value,
                        });
                        setItems(oldItems => [...oldItems, switchComponent]);
                        break;
                    default: break;
                }
            }
        });

        // Remove deleted items
        setItems(oldItems => {
            return oldItems.filter(flowItem => updatedItems.some(oldItem => oldItem.id.value === flowItem.id.value))
        });
    }, [flowItems, setItems]);

    /** Quando clicado com o botão esquerdo do mouse no interior do editor esta função é acionada. */
    const handleOnContextMenu = useCallback((e: React.MouseEvent<any, MouseEvent>) => {
        e.preventDefault();

        if (!e || !hasSomethingToEdit || !hasSomethingEditing) return;

        const id = (e.target as any).id;
        const left: number = e.clientX;
        const top: number = e.clientY;

        const options: IContextItemList[] = [
            ...toolBoxItems.map(item => ({
                icon: (item.icon.value as any).content,
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
                                return [...oldItems, inputVariable];
                            case EComponentType.localVariable:
                                const localVariable = FlowItemAssign.newItem(top, left, undefined, true);
                                return [...oldItems, localVariable];
                            case EComponentType.outputVariable:
                                const outputVariable = FlowItemAssign.newItem(top, left, undefined, true);
                                return [...oldItems, outputVariable];
                            case EComponentType.globalAction:
                                const globalAction = FlowItemAction.newItem(top, left, undefined, true);
                                return [...oldItems, globalAction];
                            case EItemType.ACTION:
                                const action = FlowItemAction.newItem(top, left, undefined, true);
                                return [...oldItems, action];
                            case EItemType.COMMENT:
                                const comment = FlowItemComment.newItem(top, left, true);
                                return [...oldItems, comment];
                            case EItemType.ASSIGN:
                                const assign = FlowItemAssign.newItem(top, left, undefined, true);
                                return [...oldItems, assign];
                            case EItemType.END:
                                const end = FlowItemEnd.newItem(top, left, true);
                                return [...oldItems, end];
                            case EItemType.FOREACH:
                                const foreach = FlowItemForeach.newItem(top, left, undefined, true);
                                return [...oldItems, foreach];
                            case EItemType.IF:
                                const ifComponent = FlowItemIf.newItem(top, left, undefined, true);
                                return [...oldItems, ifComponent];
                            case EItemType.START:
                                const start = FlowItemStart.newItem(top, left, undefined, true);
                                return [...oldItems, start];
                            case EItemType.SWITCH:
                                const switchComponent = FlowItemSwitch.newItem(top, left, undefined, true);
                                return [...oldItems, switchComponent];
                            default: return oldItems;
                        }
                    });
                }
            }))
        ];

        if (id) {
            const itemsToDelete = flowItems.filter(flowItem => flowItem.isSelected.value);

            /** Delete a item */
            const handleContextDelete = () => {
                setItems(oldItems => oldItems.filter(oldItem => !oldItem.isSelected.value));
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

        openContextMenu(left, top, options);
    }, [flowItems, hasSomethingEditing, hasSomethingToEdit, setItems, toolBoxItems]);

    const handleOnFocus = useCallback(() => {
        setCurrentFocus(ECurrentFocus.flow);
    }, [setCurrentFocus]);

    return (
        <FlowEditor
            items={flowItems}
            id={"CODE_EDITOR"}
            onFocus={handleOnFocus}
            breadcrumbs={breadcamps}
            toolItems={toolBoxItems}
            onContextMenu={handleOnContextMenu}
            onChangeItems={handleOnChangeItems}
            childrenWhenItemsEmpty={getBackgroundEmpty}
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

                rulers: [120]
            }}
        />
    );
});

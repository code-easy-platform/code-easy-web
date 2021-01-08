import React, { useCallback, useRef } from 'react';
import { observe, set, useObserver } from "react-observing";
import { DropTargetMonitor } from 'react-dnd';
import { Utils } from 'code-easy-components';

import { ICoords, IFlowItem, IDroppableItem, IFlowEditorBoardProps, IConnection } from './shared/interfaces';
import { useConfigs, useDeleteSelecteds, useItems, useSelectItemById } from './shared/hooks';
import { EmptyFeedback, FlowItem, SelectorArea, EditorPanel, Toolbar } from './components';
import BreandCrumbs from './components/breadcrumbs/BreandCrumbs';
import { Lines } from './components/flow-item/line/Lines';

export const FlowEditorBoard: React.FC<IFlowEditorBoardProps> = (props) => {
    const {
        elevationColor, breadcrumbBorderColor, disableSelection,
        dottedSize, dotColor, typesAllowedToDrop, backgroundType,
        selectionBorderWidth, backgroundColor, selectionBorderType,
        breadcrumbBackgroundColor, breadcrumbTextColor, showToolbar,
        toolbarBackgroundColor, toolbarBorderColor, toolbarItemWidth,
        selectionBackgroundColor, selectionBorderColor, useElevation,
    } = useConfigs();
    const { id, childrenWhenItemsEmpty = "Nothing here to edit", breadcrumbs = [], toolItems = [] } = props;
    const { onMouseEnter, onMouseLeave, onContextMenu, onDropItem, onFocus, onChangeItems } = props;
    const { onAnyKeyDown, onKeyDownCtrlC, onKeyDownCtrlD, onKeyDownCtrlV } = props;
    const deleteSelectedItems = useDeleteSelecteds();
    const boardRef = useRef<SVGSVGElement>(null);
    const selectItemById = useSelectItemById();
    const itemsStore = useItems();
    const [items, setItems] = useObserver(itemsStore);

    const handleOnCoordsChange = useCallback((coords: ICoords) => {

        const selectItemByCoords = (item: IFlowItem, coords: ICoords): boolean => {
            const top2 = item.top.value + (item.height.value || 0);
            const left2 = item.left.value + (item.width.value || 0);

            const yGreaterThan0 = ((coords.endY - coords.startY) > 0);
            const xGreaterThan0 = ((coords.endX - coords.startX) > 0);

            const lessThan0Selected = (_param1: number, _param2: number, _coordStart: number, _coordEnd: number) => {
                return (
                    (
                        (_param1 <= _coordStart) || (_param2 <= _coordStart)
                    ) && (
                        (_param1 >= _coordEnd) || (_param2 >= _coordEnd)
                    )
                );
            }

            const greaterThan0Selected = (_param1: number, _param2: number, _coordStart: number, _coordEnd: number) => {
                return (
                    (
                        (_param1 >= _coordStart) || (_param2 >= _coordStart)
                    ) && (
                        (_param1 <= _coordEnd) || (_param2 <= _coordEnd)
                    )
                );
            }

            return (
                (
                    yGreaterThan0
                        ? greaterThan0Selected(item.top.value, top2, coords.startY, coords.endY)
                        : lessThan0Selected(item.top.value, top2, coords.startY, coords.endY)
                )
                &&
                (
                    xGreaterThan0
                        ? greaterThan0Selected(item.left.value, left2, coords.startX, coords.endX)
                        : lessThan0Selected(item.left.value, left2, coords.startX, coords.endX)
                )
            );
        };

        items.forEach(item => {
            const mustSelect = selectItemByCoords(item, coords);

            if (item.isSelected && item.isSelected.value !== mustSelect) {
                set(item.isSelected, mustSelect);
            }
        });
    }, [items]);

    const handleSelecteAllFlowItems = useCallback(() => {
        items.forEach(item => {
            item.connections.value.forEach(conn => {
                set(conn.isSelected, true)
            });
            if (item.isSelected && !item.isSelected.value) {
                set(item.isSelected, true);
            }
        });
    }, [items]);

    const handleArrowKeyDown = useCallback((direction: "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight") => {
        items.forEach(item => {
            if (item.isSelected.value) {
                switch (direction) {
                    case 'ArrowDown':
                        set(item.top, item.top.value + 15);
                        break;
                    case 'ArrowUp':
                        if ((item.top.value - 15) > 0) {
                            set(item.top, item.top.value - 15);
                        }
                        break;
                    case 'ArrowLeft':
                        if ((item.left.value - 15) > 0) {
                            set(item.left, item.left.value - 15);
                        }
                        break;
                    case 'ArrowRight':
                        set(item.left, item.left.value + 15);
                        break;
                }
            }
        });
    }, [items]);

    const handleDroptem = useCallback((item: IDroppableItem, monitor: DropTargetMonitor, connectionTargetId?: string | undefined) => {

        const target = boardRef.current;
        const draggedOffSet = monitor.getClientOffset();
        if (!target || !draggedOffSet) return;

        // Deselect all selecteds items
        items.forEach(item => set(item.isSelected, false));

        const targetSize = target.getBoundingClientRect();
        const targetOffsetY = (draggedOffSet.y + (targetSize.top - targetSize.top - targetSize.top) - 25);
        const targetOffsetX = (draggedOffSet.x + (targetSize.left - targetSize.left - targetSize.left) - 25);

        const newItem: IFlowItem = {
            itemType: item.itemProps.itemType ? observe(item.itemProps.itemType) : undefined,
            flowItemType: observe(item.itemProps.flowItemType),
            left: observe(Math.round(targetOffsetX / 15) * 15),
            top: observe(Math.round(targetOffsetY / 15) * 15),
            label: observe(item.itemProps.label || ""),
            height: observe(item.itemProps.height),
            width: observe(item.itemProps.width),
            isEnabledNewConnetion: observe(true),
            icon: observe(item.itemProps.icon),
            id: observe(Utils.getUUID()),
            hasWarning: observe(false),
            isDisabled: observe(false),
            isSelected: observe(true),
            description: observe(""),
            hasError: observe(false),
            connections: observe([]),
        };

        // Are your dropping in a line
        if (connectionTargetId) {

            // Finds the item that owns the target connection
            const itemTarget = items.find(item => item.connections.value.some(conn => conn.id.value === connectionTargetId));
            if (!itemTarget) return;

            // Finds the line target
            const lineTarget = itemTarget?.connections.value.find(line => line.id.value === connectionTargetId);
            if (!lineTarget?.originId) return;

            // New connection to be used
            const newConnection: IConnection = {
                isSelected: observe(false),
                connectionLabel: observe(''),
                id: observe(Utils.getUUID()),
                connectionDescription: observe(''),
                originId: observe(String(newItem.id.value)),
                targetId: observe(lineTarget.targetId.value),
            };

            // Updated target id from lineTarget
            set(lineTarget.targetId, newItem.id.value);

            // Add first connection
            set(newItem.connections, [newConnection]);
        }

        /** Wait for the return to insert the item, if you receive undefined just insert, if different from undefined insert the result of the event if there is something */
        const onDropRes = onDropItem ? onDropItem(item.itemProps.id, String(newItem.id.value), newItem) : undefined;

        let newListItems: IFlowItem[] = [];
        // Add a new item in array state
        setItems(oldItems => {
            newListItems = [...oldItems, !onDropRes ? newItem : onDropRes];
            return newListItems;
        });

        // Add focus to board
        target.focus();

        // Emit changes
        onChangeItems && onChangeItems(newListItems);
    }, [items, onChangeItems, onDropItem, setItems]);

    const handleDelete = useCallback(() => {

        // Delete items
        const newListItems = deleteSelectedItems();

        // Emit changes
        onChangeItems && onChangeItems(newListItems);
    }, [deleteSelectedItems, onChangeItems]);

    const handleKeyDownCtrlD = useCallback((e: React.KeyboardEvent<SVGSVGElement>) => {
        e.preventDefault();
        onKeyDownCtrlD && onKeyDownCtrlD(e);
    }, [onKeyDownCtrlD]);

    return (
        <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} style={{ width: '100%', height: '100%', display: 'flex' }}>
            <Toolbar
                items={toolItems}
                itemWidth={toolbarItemWidth}
                isShow={Boolean(showToolbar)}
                borderColor={toolbarBorderColor}
                backgroundColor={toolbarBackgroundColor}
                onFocus={() => boardRef.current?.focus()}
            />
            <main style={{ flex: 1, overflow: 'auto' }}>
                <BreandCrumbs
                    backgroundColor={breadcrumbBackgroundColor}
                    borderColor={breadcrumbBorderColor}
                    textColor={breadcrumbTextColor}
                    elevationColor={elevationColor}
                    useElevation={useElevation}
                    breadcrumbs={breadcrumbs}
                />
                <EditorPanel
                    ref={boardRef}
                    id={`${id}_SVG`}
                    onFocus={onFocus}
                    dotColor={dotColor}
                    dottedSize={dottedSize}
                    onDropItem={handleDroptem}
                    useElevation={useElevation}
                    onAnyKeyDown={onAnyKeyDown}
                    onContextMenu={onContextMenu}
                    onKeyDownDelete={handleDelete}
                    onKeyDownCtrlC={onKeyDownCtrlC}
                    onKeyDownCtrlV={onKeyDownCtrlV}
                    elevationColor={elevationColor}
                    backgroundType={backgroundType}
                    backgroundColor={backgroundColor}
                    onKeyDownCtrlD={handleKeyDownCtrlD}
                    allowedsInDrop={typesAllowedToDrop}
                    onArrowKeyDown={handleArrowKeyDown}
                    onKeyDownCtrlA={handleSelecteAllFlowItems}
                    onMouseDown={e => selectItemById(undefined, e.ctrlKey)}
                >
                    <Lines
                        parentRef={boardRef}
                        onDropItem={handleDroptem}
                        onContextMenu={onContextMenu}
                    />
                    {items.map((item, index) => (
                        <FlowItem
                            item={item}
                            key={index}
                            parentRef={boardRef}
                            onContextMenu={onContextMenu}
                        />
                    ))}
                    <SelectorArea
                        isDisabled={disableSelection}
                        borderType={selectionBorderType}
                        borderWidth={selectionBorderWidth}
                        borderColor={selectionBorderColor}
                        onCoordsChange={handleOnCoordsChange}
                        backgroundColor={selectionBackgroundColor}
                    />
                    <EmptyFeedback
                        show={items.length === 0}
                        children={childrenWhenItemsEmpty}
                    />
                </EditorPanel>
            </main>
        </div>
    );
}

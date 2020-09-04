import React, { useCallback, useRef } from 'react';
import { DropTargetMonitor } from 'react-dnd';
import { useRecoilCallback } from 'recoil';
import { Utils } from 'code-easy-components';

import { useFlowItems, useConfigs, useSelectItemById, useCopySelecteds, usePasteSelecteds, useFlowItemsConnetionsSelector, useDuplicateSelecteds } from './shared/hooks';
import { FlowItemStore, FlowItemsStore, GetFlowItemsSelector, GetSelectedFlowItemsSelector, FlowLinesStore } from './shared/stores';
import { IFlowEditorBoardProps } from './shared/interfaces/FlowEditorInterfaces';
import { EmptyFeedback } from './components/empty-feedback/EmptyFeedback';
import SelectorArea from './components/area-selector/SelectorArea';
import BreandCrumbs from './components/breadcrumbs/BreandCrumbs';
import EditorPanel from './components/editor-panel/EditorPanel';
import { emitOnChange } from './components/on-change-emitter';
import { ICoords, IFlowItem } from './shared/interfaces';
import { Line } from './components/flow-item/line/Line';
import FlowItem from './components/flow-item/FlowItem';
import Toolbar from './components/tool-bar/ToolBar';

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
    const { onMouseEnter, onMouseLeave, onContextMenu, onDropItem } = props;
    const duplicateSelectedItems = useDuplicateSelecteds();
    const pasteSelectedItems = usePasteSelecteds();
    const lines = useFlowItemsConnetionsSelector();
    const boardRef = useRef<SVGSVGElement>(null);
    const copySelectedItems = useCopySelecteds();
    const selectItemById = useSelectItemById();
    const items = useFlowItems();

    const selectItem = useCallback((item: IFlowItem, coords: ICoords) => {
        const top2 = item.top + (item.height || 0);
        const left2 = item.left + (item.width || 0);

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
                    ? greaterThan0Selected(item.top, top2, coords.startY, coords.endY)
                    : lessThan0Selected(item.top, top2, coords.startY, coords.endY)
            )
            &&
            (
                xGreaterThan0
                    ? greaterThan0Selected(item.left, left2, coords.startX, coords.endX)
                    : lessThan0Selected(item.left, left2, coords.startX, coords.endX)
            )
        );
    }, []);

    const setSelectedFlowItem = useRecoilCallback(({ set, snapshot }) => (coords: ICoords) => {
        items.forEach(async id => {
            const item = await snapshot.getPromise(FlowItemStore(id));
            const mustSelect = selectItem(item, coords);
            if (item.isSelected !== mustSelect) {
                set(FlowItemStore(id), { ...item, isSelected: mustSelect });

                emitOnChange();
            }
        });
    });

    const handleSelecteAllFlowItems = useRecoilCallback(({ set }) => () => {
        items.forEach(id => {
            set(FlowItemStore(String(id)), oldState => ({
                ...oldState,
                isSelected: true
            }))
        });

        emitOnChange();
    }, [items]);

    const handleDelete = useRecoilCallback(({ set, snapshot }) => async () => {
        let itemsCompleteSelecteds = await snapshot.getPromise(GetSelectedFlowItemsSelector);
        const itemsComplete = await snapshot.getPromise(GetFlowItemsSelector);
        let oldLines = await snapshot.getPromise(FlowLinesStore);

        // Remove all lines selecteds
        itemsCompleteSelecteds = itemsCompleteSelecteds.map(itemSelected => {

            const connectionIdToBeRemoved = (itemSelected.connections || [])
                .filter(connection => connection.isSelected)
                .map(connection => connection.id);

            oldLines = [
                ...oldLines.filter(oldLine => !connectionIdToBeRemoved.includes(oldLine.id))
            ];


            const res = {
                ...itemSelected,
                connections: (itemSelected.connections || []).filter(connection => !connection.isSelected),
            };

            // Save in the state
            set(FlowItemStore(String(itemSelected.id)), res);

            return res;
        });

        // Remove all dependencies with the selecteds items
        itemsCompleteSelecteds.forEach(itemSelected => {
            if (itemSelected.isSelected) {
                itemsComplete.forEach(dependentItem => {
                    const hasDependencies = (dependentItem.connections || []).some(connection => (connection.targetId === itemSelected.id));

                    // Remove old connections
                    if (hasDependencies) {
                        const connectionsIdToBeRemoved = (dependentItem.connections || [])
                            .filter(connection => connection.targetId === itemSelected.id)
                            .map(connection => connection.id);

                        oldLines = [
                            ...oldLines.filter(oldLine => !connectionsIdToBeRemoved.includes(oldLine.id) && !(oldLine.originId === itemSelected.id))
                        ];


                        dependentItem = {
                            ...dependentItem,
                            connections: [
                                ...(dependentItem.connections || []).filter(connection => connection.targetId !== itemSelected.id)
                            ]
                        };

                        // Save in the state
                        set(FlowItemStore(String(dependentItem.id)), dependentItem);
                    }
                });
            }
        });

        // Save a new list
        set(FlowItemsStore, itemsComplete.filter(item => !item.isSelected).map(item => String(item.id)));

        // Update lines
        set(FlowLinesStore, oldLines);

        emitOnChange();
    });

    const handleArrowKeyDown = useRecoilCallback(({ set, snapshot }) => async (direction: "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight") => {
        const items = await snapshot.getPromise(GetFlowItemsSelector);

        items.forEach(item => {
            if (item.isSelected) {
                switch (direction) {
                    case 'ArrowDown':
                        item = {
                            ...item,
                            top: item.top + 15
                        };
                        break;
                    case 'ArrowUp':
                        item = {
                            ...item,
                            top: item.top - 15
                        };
                        break;
                    case 'ArrowLeft':
                        item = {
                            ...item,
                            left: item.left - 15
                        };
                        break;
                    case 'ArrowRight':
                        item = {
                            ...item,
                            left: item.left + 15
                        };
                        break;
                }
                set(FlowItemStore(String(item.id)), item);
            }
        });

        emitOnChange();
    });

    /** Essa função é executada sempre um item(aceito como item soltável) é sortado no painel */
    const handleDroptem = useRecoilCallback(({ snapshot, set }) => async (item: any, monitor: DropTargetMonitor, connectionTargetId?: string | undefined) => {

        const target = boardRef.current;
        const draggedOffSet = monitor.getClientOffset();
        if (!target || !draggedOffSet) return;


        // Deselect all items selecteds
        (await snapshot.getPromise(GetFlowItemsSelector))
            .forEach(itemComplete => {
                if (itemComplete.id && itemComplete.isSelected) {
                    set(FlowItemStore(itemComplete.id), { ...itemComplete, isSelected: false })
                }
            });

        const targetSize = target.getBoundingClientRect();
        const targetOffsetY = (draggedOffSet.y + (targetSize.top - targetSize.top - targetSize.top) - 25);
        const targetOffsetX = (draggedOffSet.x + (targetSize.left - targetSize.left - targetSize.left) - 25);

        let newItem: IFlowItem = {
            flowItemType: item.itemProps.flowItemType,
            left: Math.round(targetOffsetX / 15) * 15,
            top: Math.round(targetOffsetY / 15) * 15,
            itemType: item.itemProps.itemType,
            id: Utils.getUUID().toString(),
            height: item.itemProps.height,
            width: item.itemProps.width,
            label: item.itemProps.label,
            icon: item.itemProps.icon,
            isSelected: true,
        };

        // Are your dropping in a line
        if (connectionTargetId) {
            const lineTarget = (await snapshot.getPromise(FlowLinesStore)).find(line => line.id === connectionTargetId);

            if (!lineTarget?.originId) return;

            // New connection to be used
            const newConnection = {
                id: Utils.getUUID(),
                originId: String(newItem.id),
                targetId: String(lineTarget.targetId),
            };

            // Update lines and added the new line
            set(FlowLinesStore, oldLines => {
                return [
                    newConnection,
                    ...oldLines.map(line => {
                        if (line.id !== lineTarget.id) return line;
                        return {
                            ...line,
                            targetId: String(newItem.id)
                        };
                    })
                ]
            });

            // Updates the source item that was previously linked to the new item as a destination
            set(FlowItemStore(lineTarget.originId), oldItemState => {
                return {
                    ...oldItemState,
                    connections: [
                        ...(oldItemState.connections || []).map(connection => {
                            if (connection.id !== lineTarget.id) return connection;
                            return {
                                ...connection,
                                targetId: String(newItem.id)
                            };
                        })
                    ]
                }
            });

            // Add first connection
            newItem = {
                ...newItem,
                connections: [
                    {
                        ...newConnection,
                        isSelected: false,
                    }
                ]
            };
        }

        /** Wait for the return to insert the item, if you receive undefined just insert, if different from undefined insert the result of the event if there is something */
        const onDropRes = onDropItem ? onDropItem(item.id, String(newItem.id), newItem) : undefined;
        if (!onDropRes) {

            // Add a new item in array state
            set(FlowItemsStore, [...items, String(newItem.id)]);

            // Creates the state for the item
            set(FlowItemStore(String(newItem.id)), newItem);

            emitOnChange();
        } else if (onDropRes) {

            // Add a new item in array state
            set(FlowItemsStore, [...items, String(onDropRes.id)]);

            // Creates the state for the item
            set(FlowItemStore(String(onDropRes.id)), onDropRes);

            emitOnChange();
        }

        target.focus();
    });

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex' }} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <Toolbar
                itemsLogica={toolItems}
                itemWidth={toolbarItemWidth}
                borderColor={toolbarBorderColor}
                backgroundColor={toolbarBackgroundColor}
                isShow={(showToolbar === undefined ? true : showToolbar) && (toolItems.length > 0)}
            />
            <main key={id} style={{ flex: 1, overflow: 'auto' }}>
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
                    dotColor={dotColor}
                    dottedSize={dottedSize}
                    onDropItem={handleDroptem}
                    useElevation={useElevation}
                    onContextMenu={onContextMenu}
                    onKeyDownDelete={handleDelete}
                    elevationColor={elevationColor}
                    backgroundType={backgroundType}
                    backgroundColor={backgroundColor}
                    onKeyDownCtrlC={copySelectedItems}
                    onKeyDownCtrlV={pasteSelectedItems}
                    allowedsInDrop={typesAllowedToDrop}
                    onArrowKeyDown={handleArrowKeyDown}
                    onKeyDownCtrlA={handleSelecteAllFlowItems}
                    onMouseDown={e => selectItemById(undefined, e.ctrlKey)}
                    onKeyDownCtrlD={e => {
                        e.preventDefault();
                        duplicateSelectedItems();
                    }}
                >
                    {lines.map(({ id, originId, targetId }, index) => <Line
                        id={id}
                        key={index}
                        originId={originId}
                        targetId={targetId}
                        onDropItem={handleDroptem}
                        onContextMenu={onContextMenu}
                        allowedsInDrop={typesAllowedToDrop}
                    />)}
                    {items.map(id => (
                        <FlowItem
                            id={id}
                            key={id}
                            onContextMenu={onContextMenu}
                        />
                    ))}
                    <SelectorArea
                        isDisabled={disableSelection}
                        onSelectionEnd={emitOnChange}
                        borderType={selectionBorderType}
                        borderWidth={selectionBorderWidth}
                        borderColor={selectionBorderColor}
                        onCoordsChange={setSelectedFlowItem}
                        backgroundColor={selectionBackgroundColor}
                    />
                    <EmptyFeedback show={items.length === 0} children={childrenWhenItemsEmpty} />
                </EditorPanel>
            </main>
        </div>
    );
}

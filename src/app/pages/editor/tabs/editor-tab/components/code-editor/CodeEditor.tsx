import React, { useState } from 'react';
// import BottonStatusBar from '../../../../components/botton-status-bar/BottonStatusBar';
import { ConnectDropTarget, DropTargetMonitor, XYCoord, useDrop } from 'react-dnd';
import { ItemToDrag, ItemTypes } from './components/item-drag/ItemDrag';
import update from 'immutability-helper';
import { Line } from '../../../../../../shared/components/lines/Line';
import FluxoList from './enuns/FluxoList';
import { Utils } from '../../../../../../shared/services/Utils';


const styles: React.CSSProperties = {
    width: '100%',
    height: '100%',
    position: 'relative',
}

export interface CodeEditorState {
    fluxoList: FluxoList;
}

export interface CodeEditorProps {
    connectDropTarget: ConnectDropTarget
}

export const CodeEditor = () => {
    const [fluxoList, setFluxoList] = useState<FluxoList>({
        1: { antecessorKey: "", sucessorKey: 2, isHaveSucessor: true, isHaveAntecessor: false, top: 100, left: 40, width: 80, height: 80, title: 'Drag me 1' },
        2: { antecessorKey: 1, sucessorKey: 3, isHaveSucessor: true, isHaveAntecessor: true, top: 200, left: 40, width: 80, height: 80, title: 'Drag me 2' },
        3: { antecessorKey: 2, sucessorKey: 4, isHaveSucessor: true, isHaveAntecessor: true, top: 300, left: 40, width: 80, height: 80, title: 'Drag me 3' },
        4: { antecessorKey: 3, sucessorKey: "", isHaveSucessor: false, isHaveAntecessor: true, top: 400, left: 40, width: 80, height: 80, title: 'Drag me 4' },
    });

    const positionChange = (position: any) => {
        const top = position.top;
        const left = position.left;

        setFluxoList(
            update(fluxoList, {
                [position.itemId]: {
                    $merge: { left, top },
                },
            }),
        );
    }

    const [, drop] = useDrop({
        accept: ItemTypes.BOX,
        drop(item: any, monitor: DropTargetMonitor) {
            if (!item) return;

            const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
            const left = Math.round((item.itemDetail.left || 0) + delta.x - 150);
            const top = Math.round((item.itemDetail.top || 0) + delta.y - 40);

            if (!item.itemDetail.id) {
                let newKey;
                let isExistentItem;

                // Vai encontrar uma key que não estaja em uso.
                do {
                    newKey = Utils.getRandomKey(10, 1000);
                    isExistentItem = fluxoList[newKey];
                } while (isExistentItem);

                if (!isExistentItem) {
                    fluxoList[newKey] = {
                        antecessorKey: "",
                        isHaveAntecessor: false,
                        isHaveSucessor: false,
                        sucessorKey: "",
                        title: item.itemDetail.title + newKey,
                        width: 80,
                        height: 80,
                        left: left,
                        top: top,
                    }
                    setFluxoList({});

                    item.itemDetail.id = newKey;
                    item.itemDetail.title = item.title + newKey;
                }
            }

            setFluxoList(
                update(fluxoList, {
                    [item.itemDetail.id]: {
                        $merge: { left, top },
                    },
                }),
            )
        },

    });

    return (
        <div id="CODEEDITOR" ref={drop} style={styles}>
            <svg style={{ width: '100%', height: '100%' }}>
                {Object.keys(fluxoList).map(key => {
                    const { left, top, width, height, isHaveSucessor, sucessorKey } = fluxoList[key];

                    let top2: number = 0;
                    let left2: number = 0;
                    let width2: number = 0;
                    try {
                        top2 = fluxoList[sucessorKey].top;
                        left2 = fluxoList[sucessorKey].left;
                        width2 = fluxoList[sucessorKey].width;
                    } catch (e) { /* console.error("[Erro mapeado]: " + e); */ }

                    return (
                        isHaveSucessor
                            ? <Line
                                key={key}
                                top1={top + height - 15}
                                top2={top2 - 5}

                                left1={left + (width / 2)}
                                left2={left2 + (width2 / 2)}

                                color="gray"
                            />
                            : undefined
                    );
                })}
            </svg>

            {Object.keys(fluxoList).map(key => {
                const { left, top, title } = fluxoList[key];
                return <ItemToDrag key={key} id={key} left={left} top={top} title={title} outputPosition={positionChange}>{title}</ItemToDrag>;
            })}
        </div>
    )
}

import React, { useState, useRef } from 'react';
import { DropTargetMonitor, XYCoord, useDrop } from 'react-dnd';
import update from 'immutability-helper';
import FluxoList, { FluxoItemTypes } from './enuns/FluxoList';
import { Line } from '../../../../../../shared/components/lines/Line';
import { Utils } from '../../../../../../shared/services/Utils';
import { ItemToDrag } from './components/item-drag/ItemDrag';
import CodeEditorContext from '../../../../shared/services/code-editor-context/CodeEditorContext';

export const CodeEditor = () => {

    // Dados apenas para mock.
    const [fluxoList, setFluxoList] = useState<FluxoList>({
        1: { key: 1, fluxoItemTypes: FluxoItemTypes.flowItem, antecessorKey: "", sucessorKey: 2, isHaveSucessor: true, isHaveAntecessor: false, top: 100, left: 40, width: 80, height: 80, title: 'Drag me 1' },
        2: { key: 2, fluxoItemTypes: FluxoItemTypes.flowItem, antecessorKey: 1, sucessorKey: 3, isHaveSucessor: true, isHaveAntecessor: true, top: 200, left: 40, width: 80, height: 80, title: 'Drag me 2' },
        3: { key: 3, fluxoItemTypes: FluxoItemTypes.flowItem, antecessorKey: 2, sucessorKey: 4, isHaveSucessor: true, isHaveAntecessor: true, top: 300, left: 40, width: 80, height: 80, title: 'Drag me 3' },
        4: { key: 4, fluxoItemTypes: FluxoItemTypes.flowItem, antecessorKey: 3, sucessorKey: "", isHaveSucessor: false, isHaveAntecessor: true, top: 400, left: 40, width: 80, height: 80, title: 'Drag me 4' },
    });

    // Muda a posição do item de fluxo.
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

    // Permite ser possível soltar im item no fluxo.
    const [, drop] = useDrop({
        accept: FluxoItemTypes.flowItem,
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
                        fluxoItemTypes: FluxoItemTypes.flowItem,
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

    // Permite referenciar um item deste componente a partir de outro.
    const ref = useRef<HTMLInputElement>(null);

    // Agrupa as referencias do drop com as da ref.
    drop(ref);

    // Muda o sucessor do item que está sendo recebido por parâmetro.
    const onSucessorChange = (itemId: string, sucessorKey: string) => {
        const isHaveSucessor = true;

        setFluxoList(
            update(fluxoList, {
                [itemId]: {
                    $merge: { sucessorKey, isHaveSucessor },
                },
            }),
        );
    }

    return (
        <CodeEditorContext.Consumer>
            {({ application }) => (
                <div ref={ref} style={{ width: '100%' }}>
                    <svg style={{ width: '100%' }}>
                        {Object.keys(fluxoList).map(key => {
                            const { left, top, width, height, isHaveSucessor, sucessorKey } = fluxoList[key];

                            let top2 = 0;
                            let left2 = 0;
                            let width2 = 0;
                            try {
                                top2 = fluxoList[sucessorKey].top;
                                left2 = fluxoList[sucessorKey].left;
                                width2 = fluxoList[sucessorKey].width;
                            } catch (e) { }

                            return <Line
                                id={key}
                                key={key}
                                color="gray"
                                top2={top2 - 5}
                                top1={top + height - 15}
                                left1={left + (width / 2)}
                                left2={left2 + (width2 / 2)}
                                isHaveSucessor={isHaveSucessor}
                                onSucessorChange={onSucessorChange}
                                refItemPai={ref}
                            />;
                        })}

                        {
                            /* Object.keys(fluxoList).map(key => {
                                const { left, top, title, width, height } = fluxoList[key];
                                return <ItemToDrag
                                    key={key}
                                    id={key}
                                    left={left}
                                    top={top}
                                    width={width}
                                    height={height}
                                    title={title}
                                    refItemPai={ref}
                                    outputPosition={positionChange}
                                >{title}</ItemToDrag>;
                            }) */
                            
                            application.actions.items.map(({ left, top, title, width, height, key }) => {
                                // const { left, top, title, width, height, key } = element;
                                return <ItemToDrag
                                    key={key}
                                    id={key}
                                    left={left}
                                    top={top}
                                    width={width}
                                    height={height}
                                    title={title}
                                    refItemPai={ref}
                                    outputPosition={positionChange}
                                >{title}</ItemToDrag>;
                            })
                        }
                    </svg>
                </div>
            )}
        </CodeEditorContext.Consumer>
    )
}

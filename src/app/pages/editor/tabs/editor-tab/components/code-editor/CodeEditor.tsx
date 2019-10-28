import React, { useContext, useRef } from 'react';
import { DropTargetMonitor, XYCoord, useDrop } from 'react-dnd';
import { Line } from '../../../../../../shared/components/lines/Line';
import { Utils } from '../../../../../../shared/services/Utils';
import { ItemToDrag } from './components/item-drag/ItemDrag';
import CodeEditorContext from '../../../../shared/services/code-editor-context/CodeEditorContext';
import FluxoItemTypes from './enuns/FluxoList';

export const CodeEditor = () => {
    const codeEditorContext = useContext(CodeEditorContext);
    const application = codeEditorContext.application;

    let fluxoList: any = application.routers.items;

    const changeFluxoState = () => {
        codeEditorContext.changeRouterFlowItem(fluxoList);
    }

    // Muda a posição do item de fluxo.
    const positionChange = (position: any) => {
        const top = position.top;
        const left = position.left;

        fluxoList[fluxoList.findIndex((item: any) => { if (item.key === position.itemId) return item; return; })].top = top;
        fluxoList[fluxoList.findIndex((item: any) => { if (item.key === position.itemId) return item; return; })].left = left;

        changeFluxoState();
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
                    fluxoList.push({
                        key: newKey,
                        fluxoItemTypes: FluxoItemTypes.flowItem,
                        antecessorKey: 0,
                        isHaveAntecessor: false,
                        isHaveSucessor: false,
                        sucessorKey: 0,
                        title: item.itemDetail.title + newKey,
                        width: 80,
                        height: 80,
                        left: left,
                        top: top,
                    });

                    changeFluxoState();

                    item.itemDetail.id = newKey;
                    item.itemDetail.title = item.title + newKey;
                }
            }

            /* setFluxoList(
                update(fluxoList, {
                    [item.itemDetail.id]: {
                        $merge: { left, top },
                    },
                }),
            ) */
        },

    });

    // Permite referenciar um item deste componente a partir de outro.
    const ref = useRef<HTMLInputElement>(null);

    // Agrupa as referencias do drop com as da ref.
    drop(ref);

    // Muda o sucessor do item que está sendo recebido por parâmetro.
    const onSucessorChange = (itemId: string, sucessorKey: string) => {
        const isHaveSucessor = true;

        fluxoList[fluxoList.findIndex((item: any) => { if (item.key === itemId) return item; return; })].sucessorKey = sucessorKey;
        fluxoList[fluxoList.findIndex((item: any) => { if (item.key === itemId) return item; return; })].isHaveSucessor = isHaveSucessor;

        changeFluxoState();
    }

    return (
        <div ref={ref} style={{ width: '100%' }}>
            <svg style={{ width: '100%' }}>
                {fluxoList.map((item: any) => {
                    const { key, left, top, width, height, isHaveSucessor, sucessorKey } = item;

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

                {fluxoList.map((item: any) => {
                    const { left, top, title, width, height, key } = item;

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
                })}
            </svg>
        </div>
    )
}

import React, { useContext, useRef } from 'react';
import { DropTargetMonitor, XYCoord, useDrop } from 'react-dnd';
import { Line } from '../../../../../../shared/components/lines/Line';
import { Utils } from '../../../../../../shared/services/Utils';
import { ItemToDrag } from './components/item-drag/ItemDrag';
import CodeEditorContext from '../../../../shared/services/code-editor-context/CodeEditorContext';
import FluxoItemTypes from './enuns/FluxoList';
import { FlowItem, ListComponent } from '../../../../../../shared/interfaces/Aplication';

export const CodeEditor = () => {
    const codeEditorContext = useContext(CodeEditorContext);
    const litComponent = codeEditorContext.application.routers.litComponent;
    const indexEditando: number = litComponent.findIndex((item: ListComponent) => { if (item.isEditando === true) return item; else return undefined; });

    let fluxoList: FlowItem[] = litComponent[indexEditando].itens;

    const changeFluxoState = () => {
        codeEditorContext.changeRouterFlowItem(indexEditando, fluxoList);
    }

    // Muda a posição do item de fluxo. Função passada por parâmetro para o itemDrag.
    const positionChange = (position: any) => {
        const top = position.top;
        const left = position.left;

        fluxoList[fluxoList.findIndex((item: any) => { if (item.key === position.itemId) return item; return undefined; })].top = top;
        fluxoList[fluxoList.findIndex((item: any) => { if (item.key === position.itemId) return item; return undefined; })].left = left;

        changeFluxoState();
    }

    // Permite ser possível soltar im item no fluxo.
    const [, drop] = useDrop({
        accept: FluxoItemTypes.flowItem,
        drop(item: any, monitor: DropTargetMonitor) {
            if (item.itemDetail.id) return;

            const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
            const left = Math.round((item.itemDetail.left || 0) + delta.x - 150);
            const top = Math.round((item.itemDetail.top || 0) + delta.y - 40);

            let newKey: number;
            let isExistentItem;

            // Vai encontrar uma key que não estaja em uso.
            do {
                newKey = Utils.getRandomKey(10, 1000);
                // eslint-disable-next-line
                isExistentItem = fluxoList[fluxoList.findIndex((item: FlowItem) => { if (item.key === newKey) return item; else return undefined; })];
            } while (isExistentItem);

            if (!isExistentItem) {
                fluxoList.push(new FlowItem({
                    key: newKey,
                    title: item.itemDetail.title + newKey,
                    top: top,
                    left: left,
                    width: 80,
                    height: 80,
                    fluxoItemTypes: FluxoItemTypes.flowItem,
                    isHaveAntecessor: false,
                    isHaveSucessor: false,
                }));
                item.itemDetail.id = newKey;
                item.itemDetail.title = item.title + newKey;

                changeFluxoState();
            }

        },

    });

    // Permite referenciar um item deste componente a partir de outro.
    const ref = useRef<HTMLInputElement>(null);

    // Agrupa as referencias do drop com as da ref.
    drop(ref);

    // Muda o sucessor do item que está sendo recebido por parâmetro.
    const onSucessorChange = (itemId: number, sucessorKey: string) => {
        let itemCurrent: FlowItem = fluxoList[fluxoList.findIndex((item: FlowItem) => { if (item.key === itemId) return item; else return undefined; })];
        let itemSucessor: FlowItem = fluxoList[fluxoList.findIndex((item: FlowItem) => { if (item.key === Number(sucessorKey)) return item; else return undefined; })];

        // Propriedades do sucessor
        itemCurrent.sucessorKey = sucessorKey;
        itemCurrent.isHaveSucessor = true;

        // Propriedades do antecessor
        itemSucessor.antecessorKey = itemId;
        itemSucessor.isHaveAntecessor = true;

        // OBS: O update no fluxo é feito pela referencia entre variáveis js.

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
                        let itemSucessor: FlowItem = fluxoList[fluxoList.findIndex((item: FlowItem) => { if (item.key === Number(sucessorKey)) return item; else return undefined; })];

                        top2 = itemSucessor.top;
                        left2 = itemSucessor.left;
                        width2 = itemSucessor.width;

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

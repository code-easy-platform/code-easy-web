import React, { useContext, useRef } from 'react';
import { DropTargetMonitor, XYCoord, useDrop } from 'react-dnd';
import { Line } from '../../../../../../shared/components/lines/Line';
import { Utils } from '../../../../../../shared/services/Utils';
import { ItemToDrag } from './components/item-drag/ItemDrag';
import CodeEditorContext from '../../../../../../shared/services/contexts/CodeEditorContext';
import FluxoItemTypes from './enuns/FluxoList';
import { Component, Tab, ComponentConfigs, EMPTY_COMPONENT } from '../../../../../../shared/interfaces/Aplication';
import ComponentType from '../../../../../../shared/enuns/ComponentType';

export const CodeEditor = () => {
    const codeEditorContext = useContext(CodeEditorContext);
    const tabIndex: number = codeEditorContext.project.tabs.findIndex((tab: Tab) => { return tab.configs.isEditando === true ? tab : undefined });
    let listItens: Component[] = [];

    if (tabIndex >= 0) // Caso não exista uma tab selecionada.
        listItens = codeEditorContext.project.tabs[tabIndex].itens;

    // Encontra o item que está sendo selecionado para ser editado!
    const itemEditando: Component = listItens.find((item: Component) => {
        if (
            (
                item.configs.type === ComponentType.globalAction ||
                item.configs.type === ComponentType.localAction
            ) && item.configs.isEditando === true
        ) return item; else return undefined;
    }) || EMPTY_COMPONENT;

    // Verifica se estou esditando alguma coisa.
    const isEditandoSomething = listItens.length > -1 && tabIndex >= 0;

    let fluxoList: Component[] = listItens.filter((item: Component) => { return item.configs.type === ComponentType.flowItem && item.paiId === itemEditando.id });



    const changeComponentState = (id: number, component: Component) => {
        if (isEditandoSomething)
            codeEditorContext.changeComponentState(id, tabIndex, component);
    }

    // Muda a posição do item de fluxo. Função passada por parâmetro para o itemDrag.
    const positionChange = (position: any) => { // Position recebe: { itemId, top, left }
        const top = position.top;
        const left = position.left;

        let component: Component = fluxoList[fluxoList.findIndex((item: any) => { if (item.id === position.itemId) return item; return undefined; })];

        component.top = top;
        component.left = left;

        changeComponentState(position.itemId, component);
    }

    // Permite ser possível soltar im item no fluxo.
    const [, drop] = useDrop({
        accept: FluxoItemTypes.flowItem,
        drop(item: any, monitor: DropTargetMonitor) {
            if (item.itemDetail.id) return;

            const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
            const left = Math.round((item.itemDetail.left || 0) + delta.x - 150);
            const top = Math.round((item.itemDetail.top || 0) + delta.y - 40);

            let newId: number;
            let isExistentItem;

            // Vai encontrar uma id que não estaja em uso.
            do {
                newId = Utils.getRandomId(10, 1000);
                // eslint-disable-next-line
                isExistentItem = fluxoList[fluxoList.findIndex((item: Component) => { if (item.id === newId) return item; else return undefined; })];
            } while (isExistentItem);

            if (!isExistentItem) {
                codeEditorContext
                    .addComponent(tabIndex, new Component({
                        id: newId,
                        title: item.itemDetail.title + newId,
                        top: top,
                        left: left,
                        width: 80,
                        height: 80,
                        fluxoItemTypes: FluxoItemTypes.flowItem,
                        isHaveAntecessor: false,
                        isHaveSucessor: false,
                        antecessorId: 0,
                        sucessorId: 0,
                        paiId: itemEditando.id,
                        configs: new ComponentConfigs({ name: "", description: "", type: ComponentType.flowItem, isExpanded: false, isEditando: false }),
                    }));
                item.itemDetail.id = newId;
                item.itemDetail.title = item.title + newId;
            }

        },

    });

    // Permite referenciar um item deste componente a partir de outro.
    const ref = useRef<HTMLInputElement>(null);

    // Agrupa as referencias do drop com as da ref.
    drop(ref);

    // Muda o sucessor do item que está sendo recebido por parâmetro.
    const onSucessorChange = (itemId: number, sucessorId: string) => {
        let itemCurrent: Component = fluxoList[fluxoList.findIndex((item: Component) => { if (item.id === itemId) return item; else return undefined; })];
        let itemSucessor: Component = fluxoList[fluxoList.findIndex((item: Component) => { if (item.id === Number(sucessorId)) return item; else return undefined; })];

        // Propriedades do sucessor
        itemCurrent.sucessorId = Number(sucessorId);
        itemCurrent.isHaveSucessor = true;

        // Propriedades do antecessor
        itemSucessor.sucessorId = itemId;
        itemSucessor.isHaveAntecessor = true;

        // OBS: O update no fluxo é feito pela referencia entre variáveis js.

        changeComponentState(itemCurrent.id, itemCurrent);
        changeComponentState(itemSucessor.id, itemSucessor);
    }

    return (
        isEditandoSomething
            ? <div ref={ref} style={{ width: '100%' }}>
                <svg style={{ width: '100%' }}>
                    {fluxoList.map((item: any) => {
                        const { id, left, top, width, height, isHaveSucessor, sucessorId } = item;

                        let top2 = 0;
                        let left2 = 0;
                        let width2 = 0;
                        try {
                            let itemSucessor: Component = fluxoList[fluxoList.findIndex((item: Component) => { if (item.id === Number(sucessorId)) return item; else return undefined; })];

                            top2 = itemSucessor.top;
                            left2 = itemSucessor.left;
                            width2 = itemSucessor.width;

                        } catch (e) { }

                        return <Line
                            id={id}
                            key={id}
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
                        const { left, top, title, width, height, id } = item;

                        return <ItemToDrag
                            id={id}
                            key={id}
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
            : <div></div>
    )
}

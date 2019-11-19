import React, { useContext, useRef } from 'react';
import { DropTargetMonitor, XYCoord, useDrop } from 'react-dnd';

import { Component, Tab, EMPTY_COMPONENT } from '../../../../../../shared/interfaces/Aplication';
import { CodeEditorContext } from '../../../../../../shared/services/contexts/CodeEditorContext';
import { ComponentType } from '../../../../../../shared/enuns/ComponentType';
import { ItemToDrag } from './components/item-drag/ItemDrag';
import FluxoComponentTypes from './enuns/FluxoList';

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
            codeEditorContext.changeComponentState(id, component);
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
        accept: [
            ComponentType.outputVariable,
            ComponentType.inputVariable,
            ComponentType.localVariable,
            ComponentType.globalAction,
            ComponentType.localAction,
            ComponentType.flowItem,
            ComponentType.rota,
            FluxoComponentTypes.flowItem,
        ],
        drop(item: any, monitor: DropTargetMonitor) {
            if (item.itemDetail.id) return;

            const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
            const left = Math.round((item.itemDetail.left || 0) + delta.x - 150);
            const top = Math.round((item.itemDetail.top || 0) + delta.y - 40);

            const newComponent: Component = codeEditorContext.addComponent(itemEditando.id, item.itemDetail.title, ComponentType.flowItem, 80, 80, top, left);

            item.itemDetail.id = newComponent.id;
            item.itemDetail.title = item.title + newComponent.id;
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

                    {fluxoList.map((item: Component) => {
                        const { id, title, left, top, width, height, sucessorId  } = item;

                        let top2 = 0;
                        let left2 = 0;
                        let width2 = 0;
                        try {
                            let itemSucessor: Component = fluxoList[fluxoList.findIndex((item: Component) => { if (item.id === Number(sucessorId)) return item; else return undefined; })];

                            top2 = itemSucessor.top;
                            left2 = itemSucessor.left;
                            width2 = itemSucessor.width;

                        } catch (e) { }

                        return <ItemToDrag
                            id={id}
                            top={top}
                            left={left}
                            title={title}
                            width={width}
                            height={height}
                            refItemPai={ref}
                            lineTargetLeft={left2 + (width2 / 2)}
                            lineTargetTop={top2 - 5}
                            onSucessorChange={onSucessorChange}
                            outputPosition={positionChange}
                        >{title}</ItemToDrag>;
                    })}

                </svg>
            </div>
            : <div></div>
    )
}

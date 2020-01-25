import React, { useState, useRef, FC } from 'react';
import { useDrop, DropTargetMonitor, DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { ItemToDrag } from './components/item-drag/ItemDrag';
import { ItemType, FlowItem } from './models/ItemFluxo';
import { Line } from './components/lines/Line';
import { Utils } from './shared/Utils';
import { Toolbar } from './components/tool-bar/ToolBar';
import { SelectorArea } from './components/selector/SelectorArea';

/**
 * Propriedades aceitas pelo editor.
 */
export interface CodeEditorProps {

    /** boolean - Usado para exibir ou não a toolbox cons itens de lógica. */
    isShowToolbar: boolean,

    /** FlowItem[] - Usado para exibir os itens na toolbox do editor. */
    toolItens?: FlowItem[],

    /** FlowItem[] - Usado para exibir os itens na tela do editor */
    itens: FlowItem[],

    /** Function - Usada para emitir através do output o fluxo atualidado, acontece a cada mudança de estado dos itens de fluxo. */
    onChangeItens(itens: FlowItem[]): any
}

/**
 * Editor de lógica de programação através de fluxo simples.
 * 
 * @param itens FlowItem[] - Usado para exibir os itens na tela do editor.
 * @param toolItens FlowItem[] - Usado para exibir os itens na toolbox do editor.
 * @param onChangeItens Function - Usada para emitir através do output o fluxo atualidado, acontece a cada mudança de estado dos itens de fluxo.
 * @param isShowToolbar boolean - Usado para exibir ou não a toolbox cons itens de lógica.
 */
export const FlowEditor: FC<CodeEditorProps> = ({ itens = [], toolItens = [], onChangeItens = () => { }, isShowToolbar = false }) => {
    return (
        <DndProvider backend={HTML5Backend}>
            <CodeEditor itens={itens} toolItens={toolItens} onChangeItens={onChangeItens} isShowToolbar={isShowToolbar} />
        </DndProvider>
    );
}

/** Define quais itens são aceitos no drop do start. */
const acceptedInDrop: ItemType[] = [ItemType.START, ItemType.ACTION, ItemType.IF, ItemType.FOREACH, ItemType.SWITCH, ItemType.ASSIGN, ItemType.END];

/** Usada para validar houve mudanças no estados dos itens e impedir a realização outputs desnecessários. */
let backupFlow: string = "";

/** Editor do fluxo. */
const CodeEditor: React.FC<CodeEditorProps> = ({ itens = [], toolItens = [], onChangeItens = () => { }, isShowToolbar = false }) => {

    /** Referencia o svg onde está todos os itens de fluxo. */
    const svgRef = useRef<any>(null);

    /** Controla o estado do editor inteiro. */
    const [state, setState] = useState({
        flowItens: itens,
        svgSize: { svgHeight: 0, svgWidth: 0 },
        selectionProps: {
            isMouseDown: false,
            runtimeStartLeft: 0,
            runtimeStartTop: 0,
            startLeft: 0,
            startTop: 0,
            endTop: 10,
            endLeft: 0
        }
    });

    /** Usada para emitir os itens para fora do componente. */
    const onChangeFlow = () => {
        if (backupFlow !== JSON.stringify(state.flowItens)) {

            backupFlow = JSON.stringify(state.flowItens); // Salva para fazer as comparações posteriores.
            onChangeItens(state.flowItens);

        }
    }

    /** Não precisou do setState por que está no fluxo de render. */
    state.svgSize = {
        svgHeight: (state.flowItens.length !== 0 ? (state.flowItens.sort((a, b) => b.top - a.top)[0].top + 200) : 0),
        svgWidth: (state.flowItens.length !== 0 ? (state.flowItens.sort((a, b) => b.left - a.left)[0].left + 200) : 0),
    };

    /** Usado para que seja possível o drop de itens no editor. */
    const [, dropRef] = useDrop({
        accept: acceptedInDrop,
        drop(item: any, monitor: DropTargetMonitor) {

            const target: any = svgRef.current;
            const targetSize: any = target.getBoundingClientRect();
            const draggedOffSet: any = monitor.getClientOffset();
            const targetOffsetY: number = ((draggedOffSet.y) + (targetSize.top - targetSize.top - targetSize.top) - 25);
            const targetOffsetX: number = ((draggedOffSet.x) + (targetSize.left - targetSize.left - targetSize.left) - 25);

            state.flowItens.push(new FlowItem({
                id: Utils.getRandomId(),
                itemType: item.itemProps.itemType,
                nome: item.itemProps.title,
                isSelecionado: true,
                left: targetOffsetX,
                top: targetOffsetY,
                sucessor: [],
                height: 50,
                width: 50,
            }));

            setState({ ...state, flowItens: state.flowItens });

            svgRef.current.focus();

            onChangeFlow();
        },
    });

    /** Agrupa as referências do drop com as da ref. */
    dropRef(svgRef);

    /** Depois que um elemento já está na tela, esta função muda a posição dele! */
    const positionChange = (itemId: number, positionTop: number, positionLeft: number, event?: any) => {
        let component = state.flowItens[state.flowItens.findIndex((item: any) => { if (item.id === itemId) return item; return undefined; })];

        // Impede que haje erros se o componente não for encontrado.
        if (!component) return;

        if (component.top > 0 || component.top < positionTop) {
            if (event ? !event.altKey : true)
                component.top = component.top + (positionTop - component.top);
            else
                component.top = positionTop % 10 === 0 ? positionTop : component.top;
        }

        if (component.left > 0 || component.left < positionLeft) {
            if (event ? !event.altKey : true)
                component.left = component.left + (positionLeft - component.left);
            else
                component.left = positionLeft % 10 === 0 ? positionLeft : component.left;
        }

        state.svgSize.svgHeight = state.flowItens.sort((a, b) => b.top - a.top)[0].top + 200;
        state.svgSize.svgWidth = state.flowItens.sort((a, b) => b.left - a.left)[0].left + 200;

        setState({
            ...state,
            flowItens: state.flowItens,
            svgSize: state.svgSize
        });

        onChangeFlow();
    }

    /** 
     * Usado para mudar o "sucessorId" de um elemento.
     * Sucessor é usado para indicar onde o apontamento deve estar.
     * 
     * @param branchIndex indica qual a branch do item para liga no item sucessor
     */
    const onSucessorChange = (itemId: number, sucessorId: string, branchIndex: number = 0) => {

        const itemCurrentIndex = state.flowItens.findIndex((item: FlowItem) => { if (item.id === Number(itemId)) return item; else return undefined; });
        let itemCurrent: FlowItem = state.flowItens[itemCurrentIndex];

        // Se tentar ligar um item nele mesmo deve ser perdida a ligação com qualquer elemento anterior desta branch específica.
        if (Number(itemId) === Number(sucessorId)) {
            sucessorId = "";
        }

        // No caso de vim 999999 significa que é um novo branch.
        if (branchIndex === 999999) {
            branchIndex = itemCurrent.sucessor.length + 1;
            itemCurrent.sucessor.push(0);
        }

        // OBS: O update no fluxo principal é feito pela referencia entre variáveis js.
        itemCurrent.sucessor[branchIndex] = Number(sucessorId);

        setState({
            ...state,
            flowItens: state.flowItens
        });

        onChangeFlow();
    }

    /** Identifica teclas que foram acionadas enquando o editor está focado. */
    const handleKeyPress = (event: any) => {
        if (event.key === 'Delete') onRemoveItem();

        if (event.key === 'ArrowUp') { positionChangeByKey("ArrowUp"); event.preventDefault(); };
        if (event.key === 'ArrowDown') { positionChangeByKey("ArrowDown"); event.preventDefault(); };
        if (event.key === 'ArrowLeft') { positionChangeByKey("ArrowLeft"); event.preventDefault(); };
        if (event.key === 'ArrowRight') { positionChangeByKey("ArrowRight"); event.preventDefault(); };
    }

    /** Move o componente pelas setas do teclado. */
    const positionChangeByKey = (direction: string) => {
        let filteredList: FlowItem[] = state.flowItens.filter((item: FlowItem) => item.isSelecionado === true);
        if (filteredList.length === 0) return;

        if (direction === 'ArrowUp') {
            filteredList.forEach((item: FlowItem) => { if (item.top > 0) item.top = item.top - 5; });
        } else if (direction === 'ArrowDown') {
            filteredList.forEach((item: FlowItem) => { item.top = item.top + 5; });
        } else if (direction === 'ArrowLeft') {
            filteredList.forEach((item: FlowItem) => { if (item.left > 0) item.left = item.left - 5; });
        } else if (direction === 'ArrowRight') {
            filteredList.forEach((item: FlowItem) => { item.left = item.left + 5; });
        }

        setState({ ...state, flowItens: state.flowItens });

        onChangeFlow();
    }

    /** Remove o item que estiver selecionado no fluxo. */
    const onRemoveItem = () => {
        const itemCurrentIndex = state.flowItens.findIndex((item: FlowItem) => { if (item.isSelecionado === true) return item; else return undefined; });
        if (itemCurrentIndex === -1) return;

        const itemAntecessorIndex = state.flowItens.findIndex((item: FlowItem) => { if (item.sucessor[0] === state.flowItens[itemCurrentIndex].id) return item; else return undefined; });
        if (itemAntecessorIndex !== -1) { state.flowItens[itemAntecessorIndex].sucessor[0] = 0; }

        state.flowItens.splice(itemCurrentIndex, 1);

        setState({ ...state, flowItens: state.flowItens });

        onRemoveItem(); // Remove mais itens se estiverem selecionado.

        onChangeFlow();
    }

    /** Remove a selection da tela. */
    const removeSelection = () => {
        state.selectionProps = { isMouseDown: false, runtimeStartLeft: 0, runtimeStartTop: 0, startTop: 0, startLeft: 0, endTop: 0, endLeft: 0 };

        setState({ ...state, selectionProps: state.selectionProps });

        document.onmousemove = null;
        document.onmouseup = null;

        onChangeFlow();
    }

    /** Ativa a seleção na tela. */
    const exibiSelection = (event: any) => {
        if (event.target.id !== svgRef.current.id) return;

        document.onmousemove = (event: any) => {
            if (state.selectionProps.isMouseDown) {
                state.selectionProps = {
                    ...state.selectionProps,
                    isMouseDown: true,
                    endTop: Number(event.offsetY),
                    endLeft: Number(event.offsetX),
                };

                state.selectionProps = {
                    ...state.selectionProps,
                    runtimeStartLeft: ((state.selectionProps.endLeft - state.selectionProps.startLeft) > 0) ? state.selectionProps.startLeft : state.selectionProps.endLeft,
                    runtimeStartTop: ((state.selectionProps.endTop - state.selectionProps.startTop) > 0) ? state.selectionProps.startTop : state.selectionProps.endTop,
                };

                /** Seleciona os itens na tela conforma o selection os alcança. */
                state.flowItens.forEach((item: FlowItem) => {
                    item.select(
                        state.selectionProps.startTop,
                        state.selectionProps.startLeft,
                        state.selectionProps.endTop,
                        state.selectionProps.endLeft
                    )
                });

                setState({ ...state, selectionProps: state.selectionProps });

                onChangeFlow();
            } else { removeSelection(); }
        }

        document.onmouseup = removeSelection;

        state.selectionProps = {
            ...state.selectionProps,
            isMouseDown: true,
            startTop: Number(event.nativeEvent.offsetY),
            startLeft: Number(event.nativeEvent.offsetX),
            endTop: Number(event.nativeEvent.offsetY),
            endLeft: Number(event.nativeEvent.offsetX),
        };

        state.selectionProps = {
            ...state.selectionProps,
            runtimeStartLeft: ((state.selectionProps.endLeft - state.selectionProps.startLeft) > 0) ? state.selectionProps.startLeft : state.selectionProps.endLeft,
            runtimeStartTop: ((state.selectionProps.endTop - state.selectionProps.startTop) > 0) ? state.selectionProps.startTop : state.selectionProps.endTop,
        };

        setState({
            ...state,
            selectionProps: state.selectionProps
        });
    }

    /** Desabilita qualquer item que esteja selecionado. */
    const onMouseDown = (event: any) => {
        exibiSelection(event);

        if (!event.ctrlKey) {
            state.flowItens.forEach((item: FlowItem) => {
                item.isSelecionado = false;
            });
        }

        setState({ ...state, flowItens: state.flowItens });
    }

    /** Muda item que está selecionado. */
    const onChangeSelecionado = (itemId: number) => {
        const itemCurrentIndex = state.flowItens.findIndex((item: FlowItem) => { if (item.id === Number(itemId)) return item; else return undefined; });

        state.flowItens[itemCurrentIndex].isSelecionado = true;

        setState({ ...state, flowItens: state.flowItens });

        onChangeFlow();
    }

    return (
        <div style={{ flex: 1, maxHeight: "100%", overflow: "auto" }}>
            {((toolItens.length > 0) && isShowToolbar) && <Toolbar itensLogica={toolItens} />}

            <div key={"CODE_EDITOR"} style={{ flex: 1, overflow: "auto", }}>
                <svg tabIndex={0} id={"CODE_EDITOR_SVG"} ref={svgRef} onKeyDown={handleKeyPress} onMouseDown={onMouseDown} style={{
                    height: state.svgSize.svgHeight,
                    width: state.svgSize.svgWidth,
                    minHeight: "100%",
                    minWidth: "100%",
                    outline: "none"
                }}>

                    {/* Reinderiza a área de seleção na tela. */}
                    {state.selectionProps.isMouseDown &&
                        <SelectorArea
                            onMouseUp={removeSelection}
                            endTop={state.selectionProps.endTop}
                            endLeft={state.selectionProps.endLeft}
                            startTop={state.selectionProps.startTop}
                            startLeft={state.selectionProps.startLeft}
                            top={state.selectionProps.runtimeStartTop}
                            left={state.selectionProps.runtimeStartLeft}
                        />
                    }

                    {/* Reinderiza as linhas dos itens arrastáveis da tela. */}
                    {state.flowItens.map((item: FlowItem) => {
                        const itensSucessores: FlowItem[] = state.flowItens.filter((sucessorItem: FlowItem) => item.sucessor.includes(sucessorItem.id));

                        let isUseNewBranch = false; // Define se será usado uma nova branch para este item de fluxo.
                        switch (item.itemType) {
                            case ItemType.IF:
                                isUseNewBranch = itensSucessores.length < 2; // Só usa nova branch para um if se ele ainda tiver menos de 2 branchs.
                                break;

                            case ItemType.SWITCH:
                                isUseNewBranch = true; // Sempre usa uma nova branch para um swicth.
                                break;

                            case ItemType.END:
                                isUseNewBranch = false; // Nunca usa uma nova branch para um END.
                                break;

                            case ItemType.ASSIGN:
                                isUseNewBranch = itensSucessores.length < 1; // Apenas uma nova branch para um assing.
                                break;

                            case ItemType.FOREACH:
                                isUseNewBranch = itensSucessores.length < 2; // Apenas duas branchs para um FOREACH.
                                break;

                            case ItemType.START:
                                isUseNewBranch = itensSucessores.length < 1; // Apenas uma branchs para um START.
                                break;

                            default:
                                isUseNewBranch = itensSucessores.length < 1;
                                break;

                        }

                        return <>

                            {/* Reinderiza todos os branchs de um item de fluxo. */}
                            {itensSucessores.map((sucessorItem: FlowItem, index: number) => {

                                const left2 = sucessorItem ? sucessorItem.left + sucessorItem.width / 2 : item.left + (item.width / 2);
                                const top2 = sucessorItem ? sucessorItem.top - 25 : item.top + (item.height + 20);

                                if (item.itemType === ItemType.END) return <></>;

                                return <Line
                                    left1={(item.left || 0) + ((item.width || 0) / 2)}
                                    top1={(item.top || 0) + (item.height || 0) / 2}
                                    onSucessorChange={onSucessorChange}
                                    id={item.id.toString()}
                                    sucessorIndex={index}
                                    refItemPai={svgRef}
                                    key={item.id}
                                    left2={left2}
                                    color="gray"
                                    top2={top2}
                                />;

                            })}

                            {/* Usado para adicionar uma branch caso o item não tenha sucessores ainda, ou tenha bugado */}
                            {isUseNewBranch &&
                                <Line
                                    left1={(item.left || 0) + ((item.width || 0) / 2)}
                                    top1={(item.top || 0) + (item.height || 0) / 2}
                                    left2={item.left + (item.width / 2)}
                                    top2={item.top + (item.height + 20)}
                                    onSucessorChange={onSucessorChange}
                                    id={item.id.toString()}
                                    refItemPai={svgRef}
                                    key={item.id}
                                    color="gray"
                                />
                            }

                        </>;
                    })}

                    {/* Reinderiza os itens arrastáveis na tela! */}
                    {state.flowItens.map((item: FlowItem) => {
                        return <ItemToDrag
                            onChangeSelecionado={onChangeSelecionado}
                            isSelecionado={item.isSelecionado}
                            outputPosition={positionChange}
                            itemType={item.itemType}
                            refItemPai={svgRef}
                            title={item.nome}
                            key={item.id}
                            id={item.id}
                            style={{
                                top: item.top,
                                left: item.left,
                                width: item.width,
                                height: item.height,
                            }}
                        />;
                    })}

                </svg>
            </div>
        </div>
    );
}

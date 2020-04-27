import React, { useState, useRef, FC } from 'react';
import { useDrop, DropTargetMonitor, DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { ICodeEditorProps, ICodeEditorState } from './shared/Interfaces/CodeEditorInterfaces';
import { EditorPanel } from './components/editor-panel/EditorPanel';
import { SelectorArea } from './components/selector/SelectorArea';
import { BreandCamps } from './components/breadcamps/BreandCamps';
import { InputCopy } from './components/input-copy/InputCopy';
import { ItemToDrag } from './components/item-drag/ItemDrag';
import { ItemType, FlowItem } from './models/ItemFluxo';
import { Toolbar } from './components/tool-bar/ToolBar';
import { Lines } from './components/lines/Lines';
import { Utils } from './shared/Utils';


/**
 * Editor de lógica de programação através de fluxo simples.
 * 
 * @param itens FlowItem[] - Usado para exibir os itens na tela do editor.
 * @param toolItens FlowItem[] - Usado para exibir os itens na toolbox do editor.
 * @param onChangeItens Function - Usada para emitir através do output o fluxo atualidado, acontece a cada mudança de estado dos itens de fluxo.
 * @param onDropItem Function - Usada para emitir através do output o item que foi dropado no fluxo.
 * @param isShowToolbar boolean - Usado para exibir ou não a toolbox cons itens de lógica.
 */
export const FlowEditor: FC<ICodeEditorProps> = (props: ICodeEditorProps) => {
    return (
        <DndProvider backend={HTML5Backend}>
            <CodeEditor {...props} />
        </DndProvider>
    );
}

/** Define quais itens são aceitos no drop do start. */
const acceptedInDrop: ItemType[] = [ItemType.START, ItemType.ACTION, ItemType.IF, ItemType.FOREACH, ItemType.SWITCH, ItemType.ASSIGN, ItemType.END, ItemType.COMMENT];

/** Usada para validar houve mudanças no estados dos itens e impedir a realização outputs desnecessários. */
let backupFlow: string = "";

/** Editor do fluxo. */
const CodeEditor: React.FC<ICodeEditorProps> = ({ itens = [], toolItens = [], onChangeItens = () => { }, onMouseOver, isShowToolbar = false, onDropItem = () => undefined, allowDropTo = [], onContextMenu, onKeyDown, breadcrumbsPath, isDisabledSelection = false }) => {

    /** Referencia o svg onde está todos os itens de fluxo. */
    const editorPanelRef = useRef<any>(null);
    const inputCopyRef = useRef<any>(null);

    /** Controla o estado do editor inteiro. */
    const [state, setState] = useState<ICodeEditorState>({
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
    state.flowItens = itens;

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

    const onDropFlowItem = (item: any, monitor: DropTargetMonitor) => {

        const target: any = editorPanelRef.current;
        const targetSize: any = target.getBoundingClientRect();
        const draggedOffSet: any = monitor.getClientOffset();
        const targetOffsetY: number = ((draggedOffSet.y) + (targetSize.top - targetSize.top - targetSize.top) - 25);
        const targetOffsetX: number = ((draggedOffSet.x) + (targetSize.left - targetSize.left - targetSize.left) - 25);

        let newItem = new FlowItem({
            height: item.itemProps.itemType === ItemType.COMMENT ? 100 : 50,
            width: item.itemProps.itemType === ItemType.COMMENT ? 200 : 50,
            id: Utils.getRandomId().toString(),
            itemType: item.itemProps.itemType,
            name: item.itemProps.title,
            left: targetOffsetX,
            top: targetOffsetY,
            isSelected: true,
            sucessor: [],
        });

        /** Espera o retorno para inserir o item, se receber undefined só insere, se for diferente de undefined insere o resultado do event se existir algo */
        const onDropRes = onDropItem(item.id, (newItem.id || Utils.getRandomId()).toString(), newItem);
        if (onDropRes === undefined) {

            state.flowItens.push(newItem);

            setState({ ...state, flowItens: state.flowItens });

            editorPanelRef.current.focus();

            onChangeFlow();

        } else if (onDropRes) {

            state.flowItens.push(onDropRes);

            setState({ ...state, flowItens: state.flowItens });

            editorPanelRef.current.focus();

            onChangeFlow();

        }
    }

    /** Usado para que seja possível o drop de itens no editor. */
    const [, dropRef] = useDrop({
        accept: [...acceptedInDrop, ...allowDropTo], // Especifica quem pode ser dropado na editor
        drop: onDropFlowItem,
    });

    /** Agrupa as referências do drop com as da ref. */
    dropRef(editorPanelRef);

    /**
     * Depois que um elemento já está na tela, esta função muda a posição dele!
     * @param mousePositionTop Posição do mouse com relação ao topo(top) do quadro do editor
     * @param mousePositionLeft Posição do mouse com relação a esquerda(left) do quadro do editor
     * @param event Evento de mouse move
     */
    const onChangePositionItens = (mousePositionTop: number, mousePositionLeft: number, event?: any) => {

        let components = state.flowItens.filter((item: FlowItem) => item.isSelected);

        if (event && event.ctrlKey) {
            components.forEach(comp => {
                const oldTop = comp.top;
                const oldLeft = comp.left;
                const distanceTop = oldTop - mousePositionTop;
                const distanceLeft = oldLeft - mousePositionLeft;

                comp.top = (oldTop + (mousePositionTop - oldTop) - distanceTop);
                comp.left = (oldLeft + (mousePositionLeft - oldLeft) - distanceLeft);
            });
        }
        else {
            components.forEach(comp => {
                const oldLeft = comp.left;
                const oldTop = comp.top;

                comp.left = oldLeft + (mousePositionLeft - oldLeft);
                comp.top = oldTop + (mousePositionTop - oldTop);
            })
        }

        state.svgSize.svgHeight = state.flowItens.sort((a, b) => b.top - a.top)[0].top + 200;
        state.svgSize.svgWidth = state.flowItens.sort((a, b) => b.left - a.left)[0].left + 200;

        setState({
            ...state,
            flowItens: state.flowItens,
            svgSize: state.svgSize
        });
    }

    /**
     * Usado para mudar o "sucessorId" de um elemento.
     * Sucessor é usado para indicar onde o apontamento deve estar.
     *
     * @param branchIndex indica qual a branch do item para liga no item sucessor
     */
    const onSucessorChange = (itemId: string | undefined, sucessorId: string, branchIndex: number = 0) => {

        const itemCurrentIndex = state.flowItens.findIndex((item: FlowItem) => item.id === itemId);
        //if (itemCurrentIndex < 0) return;

        let itemCurrent: FlowItem = state.flowItens[itemCurrentIndex];

        // Se tentar ligar um item nele mesmo deve ser perdida a ligação com qualquer elemento anterior desta branch específica.
        if (itemId === sucessorId || itemId === undefined) {
            sucessorId = "";
        }

        // No caso de vim 999999 significa que é um novo branch.
        if (branchIndex === 999999) {
            branchIndex = itemCurrent.sucessor.length + 1;
            itemCurrent.sucessor.push('0');
        }

        // OBS: O update no fluxo principal é feito pela referencia entre variáveis js.
        itemCurrent.sucessor[branchIndex] = sucessorId;

        setState({ ...state, flowItens: state.flowItens });
        onChangeFlow();
    }

    /** CONFIG TECLAS: Valida se existe um elemento no current e define os eventos das teclas para aquele elemento */
    if (editorPanelRef.current) {

        /** Identifica teclas que foram acionadas enquando o editor está focado. */
        editorPanelRef.current.onkeydown = (event: React.KeyboardEvent<SVGSVGElement>) => {

            // Direciona o evento para fora do componente.
            if (onKeyDown) onKeyDown(event);

            if (event.key === 'Delete') onRemoveItem();

            /** Ctrl + a */
            if (event.ctrlKey && (event.key === 'a')) selectAll();


            /** Ctrl + c */ if (event.ctrlKey && (event.key === 'c')) copySelecteds();
            /** Ctrl + v */ if (event.ctrlKey && (event.key === 'v')) pasteSelecteds();

            if (event.key === 'ArrowUp') { positionChangeByKey("ArrowUp"); event.preventDefault(); };
            if (event.key === 'ArrowDown') { positionChangeByKey("ArrowDown"); event.preventDefault(); };
            if (event.key === 'ArrowLeft') { positionChangeByKey("ArrowLeft"); event.preventDefault(); };
            if (event.key === 'ArrowRight') { positionChangeByKey("ArrowRight"); event.preventDefault(); };
        }

        /** Copia os itens de fluxo selecionados */
        const copySelecteds = () => {
            const components = state.flowItens.filter((item: FlowItem) => item.isSelected);

            inputCopyRef.current.value = JSON.stringify(components);
            inputCopyRef.current.focus()
            inputCopyRef.current.select()
            document.execCommand('copy');
            editorPanelRef.current.focus()

        }

        /** Cola os itens de fluxo na área de transferência */
        const pasteSelecteds = () => {

            const findNewPosition = (num: number, type: 'top' | 'left'): number => {

                let index: number = 0;
                if (type === 'left') {
                    index = state.flowItens.findIndex((item: FlowItem) => {

                        const isEquals = (item.left === num); // Posição exata já é usada?
                        if (isEquals) return true;

                        const x1IsUsed = (item.left >= (num - 100)); // Posição maior que x1 é usada?
                        const x2IsUsed = (item.left <= (num + 100)); // Posição menor que x2 é usada?

                        if (x2IsUsed && x1IsUsed) return true;

                        return false;

                    });
                }
                else if (type === 'top') {
                    index = state.flowItens.findIndex((item: FlowItem) => {

                        const isEquals = (item.top === num); // Posição exata já é usada?
                        if (isEquals) return true;

                        const x1IsUsed = (item.top >= (num - 100)); // Posição maior que x1 é usada?
                        const x2IsUsed = (item.top <= (num + 100)); // Posição menor que x2 é usada?

                        if (x2IsUsed && x1IsUsed) return true;

                        return false;

                    });
                }

                return (index !== -1) ? findNewPosition(num + 10, type) : num;
            }

            try {

                const selection = document.getSelection() || new Selection();
                const string: string = selection.toString();
                const components: FlowItem[] = JSON.parse(string || '');
                const components2: FlowItem[] = JSON.parse(string || '');

                components.forEach(item => {

                    const newId: string | undefined = Utils.getRandomId().toString();

                    components.forEach((depende, dependeIndex) => {
                        if (depende.id !== item.id) {
                            depende.sucessor.forEach((sucessorId, index) => {
                                if (sucessorId === item.id) {
                                    components2[dependeIndex].sucessor[index] = newId;
                                    // sucessorIndex = index;
                                }
                            });
                        } else {
                            components2[dependeIndex].id = newId;
                        }
                    });

                });

                components2.forEach(item => {

                    /* --- Atualiza o top e left de todos os elementos */
                    const newLeft = findNewPosition(item.left + 100, 'left');
                    const newTop = findNewPosition(item.top, 'top');
                    if (newLeft <= newTop) item.left = newLeft;
                    else item.top = newTop;
                    /* --- */

                    state.flowItens.push(new FlowItem(item));

                });

                setState({ ...state });
                onChangeFlow();
            } catch (e) { }

        }

        /** Move o componente pelas setas do teclado. */
        const positionChangeByKey = (direction: string) => {
            let filteredList: FlowItem[] = state.flowItens.filter((item: FlowItem) => item.isSelected === true);
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

        /** Seleciona todos os itens da tela */
        const selectAll = () => {
            state.flowItens.forEach((item: FlowItem) => {
                item.isSelected = true;
            });

            setState({ ...state, flowItens: state.flowItens });
            onChangeFlow();
        }

        /** Remove o item que estiver selecionado no fluxo. */
        const onRemoveItem = () => {
            const itemCurrentIndex = state.flowItens.findIndex((item: FlowItem) => item.isSelected);
            if (itemCurrentIndex === -1) return;

            const itemAntecessorIndex = state.flowItens.findIndex((item: FlowItem) => item.sucessor[0] === state.flowItens[itemCurrentIndex].id);
            if (itemAntecessorIndex !== -1) { state.flowItens[itemAntecessorIndex].sucessor[0] = '0'; }

            state.flowItens.splice(itemCurrentIndex, 1);

            setState({ ...state, flowItens: state.flowItens });

            onRemoveItem(); // Remove mais itens se estiverem selecionado.

            onChangeFlow();
        }

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

        if (event.target.id !== editorPanelRef.current.id) return;

        // Impede a seleção de itens na tela
        if (isDisabledSelection) return;

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

        setState({ ...state, selectionProps: state.selectionProps });
    }

    /** Desabilita qualquer item que esteja selecionado. */
    const onMouseDown = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {

        // Exibi a área de seleção apenas se o ID do target for igual ao do painel
        if (event.currentTarget.id === editorPanelRef.current.id) {
            exibiSelection(event);
            return;
        }

        if (event.ctrlKey) {

            state.flowItens.forEach((item: FlowItem) => {

                if (item.id === event.currentTarget.id) {
                    item.isSelected = !item.isSelected;
                }

            });

        } else {

            state.flowItens.forEach((item: FlowItem) => {

                if (item.id === event.currentTarget.id) {
                    item.isSelected = true;
                } else {
                    item.isSelected = false;
                }

            });

        }

        setState({ ...state, flowItens: state.flowItens });
        onChangeFlow();
    }

    return (
        <>
            <InputCopy ref={inputCopyRef} />
            <Toolbar itensLogica={toolItens} isShow={((toolItens.length > 0) && isShowToolbar)} />
            <main key={"CODE_EDITOR"} className='overflow-auto flex1' >
                <BreandCamps breadcrumbsPath={breadcrumbsPath} />

                <EditorPanel
                    ref={editorPanelRef}
                    id={"CODE_EDITOR_SVG"}
                    backgroundType='dotted'
                    onMouseOver={onMouseOver}
                    width={state.svgSize.svgWidth}
                    height={state.svgSize.svgHeight}
                    onMouseDown={(e: any) => onMouseDown(e)}
                    onContextMenu={(e: any) => {
                        if (onContextMenu) {
                            e.preventDefault();
                            onContextMenu(undefined, e);
                        }
                    }}>

                    {/* Reinderiza a área de seleção na tela. */}
                    <SelectorArea
                        onMouseUp={removeSelection}
                        endTop={state.selectionProps.endTop}
                        endLeft={state.selectionProps.endLeft}
                        startTop={state.selectionProps.startTop}
                        startLeft={state.selectionProps.startLeft}
                        top={state.selectionProps.runtimeStartTop}
                        left={state.selectionProps.runtimeStartLeft}
                        isShow={state.selectionProps.isMouseDown && !isDisabledSelection}
                    />

                    {/* Reinderiza as linhas dos itens arrastáveis da tela. */}
                    {state.flowItens.map((item: FlowItem) => {

                        const itensSucessores: FlowItem[] = state.flowItens.filter((sucessorItem: FlowItem) => {

                            if (sucessorItem.id === undefined) return false;
                            return item.sucessor.includes(sucessorItem.id);

                        });

                        // Define se será usado uma nova branch para este item de fluxo.
                        let isUseNewBranch = Utils.useNewBranch(itensSucessores.length, item.itemType);

                        /* Reinderiza todos os branchs de um item de fluxo. */
                        return <Lines
                            item={item}
                            isUseNewBranch={isUseNewBranch}
                            parentElementRef={editorPanelRef}
                            itensSucessores={itensSucessores}
                            onSucessorChange={onSucessorChange}
                        />;

                    })}

                    {/* Reinderiza os itens arrastáveis na tela! */}
                    {state.flowItens.map((item: FlowItem) => {
                        return <ItemToDrag
                            style={{ top: item.top, left: item.left, width: item.width, height: item.height }}
                            onMouseDown={(e: any) => onMouseDown(e)}
                            onChangePosition={onChangePositionItens}
                            onMouseUp={(e: any) => onChangeFlow()}
                            parentElementRef={editorPanelRef}
                            onContextMenu={onContextMenu}
                            isSelected={item.isSelected}
                            itemType={item.itemType}
                            hasError={item.hasError}
                            title={item.name}
                            key={item.id}
                            id={item.id}
                        />;
                    })}

                </EditorPanel>
            </main>
        </>
    );
}

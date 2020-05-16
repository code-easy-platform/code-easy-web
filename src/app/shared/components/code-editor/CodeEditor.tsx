import React, { useState, useRef, FC, useEffect } from 'react';
import { DropTargetMonitor, DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { ICodeEditorProps } from './shared/Interfaces/CodeEditorInterfaces';
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

/** Usada para validar houve mudanças no estados dos itens e impedir a realização outputs desnecessários. */
let backupFlow: string = "";

/** Editor do fluxo. */
const CodeEditor: React.FC<ICodeEditorProps> = ({ id, itens = [], toolItens = [], onChangeItens = () => { }, onMouseOver, backgroundType, showToolbar = false, onDropItem = () => undefined, allowedsInDrop = [], onContextMenu, onKeyDown, breadcrumbs, enabledSelection = true }) => {

    /** Referencia o svg onde está todos os itens de fluxo. */
    const editorPanelRef = useRef<any>(null);
    const inputCopyRef = useRef<any>(null);

    /** Controla o estado do editor inteiro. */
    const [flowItens, setFlowItens] = useState<{ list: FlowItem[] }>({ list: [] });
    useEffect(() => setFlowItens({ list: itens }), [itens]);

    const [svgSize, setSvgSize] = useState({ svgHeight: 0, svgWidth: 0 });
    useEffect(() => {
        setSvgSize({
            svgHeight: flowItens.list.length > 0 ? flowItens.list.sort((a, b) => b.top - a.top)[0].top + 300 : 0,
            svgWidth: flowItens.list.length > 0 ? flowItens.list.sort((a, b) => b.left - a.left)[0].left + 200 : 0,
        });
    }, [flowItens]);

    /** Usada para emitir os itens para fora do componente. */
    const onChangeFlow = () => {
        if (backupFlow !== JSON.stringify(flowItens)) {
            backupFlow = JSON.stringify(flowItens); // Salva para fazer as comparações posteriores.
            onChangeItens(flowItens.list);
        }
    }

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

            flowItens.list.push(newItem);
            setFlowItens({ list: flowItens.list });

            editorPanelRef.current.focus();
            onChangeFlow();

        } else if (onDropRes) {

            flowItens.list.push(onDropRes)
            setFlowItens({ list: flowItens.list });

            editorPanelRef.current.focus();
            onChangeFlow();

        }

    }

    /**
     * Depois que um elemento já está na tela, esta função muda a posição dele!
     * @param mousePositionTop Posição do mouse com relação ao topo(top) do quadro do editor
     * @param mousePositionLeft Posição do mouse com relação a esquerda(left) do quadro do editor
     * @param event Evento de mouse move
     */
    const onChangePositionItens = (mousePositionTop: number, mousePositionLeft: number, e?: any) => {

        let components = flowItens.list.filter((item: FlowItem) => item.isSelected);

        if (e && e.ctrlKey) {
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

        setFlowItens({ list: flowItens.list });
    }

    /**
     * Usado para mudar o "sucessorId" de um elemento.
     * Sucessor é usado para indicar onde o apontamento deve estar.
     *
     * @param branchIndex indica qual a branch do item para liga no item sucessor
     */
    const changeSucessor = (itemId: string | undefined, sucessorId: string, branchIndex: number = 0) => {

        const itemCurrentIndex = flowItens.list.findIndex((item: FlowItem) => item.id === itemId);
        if (itemCurrentIndex < 0) return;

        let itemCurrent: FlowItem = flowItens.list[itemCurrentIndex];

        /** Se for um comentário, não realiza a mudança */
        const targetItem = flowItens.list.find(target => target.id === sucessorId);
        if (!targetItem) {
            return;
        } else {
            if (targetItem.itemType === ItemType.COMMENT) {
                return;
            }
        }

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

        setFlowItens({ list: flowItens.list });
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
            const components = flowItens.list.filter((item: FlowItem) => item.isSelected);

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
                    index = flowItens.list.findIndex((item: FlowItem) => {

                        const isEquals = (item.left === num); // Posição exata já é usada?
                        if (isEquals) return true;

                        const x1IsUsed = (item.left >= (num - 100)); // Posição maior que x1 é usada?
                        const x2IsUsed = (item.left <= (num + 100)); // Posição menor que x2 é usada?

                        if (x2IsUsed && x1IsUsed) return true;

                        return false;

                    });
                }
                else if (type === 'top') {
                    index = flowItens.list.findIndex((item: FlowItem) => {

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

                    flowItens.list.push(new FlowItem(item));

                });

                setFlowItens({ list: flowItens.list });
                onChangeFlow();
            } catch (e) { }

        }

        /** Move o componente pelas setas do teclado. */
        const positionChangeByKey = (direction: string) => {
            let filteredList: FlowItem[] = flowItens.list.filter((item: FlowItem) => item.isSelected === true);
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

            setFlowItens({ list: flowItens.list });
            onChangeFlow();
        }

        /** Seleciona todos os itens da tela */
        const selectAll = () => {
            flowItens.list.forEach((item: FlowItem) => {
                item.isSelected = true;
            });

            setFlowItens({ list: flowItens.list });
            onChangeFlow();
        }

        /** Remove o item que estiver selecionado no fluxo. */
        const onRemoveItem = () => {
            const itemCurrentIndex = flowItens.list.findIndex((item: FlowItem) => item.isSelected);
            if (itemCurrentIndex === -1) return;

            const itemAntecessorIndex = flowItens.list.findIndex((item: FlowItem) => item.sucessor[0] === flowItens.list[itemCurrentIndex].id);
            if (itemAntecessorIndex !== -1) { flowItens.list[itemAntecessorIndex].sucessor[0] = '0'; }

            flowItens.list.splice(itemCurrentIndex, 1);

            setFlowItens({ list: flowItens.list });

            onRemoveItem(); // Remove mais itens se estiverem selecionado.

            onChangeFlow();
        }

    }

    /** Desabilita qualquer item que esteja selecionado. */
    const onMouseDown = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {

        if (e.ctrlKey) {
            flowItens.list.forEach((item: FlowItem) => {

                if (item.id === e.currentTarget.id) {
                    item.isSelected = !item.isSelected;
                }

            });
        } else {
            flowItens.list.forEach((item: FlowItem) => {

                if (item.id === e.currentTarget.id) {
                    item.isSelected = true;
                } else {
                    item.isSelected = false;
                }

            });

        }

        setFlowItens({ list: flowItens.list });
        onChangeFlow();
    }

    const itemNameChange = (text: string, index: number) => {
        flowItens.list[index].name = text;
        setFlowItens({ list: flowItens.list });
        onChangeFlow();
    }

    return (
        <div className="full-width" onMouseOver={(e: any) => onMouseOver && onMouseOver(e)}>
            <InputCopy ref={inputCopyRef} />
            <Toolbar itensLogica={toolItens} isShow={((toolItens.length > 0) && showToolbar)} />
            <main key={id} className='overflow-auto flex1'>
                <BreandCamps breadcrumbs={breadcrumbs} />

                <EditorPanel
                    id={`${id}_SVG`}
                    ref={editorPanelRef}
                    width={svgSize.svgWidth}
                    height={svgSize.svgHeight}
                    onDropItem={onDropFlowItem}
                    allowedsInDrop={allowedsInDrop}
                    backgroundType={backgroundType}
                    onMouseDown={(e: any) => onMouseDown(e)}
                    onContextMenu={(e: any) => onContextMenu && onContextMenu(undefined, e)}
                >

                    {/* Reinderiza a área de seleção na tela. */}
                    <SelectorArea
                        parentRef={editorPanelRef}
                        enabled={enabledSelection}
                        onCoordsChange={coords => {
                            flowItens.list.forEach((item: FlowItem) => item.select(coords));
                            setFlowItens({ list: flowItens.list });
                        }}
                    />

                    {/* Reinderiza as linhas dos itens arrastáveis da tela. */}
                    {flowItens.list.map((item: FlowItem, index) => {

                        const itensSucessores: FlowItem[] = flowItens.list.filter((sucessorItem: FlowItem) => {

                            if (sucessorItem.id === undefined) {
                                return false;
                            }
                            return item.sucessor.includes(sucessorItem.id);

                        });

                        // Define se será usado uma nova branch para este item de fluxo.
                        let isUseNewBranch = Utils.useNewBranch(itensSucessores.length, item.itemType);

                        /* Reinderiza todos os branchs de um item de fluxo. */
                        return <Lines
                            key={index}
                            item={item}
                            isUseNewBranch={isUseNewBranch}
                            itensSucessores={itensSucessores}
                            onSucessorChange={changeSucessor}
                        />;

                    })}

                    {/* Reinderiza os itens arrastáveis na tela! */}
                    {flowItens.list.map((item: FlowItem, index) => (
                        <ItemToDrag
                            onContextMenu={(data, e) => { e?.stopPropagation(); onContextMenu && onContextMenu(data, e) }}
                            onNameChange={text => itemNameChange(text, index)}
                            onMouseDown={(e: any) => onMouseDown(e)}
                            onChangePosition={onChangePositionItens}
                            onMouseUp={(e: any) => onChangeFlow()}
                            title={item.name}
                            key={item.id}
                            {...item}
                        />
                    ))}

                </EditorPanel>
            </main>
        </div>
    );

}

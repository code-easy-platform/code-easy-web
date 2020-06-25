import React, { useState, useRef, FC, useEffect } from 'react';
import { DropTargetMonitor, DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Utils } from 'code-easy-components';

import { ICodeEditorProps } from './shared/Interfaces/CodeEditorInterfaces';
import { EditorPanel } from './components/editor-panel/EditorPanel';
import { SelectorArea } from './components/selector/SelectorArea';
import { BreandCamps } from './components/breadcamps/BreandCamps';
import { InputCopy } from './components/input-copy/InputCopy';
import { ItemToDrag } from './components/item-drag/ItemDrag';
import { ItemType, FlowItem } from './models/ItemFluxo';
import { Toolbar } from './components/tool-bar/ToolBar';
import { Utils as InternalUtils } from './shared/Utils';
import { Lines } from './components/lines/Lines';


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
const CodeEditor: React.FC<ICodeEditorProps> = ({ id, itens = [], disableOpacity = 0.3, emptyMessage, snapGridWhileDragging = true, toolItens = [], onChangeItens = () => { }, onMouseOver, backgroundType, showToolbar = false, onDropItem = () => undefined, allowedsInDrop = [], onContextMenu, onKeyDown, breadcrumbs, enabledSelection = true }) => {

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

    /** Essa função é executada sempre um item(aceito como item soltável) é sortado no painel */
    const onDropFlowItem = (item: any, monitor: DropTargetMonitor) => {

        // Deseleciona qualquer outro item que esteja selecionado no fluxo.
        flowItens.list.forEach((item: FlowItem) => item.isSelected = false);

        const target: any = editorPanelRef.current;
        const targetSize: any = target.getBoundingClientRect();
        const draggedOffSet: any = monitor.getClientOffset();
        const targetOffsetY: number = ((draggedOffSet.y) + (targetSize.top - targetSize.top - targetSize.top) - 25);
        const targetOffsetX: number = ((draggedOffSet.x) + (targetSize.left - targetSize.left - targetSize.left) - 25);

        let newItem = new FlowItem({
            id: Utils.getUUID().toString(),
            itemType: item.itemProps.itemType,
            name: item.itemProps.title,
            left: Math.round(targetOffsetX / 15) * 15,
            top: Math.round(targetOffsetY / 15) * 15,
            isSelected: true,
            connections: [],
        });

        /** Espera o retorno para inserir o item, se receber undefined só insere, se for diferente de undefined insere o resultado do event se existir algo */
        const onDropRes = onDropItem(item.id, (newItem.id || Utils.getUUID()), newItem);
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
    const onChangePositionItens = (mousePositionTop: number, mousePositionLeft: number, itemId: string | undefined, e?: any) => {

        let selectedItens = flowItens.list.filter((item: FlowItem) => item.isSelected).sort((a, b) => ((a.top + b.top) - (a.left + b.left)));
        const targetItem = selectedItens.find(selectedItem => selectedItem.id === itemId);
        if (!targetItem) return;

        // Valida se o usuário optou pela ajuda no encaixe na grid
        if (snapGridWhileDragging) {
            mousePositionTop = Math.round(mousePositionTop / 15) * 15;
            mousePositionLeft = Math.round(mousePositionLeft / 15) * 15;

            // Valida se realmente houve alguma mudança
            if (targetItem.top === mousePositionTop && targetItem.left === mousePositionLeft) return;
        }


        /** Evita esses valores sejam alterados pela referência entre as variáveis */
        const old = {
            left: targetItem.left,
            top: targetItem.top,
        }

        // Muda a posição de todos os itens que estão selecionados
        selectedItens.forEach(comp => {
            const oldCompLeft = comp.left;
            const oldCompTop = comp.top;

            comp.left += (mousePositionLeft - old.left);
            comp.top += (mousePositionTop - old.top);

            // Garante que um item não seja arrastado para posições negativas
            if (comp.top < 0) {
                comp.top = oldCompTop;
            }
            if (comp.left < 0) {
                comp.left = oldCompLeft;
            }
        });

        setFlowItens({ list: flowItens.list });
    }

    /**
     * Função usada para adicionar, remove e atualizar sucessores dos itens arrastáveis
     * @param itemId string | undefined Item antecessore(pai)
     * @param sucessorId string id do item que será usado como sucessor
     * @param branchIndex number | undefined se vim undefined é adicionado um novo sucessor, se não está atualizando ou removendo
     */
    const changeSucessor = (itemId: string | undefined, sucessorId: string, branchIndex: number | undefined) => {

        /** Item em que está sendo feita as mudanças nos sucessores */
        const itemCurrent = flowItens.list.find((item: FlowItem) => item.id === itemId);
        if (!itemCurrent) return;

        // Se tentar ligar um item nele mesmo deve ser excluida a ligação.
        if (itemId === sucessorId || itemId === undefined) {
            if (branchIndex === undefined) return;

            itemCurrent.connections.splice(branchIndex, 1);

            setFlowItens({ list: flowItens.list });
            onChangeFlow();
            return;
        }

        /** Se for um comentário, não realiza o link como sucessor */
        const targetItem = flowItens.list.find(target => target.id === sucessorId);
        if (!targetItem) {
            return;
        } else {
            if (targetItem.itemType === ItemType.COMMENT) {
                return;
            } else if (targetItem.itemType === ItemType.START && itemCurrent.itemType !== ItemType.COMMENT) {
                return;
            }
        }

        // No caso de vim undefined significa que é um novo branch.
        // Caso se o item já esteja na lista como sucessor, remove e adiciona novamente.
        if (branchIndex === undefined && !itemCurrent.connections.some(connection => id === connection.connectionId)) {
            itemCurrent.connections.push({ connectionId: sucessorId });
        } else {
            /* const indexToRemove = itemCurrent.sucessor.findIndex(id => id === sucessorId); */

            if (branchIndex !== undefined) {
                itemCurrent.connections[branchIndex].connectionId = sucessorId;
            }
        }

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

                    const newId: string | undefined = Utils.getUUID();

                    components.forEach((depende, dependeIndex) => {
                        if (depende.id !== item.id) {
                            depende.connections.forEach((connection, index) => {
                                if (connection.connectionId === item.id) {
                                    components2[dependeIndex].connections[index].connectionId = newId;
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

            /** Index do item selecionado que está sendo removido */
            const itemCurrentIndex = flowItens.list.findIndex((item: FlowItem) => item.isSelected);
            if (itemCurrentIndex === -1) return;

            /** Index do item antecessor ao item que será removido */
            const itemAntecessorIndex = flowItens.list.findIndex((item: FlowItem) => item.connections.some(connection => connection.connectionId === flowItens.list[itemCurrentIndex].id));
            if (itemAntecessorIndex !== -1) { flowItens.list[itemAntecessorIndex].connections[0].connectionId = '0'; }

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
            const flowItemSelecteds = flowItens.list.filter(item => item.isSelected);
            const keepMultiselect = flowItemSelecteds.length > 1 && flowItemSelecteds.some(item => item.id === e.currentTarget.id);

            if (!keepMultiselect) {
                flowItens.list.forEach((item: FlowItem) => {
                    if (item.id === e.currentTarget.id) {
                        item.isSelected = true;
                    } else {
                        item.isSelected = false;
                    }
                });
            }
        }

        setFlowItens({ list: flowItens.list });
        onChangeFlow();
    }

    /** Para inputs que estão no meio do fluxo */
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
                    onMouseDown={(e: any) => onMouseDown(e)}
                    backgroundType={enabledSelection ? backgroundType : "custom"}
                    onContextMenu={(e: any) => (onContextMenu && enabledSelection) && onContextMenu(undefined, e)}
                >

                    {(!enabledSelection && flowItens.list.length === 0)
                        && <foreignObject width={"100%"} height={"100%"}>
                            <div className="full-height full-width flex-itens-center flex-content-center opacity-5">
                                <header>{emptyMessage || "Double-click on an item in the tree to edit it"}</header>
                            </div>
                        </foreignObject>
                    }

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

                        const itemsConnections: FlowItem[] = flowItens
                            .list.filter((sucessorItem: FlowItem) => (sucessorItem.id !== undefined)
                                ? item.connections.some(connection => sucessorItem.id === connection.connectionId)
                                : false
                            );

                        /* Reinderiza todos os branchs de um item de fluxo. */
                        return <Lines
                            key={index}
                            item={item}
                            disableOpacity={disableOpacity}
                            onSucessorChange={changeSucessor}
                            itemsConnections={itemsConnections}
                            isUseNewBranch={InternalUtils.useNewBranch(itemsConnections.length, item.itemType)}
                        />;

                    })}

                    {/* Reinderiza os itens arrastáveis na tela! */}
                    {flowItens.list.map((item: FlowItem, index) => (
                        <ItemToDrag
                            onContextMenu={(data, e) => { e?.stopPropagation(); (onContextMenu && enabledSelection) && onContextMenu(data, e) }}
                            onNameChange={text => itemNameChange(text, index)}
                            onChangePosition={onChangePositionItens}
                            parentElementRef={editorPanelRef}
                            onMouseUp={() => onChangeFlow()}
                            disableOpacity={disableOpacity}
                            isDisabled={item.isDisabled}
                            onMouseDown={onMouseDown}
                            title={item.name}
                            key={item.id}
                            {...item}
                        />
                    ))}

                    {/* Reinderiza a área de seleção na tela. */}
                    <SelectorArea
                        parentRef={editorPanelRef}
                        enabled={enabledSelection}
                        onCoordsChange={coords => {
                            flowItens.list.forEach((item: FlowItem) => item.select(coords));
                            setFlowItens({ list: flowItens.list });
                        }}
                    />
                </EditorPanel>
            </main>
        </div>
    );

}

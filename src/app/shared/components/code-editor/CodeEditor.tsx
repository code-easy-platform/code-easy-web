import React, { useState, useRef, FC, useEffect, useCallback } from 'react';
import { DropTargetMonitor, DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Utils } from 'code-easy-components';

import { ICodeEditorProps } from './shared/Interfaces/CodeEditorInterfaces';
import { EditorPanel } from './components/editor-panel/EditorPanel';
import { SelectorArea } from './components/selector/SelectorArea';
import { BreandCamps } from './components/breadcamps/BreandCamps';
import { InputCopy } from './components/input-copy/InputCopy';
import { ItemToDrag } from './components/item-drag/ItemDrag';
import { Toolbar } from './components/tool-bar/ToolBar';
import { Utils as InternalUtils } from './shared/Utils';
import { ItemType } from './shared/enums/ItemType';
import { Lines } from './components/lines/Lines';
import { FlowItem } from './models/ItemFluxo';


/**
 * Editor de lógica de programação através de fluxo simples.
 *
 * @param items FlowItem[] - Usado para exibir os items na tela do editor.
 * @param toolItems FlowItem[] - Usado para exibir os items na toolbox do editor.
 * @param onChangeItems Function - Usada para emitir através do output o fluxo atualidado, acontece a cada mudança de estado dos items de fluxo.
 * @param onDropItem Function - Usada para emitir através do output o item que foi dropado no fluxo.
 * @param isShowToolbar boolean - Usado para exibir ou não a toolbox cons items de lógica.
 */
export const FlowEditor: FC<ICodeEditorProps> = (props: ICodeEditorProps) => {
    return (
        <DndProvider backend={HTML5Backend}>
            <CodeEditor {...props} />
        </DndProvider>
    );
}

/** Usada para validar houve mudanças no estados dos items e impedir a realização outputs desnecessários. */
let backupFlow: string = "";

/** Editor do fluxo. */
const CodeEditor: React.FC<ICodeEditorProps> = ({ id, items = [], disableOpacity = 0.3, emptyMessage, snapGridWhileDragging = true, toolItems = [], onChangeItems = () => { }, onMouseOver, backgroundType, showToolbar = false, onDropItem = () => undefined, allowedsInDrop = [], onContextMenu, onKeyDown, breadcrumbs, enabledSelection = true }) => {

    /** Referencia o svg onde está todos os items de fluxo. */
    const editorPanelRef = useRef<any>(null);
    const inputCopyRef = useRef<any>(null);

    /** Controla o estado do editor inteiro. */
    const [flowItems, setFlowItems] = useState<{ list: FlowItem[] }>({ list: [] });
    useEffect(() => setFlowItems({ list: items }), [items]);

    const [svgSize, setSvgSize] = useState({ svgHeight: 0, svgWidth: 0 });
    useEffect(() => {
        setSvgSize({
            svgHeight: flowItems.list.length > 0 ? flowItems.list.sort((a, b) => b.top - a.top)[0].top + 300 : 0,
            svgWidth: flowItems.list.length > 0 ? flowItems.list.sort((a, b) => b.left - a.left)[0].left + 200 : 0,
        });
    }, [flowItems]);

    /** Usada para emitir os items para fora do componente. */
    const onChangeFlow = useCallback(() => {
        if (backupFlow !== JSON.stringify(flowItems)) {
            backupFlow = JSON.stringify(flowItems); // Salva para fazer as comparações posteriores.
            onChangeItems(flowItems.list);
        }
    }, [flowItems, onChangeItems])

    /** Essa função é executada sempre um item(aceito como item soltável) é sortado no painel */
    const onDropFlowItem = useCallback((item: any, monitor: DropTargetMonitor) => {

        // Deseleciona qualquer outro item que esteja selecionado no fluxo.
        flowItems.list.forEach((item: FlowItem) => item.isSelected = false);

        const target: any = editorPanelRef.current;
        const targetSize: any = target.getBoundingClientRect();
        const draggedOffSet: any = monitor.getClientOffset();
        const targetOffsetY: number = ((draggedOffSet.y) + (targetSize.top - targetSize.top - targetSize.top) - 25);
        const targetOffsetX: number = ((draggedOffSet.x) + (targetSize.left - targetSize.left - targetSize.left) - 25);

        let newItem = new FlowItem({
            left: Math.round(targetOffsetX / 15) * 15,
            top: Math.round(targetOffsetY / 15) * 15,
            itemType: item.itemProps.itemType,
            id: Utils.getUUID().toString(),
            name: item.itemProps.title,
            isSelected: true,
            connections: [],
        });

        /** Espera o retorno para inserir o item, se receber undefined só insere, se for diferente de undefined insere o resultado do event se existir algo */
        const onDropRes = onDropItem(item.id, (newItem.id || Utils.getUUID()), newItem);
        if (onDropRes === undefined) {

            flowItems.list.push(newItem);
            setFlowItems({ list: flowItems.list });

            editorPanelRef.current.focus();
            onChangeFlow();

        } else if (onDropRes) {

            flowItems.list.push(onDropRes)
            setFlowItems({ list: flowItems.list });

            editorPanelRef.current.focus();
            onChangeFlow();

        }

    }, [flowItems.list, onChangeFlow, onDropItem]);

    /**
     * Depois que um elemento já está na tela, esta função muda a posição dele!
     * @param mousePositionTop Posição do mouse com relação ao topo(top) do quadro do editor
     * @param mousePositionLeft Posição do mouse com relação a esquerda(left) do quadro do editor
     * @param event Evento de mouse move
     */
    const onChangePositionItems = useCallback((mousePositionTop: number, mousePositionLeft: number, itemId: string | undefined, e?: any) => {

        let selectedItems = flowItems.list.filter((item: FlowItem) => item.isSelected).sort((a, b) => ((a.top + b.top) - (a.left + b.left)));
        const targetItem = selectedItems.find(selectedItem => selectedItem.id === itemId);
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

        // Muda a posição de todos os items que estão selecionados
        selectedItems.forEach(comp => {
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

        setFlowItems({ list: flowItems.list });
    }, [flowItems.list, snapGridWhileDragging])

    /**
     * Função usada para adicionar, remove e atualizar sucessores dos items arrastáveis
     * @param itemId string | undefined Item antecessore(pai)
     * @param sucessorId string id do item que será usado como sucessor
     * @param branchIndex number | undefined se vim undefined é adicionado um novo sucessor, se não está atualizando ou removendo
     */
    const changeConnections = useCallback((itemId: string | undefined, connectionId: string, oldConnectionId: string | undefined) => {

        /** Item em que está sendo feita as mudanças nos sucessores */
        const itemCurrent = flowItems.list.find((item: FlowItem) => item.id === itemId);
        if (!itemCurrent) return;

        // Se tentar ligar um item nele mesmo deve ser excluida a ligação.
        if (itemId === connectionId || itemId === undefined) {
            if (oldConnectionId === undefined) return;

            const connectionCurrentIndex = itemCurrent.connections.findIndex(connection => connection.connectionId === oldConnectionId);
            if (connectionCurrentIndex >= 0) {
                itemCurrent.connections.splice(connectionCurrentIndex, 1);
            }

            setFlowItems({ list: flowItems.list });
            onChangeFlow();
            return;
        }

        /** Se for um comentário, não realiza o link como sucessor */
        const targetItem = flowItems.list.find(target => target.id === connectionId);
        if (!targetItem) {
            return;
        } else {
            if (targetItem.itemType === ItemType.COMMENT) {
                return;
            } else if (targetItem.itemType === ItemType.START && itemCurrent.itemType !== ItemType.COMMENT) {
                return;
            }
        }

        // No caso do oldConnectionId estar undefined significa que é um novo branch.
        // Caso se o item já esteja na lista como sucessor, substitui o id.
        if (oldConnectionId === undefined && !itemCurrent.connections.some(connection => connectionId === connection.connectionId)) {
            itemCurrent.connections.push({
                connectionId: connectionId,
                id: Utils.getUUID(),
            });
        } else if (oldConnectionId !== undefined) {

            const connectionCurrentIndex = itemCurrent.connections.findIndex(connection => connection.connectionId === oldConnectionId);
            itemCurrent.connections[connectionCurrentIndex].connectionId = connectionId;

        }

        setFlowItems({ list: flowItems.list });
        onChangeFlow();

    }, [flowItems.list, onChangeFlow])

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
            /** Ctrl + d */ if (event.ctrlKey && (event.key === 'd')) { duplicateSelecteds(); event.preventDefault(); }

            if (event.key === 'ArrowUp') { positionChangeByKey("ArrowUp"); event.preventDefault(); };
            if (event.key === 'ArrowDown') { positionChangeByKey("ArrowDown"); event.preventDefault(); };
            if (event.key === 'ArrowLeft') { positionChangeByKey("ArrowLeft"); event.preventDefault(); };
            if (event.key === 'ArrowRight') { positionChangeByKey("ArrowRight"); event.preventDefault(); };
        }

        /** */
        const duplicateSelecteds = () => {
            copySelecteds();
            pasteSelecteds();
        }

        /** Copia os items de fluxo selecionados */
        const copySelecteds = () => {
            const components = flowItems.list.filter((item: FlowItem) => item.isSelected);

            inputCopyRef.current.value = JSON.stringify(components);
            inputCopyRef.current.focus()
            inputCopyRef.current.select()
            document.execCommand('copy');
            editorPanelRef.current.focus()

        }

        /** Cola os items de fluxo na área de transferência */
        const pasteSelecteds = () => {

            const findNewPosition = (num: number, type: 'top' | 'left'): number => {

                let index: number = 0;
                if (type === 'left') {
                    index = flowItems.list.findIndex((item: FlowItem) => {

                        const isEquals = (item.left === num); // Posição exata já é usada?
                        if (isEquals) return true;

                        const x1IsUsed = (item.left >= (num - 100)); // Posição maior que x1 é usada?
                        const x2IsUsed = (item.left <= (num + 100)); // Posição menor que x2 é usada?

                        if (x2IsUsed && x1IsUsed) return true;

                        return false;

                    });
                }
                else if (type === 'top') {
                    index = flowItems.list.findIndex((item: FlowItem) => {

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

                    flowItems.list.push(new FlowItem(item));

                });

                setFlowItems({ list: flowItems.list });
                onChangeFlow();
            } catch (e) { }

        }

        /** Move o componente pelas setas do teclado. */
        const positionChangeByKey = (direction: string) => {
            let filteredList: FlowItem[] = flowItems.list.filter((item: FlowItem) => item.isSelected === true);
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

            setFlowItems({ list: flowItems.list });
            onChangeFlow();
        }

        /** Seleciona todos os items da tela */
        const selectAll = () => {
            flowItems.list.forEach((item: FlowItem) => {
                item.isSelected = true;
            });

            setFlowItems({ list: flowItems.list });
            onChangeFlow();
        }

        /** Remove o item que estiver selecionado no fluxo. */
        const onRemoveItem = () => {

            /** Index do item selecionado que está sendo removido */
            const itemCurrentIndex = flowItems.list.findIndex((item: FlowItem) => item.isSelected);
            if (itemCurrentIndex === -1) return;

            /** Index do item antecessor ao item que será removido */
            const itemAntecessorIndex = flowItems.list.findIndex((item: FlowItem) => item.connections.some(connection => connection.connectionId === flowItems.list[itemCurrentIndex].id));
            if (itemAntecessorIndex !== -1) { flowItems.list[itemAntecessorIndex].connections[0].connectionId = '0'; }

            flowItems.list.splice(itemCurrentIndex, 1);

            setFlowItems({ list: flowItems.list });

            onRemoveItem(); // Remove mais items se estiverem selecionado.

            onChangeFlow();
        }

    }

    /** Desabilita qualquer item que esteja selecionado. */
    const onMouseDown = useCallback((e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {

        if (e.ctrlKey) {
            flowItems.list.forEach((item: FlowItem) => {
                if (item.id === e.currentTarget.id) {
                    item.isSelected = !item.isSelected;
                }
            });
        } else {
            const flowItemSelecteds = flowItems.list.filter(item => item.isSelected);
            const keepMultiselect = flowItemSelecteds.length > 1 && flowItemSelecteds.some(item => item.id === e.currentTarget.id);

            if (!keepMultiselect) {
                flowItems.list.forEach((item: FlowItem) => {
                    if (item.id === e.currentTarget.id) {
                        item.isSelected = true;
                    } else {
                        item.isSelected = false;
                    }
                });
            }
        }

        setFlowItems({ list: flowItems.list });
        onChangeFlow();

    }, [flowItems.list, onChangeFlow]);

    /** Para inputs que estão no meio do fluxo */
    const itemNameChange = useCallback((text: string, index: number) => {
        flowItems.list[index].name = text;
        setFlowItems({ list: flowItems.list });
        onChangeFlow();
    }, [flowItems.list, onChangeFlow]);

    return (
        <div className="full-width" onMouseOver={(e: any) => onMouseOver && onMouseOver(e)}>
            <InputCopy ref={inputCopyRef} />
            <Toolbar itemsLogica={toolItems} isShow={((toolItems.length > 0) && showToolbar)} />
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

                    {(!enabledSelection && flowItems.list.length === 0)
                        && <foreignObject width={"100%"} height={"100%"}>
                            <div className="full-height full-width flex-items-center flex-content-center opacity-5">
                                <header>{emptyMessage || "Double-click on an item in the tree to edit it"}</header>
                            </div>
                        </foreignObject>
                    }

                    {/* Reinderiza as linhas dos items arrastáveis da tela. */}
                    {flowItems.list.map((item: FlowItem, index) => {

                        const itemsConnections: FlowItem[] = flowItems
                            .list.filter((sucessorItem: FlowItem) => (sucessorItem.id !== undefined)
                                ? item.connections.some(connection => sucessorItem.id === connection.connectionId)
                                : false
                            );

                        /* Reinderiza todos os branchs de um item de fluxo. */
                        return <Lines
                            key={index}
                            item={item}
                            disableOpacity={disableOpacity}
                            itemsConnections={itemsConnections}
                            onChangeConnections={changeConnections}
                            isUseNewBranch={InternalUtils.useNewBranch(itemsConnections.length, item.itemType)}
                        />;

                    })}

                    {/* Reinderiza os items arrastáveis na tela! */}
                    {flowItems.list.map((item: FlowItem, index) => (
                        <ItemToDrag
                            onContextMenu={(data, e) => { e?.stopPropagation(); (onContextMenu && enabledSelection) && onContextMenu(data, e) }}
                            onNameChange={text => itemNameChange(text, index)}
                            onChangePosition={onChangePositionItems}
                            parentElementRef={editorPanelRef}
                            onMouseUp={() => onChangeFlow()}
                            disableOpacity={disableOpacity}
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
                            flowItems.list.forEach((item: FlowItem) => item.select(coords));
                            setFlowItems({ list: flowItems.list });
                        }}
                    />
                </EditorPanel>
            </main>
        </div>
    );

}

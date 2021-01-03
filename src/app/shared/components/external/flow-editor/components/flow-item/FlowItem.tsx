import React, { useCallback, useRef } from 'react';

import { useDragAllElements, useConfigs, useSelectItemById } from '../../shared/hooks';
import { IFlowItem } from '../../shared/interfaces';
import { EFlowItemType } from '../../shared/enums';
import { Acorn } from './acorn/Acorn';
import { Comment } from './Comment';

interface FlowProps {
    item: IFlowItem;
    parentRef: React.RefObject<SVGSVGElement>;
    onContextMenu?(event: React.MouseEvent<SVGGElement, MouseEvent>): void;
}
export const FlowItem: React.FC<FlowProps> = ({ item: flowItem, parentRef, onContextMenu }) => {
    const { snapGridWhileDragging } = useConfigs();
    const dragAllFlowItems = useDragAllElements();
    const selectItemById = useSelectItemById();

    /**
     * Ajuda a evitar que bugs aconteçam por estar uma fun declarada
     * na ref do svg que está no container de fora.
     *
     * Também serve para fechar o menu de contexto.
     */
    const handleMouseUp = useCallback((e: MouseEvent) => {
        e.stopPropagation();
        window.onmousemove = null;
        window.onmouseup = null;

        document.body.style.pointerEvents = 'unset';
        if (parentRef.current) {
            parentRef.current.style.pointerEvents = 'auto';
        }
    }, [parentRef]);

    /** Stores the position where the flow item item was clicked. */
    let cliquedLocationFlowItem = useRef({ top: 0, left: 0 });

    /** When an item is selected and dragged on the tale this fun will make it happen. */
    const handleMouseMove = useCallback((e: MouseEvent) => {
        e.stopPropagation();

        const top = e.offsetY - cliquedLocationFlowItem.current.top;
        const left = e.offsetX - cliquedLocationFlowItem.current.left;

        dragAllFlowItems(flowItem.id.value, top, left, snapGridWhileDragging);
    }, [flowItem.id, snapGridWhileDragging, dragAllFlowItems]);

    /** Declara a fun no ref da svg para que o item atual possa ser arrastado na tela. */
    const handleMouseDown = useCallback((e: React.MouseEvent<SVGGElement, MouseEvent>) => {
        e.stopPropagation();

        document.body.style.pointerEvents = 'none';
        if (parentRef.current) {
            parentRef.current.style.pointerEvents = 'auto';
        }

        cliquedLocationFlowItem.current = {
            top: e.nativeEvent.offsetY - flowItem.top.value,
            left: e.nativeEvent.offsetX - flowItem.left.value,
        }

        // Select the item and emit OnChange event
        selectItemById(flowItem.id.value, e.ctrlKey);

        window.onmousemove = handleMouseMove;
        window.onmouseup = handleMouseUp;
    }, [parentRef, flowItem, handleMouseMove, handleMouseUp, selectItemById]);

    switch (flowItem.flowItemType.value) {
        case EFlowItemType.acorn:
            return (
                <Acorn
                    item={flowItem}
                    parentRef={parentRef}
                    onMouseDown={handleMouseDown}
                    onContextMenu={onContextMenu}
                />
            );
        case EFlowItemType.comment:
            return (
                <Comment
                    item={flowItem}
                    parentRef={parentRef}
                    onMouseDown={handleMouseDown}
                    onContextMenu={onContextMenu}
                />
            );
        default:
            return null;
    }
};

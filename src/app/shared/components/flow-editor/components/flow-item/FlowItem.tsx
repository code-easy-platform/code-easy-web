import React, { useCallback, useRef, memo } from 'react';

import { useFlowItem, useDragAllElements, useSelectItemById, useConfigs } from '../../shared/hooks';
import { emitOnChange } from '../on-change-emitter';
import { EFlowItemType } from '../../shared/enums';
import { Acorn } from './acorn/Acorn';
import { Comment } from './Comment';

interface FlowProps {
    id: string;
    parentRef: React.RefObject<SVGSVGElement>;
    onContextMenu?(event: React.MouseEvent<SVGGElement, MouseEvent>): void;
}
const FlowItem: React.FC<FlowProps> = ({ id, parentRef, onContextMenu }) => {
    const { snapGridWhileDragging } = useConfigs();
    const dragAllFlowItems = useDragAllElements();
    const selectItemById = useSelectItemById();
    const [flowItem] = useFlowItem(id);

    /**
     * Ajuda a evitar que bugs aconteçam por estar uma fun declarada
     * na ref do svg que está no container de fora.
     *
     * Também serve para fechar o menu de contexto.
     */
    const mouseUp = useCallback((e: MouseEvent) => {
        e.stopPropagation();
        window.onmousemove = null;
        window.onmouseup = null;

        document.body.style.pointerEvents = 'unset';
        if (parentRef.current) {
            parentRef.current.style.pointerEvents = 'auto';
        }

        emitOnChange();
    }, [parentRef]);

    /** Stores the position where the flow item item was clicked. */
    let cliquedLocationFlowItem = useRef({ top: 0, left: 0 });

    /** When an item is selected and dragged on the tale this fun will make it happen. */
    const mouseMove = useCallback((e: MouseEvent) => {
        e.stopPropagation();

        const top = e.offsetY - cliquedLocationFlowItem.current.top;
        const left = e.offsetX - cliquedLocationFlowItem.current.left;

        dragAllFlowItems(flowItem.id, top, left, snapGridWhileDragging);
    }, [flowItem.id, snapGridWhileDragging, dragAllFlowItems]);

    /** Declara a fun no ref da svg para que o item atual possa ser arrastado na tela. */
    const mouseDown = useCallback((e: React.MouseEvent<SVGGElement, MouseEvent>) => {
        e.stopPropagation();

        document.body.style.pointerEvents = 'none';
        if (parentRef.current) {
            parentRef.current.style.pointerEvents = 'auto';
        }

        cliquedLocationFlowItem.current = {
            top: e.nativeEvent.offsetY - (flowItem?.top || 0),
            left: e.nativeEvent.offsetX - (flowItem?.left || 0),
        };

        // Select the item and emit OnChange event
        selectItemById(flowItem.id, e.ctrlKey);

        window.onmousemove = mouseMove;
        window.onmouseup = mouseUp;
    }, [parentRef, flowItem, mouseMove, mouseUp, selectItemById]);

    switch (flowItem.flowItemType) {
        case EFlowItemType.acorn:
            if (!flowItem) return null;
            return (
                <Acorn
                    item={flowItem}
                    parentRef={parentRef}
                    onMouseDown={mouseDown}
                    onContextMenu={onContextMenu}
                />
            );
        case EFlowItemType.comment:
            if (!flowItem) return null;
            return (
                <Comment
                    item={flowItem}
                    parentRef={parentRef}
                    onMouseDown={mouseDown}
                    onContextMenu={onContextMenu}
                />
            );
        default:
            return <></>;
    }
};

export default memo(FlowItem);

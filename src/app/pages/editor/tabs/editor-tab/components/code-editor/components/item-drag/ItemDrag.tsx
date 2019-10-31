import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import { FluxoComponentTypes } from '../../enuns/FluxoList';

const style: React.CSSProperties = {
    position: 'absolute',
    border: '1px solid gray',
    backgroundColor: 'gray',
    padding: '0.5rem 1rem',
    cursor: 'move',
}

export interface ItemDragProps {
    id?: any
    left?: number
    top?: number
    width?: number
    height?: number
    border?: number
    title: string
    hideSourceOnDrag?: boolean
    allowDrag?: boolean
    refItemPai?: any
    outputPosition: Function
}

export const ItemToDrag: React.FC<ItemDragProps> = ({ id, left, top, width, height, border, title, allowDrag, refItemPai, outputPosition, children }) => {
    const [{ isDragging }, dragRef] = useDrag({
        item: { type: FluxoComponentTypes.flowItem, itemDetail: { id, left, top, title } },
        collect: monitor => ({ isDragging: monitor.isDragging() }),
    });

    const [isSelecionado, setIsSelecionado] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    window.onmouseup = () => mouseUp;
    window.onmousedown = () => {
        if (isMenuOpen)
            setIsMenuOpen(false);
    };

    const mouseDown = () => {
        setIsSelecionado(true);
        if (refItemPai.current)
            refItemPai.current.onmousemove = mouseMove;
    }

    const mouseUp = () => {
        setIsSelecionado(false);
        if (refItemPai.current)
            refItemPai.current.onmousemove = null;
    }

    const mouseMove = (event: any) => {
        outputPosition({
            itemId: id,
            top: event.clientY - (40 + ((height || 0) / 2)),
            left: event.clientX - (150 + ((width || 0) / 2))
        });
    }

    const contextMenu = (event: any) => {
        setIsMenuOpen(true);
        event.preventDefault();
    }

    if (allowDrag)
        return <div id={id} ref={dragRef} style={{ ...style, left, top, backgroundColor: isDragging ? "blue" : "gray" }}>{children}</div>;
    else
        return (
            <>
                <rect
                    id={id}
                    y={top}
                    x={left}
                    ry={border}
                    rx={border}
                    width={width}
                    height={height}
                    style={{ ...style, fill: "gray", stroke: isSelecionado ? "blue" : "gray", strokeWidth: 1 }}
                    onContextMenu={contextMenu}
                    onMouseDown={mouseDown}
                    onMouseUp={mouseUp}
                ></rect>
            </>
        );

}

import React, { useState } from 'react';
import { useDrag } from 'react-dnd';

const style: React.CSSProperties = {
    position: 'absolute',
    border: '1px solid gray',
    backgroundColor: 'gray',
    padding: '0.5rem 1rem',
    cursor: 'move',
}

export const ItemTypes = {
    BOX: 'box',
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
    outputPosition: Function
}

export const ItemToDrag: React.FC<ItemDragProps> = ({ id, left, top, width, height, border, title, allowDrag, outputPosition, children }) => {
    const [{ isDragging }, dragRef] = useDrag({
        item: { type: ItemTypes.BOX, itemDetail: { id, left, top, title } },
        collect: monitor => ({ isDragging: monitor.isDragging() }),
    });

    const [isSelecionado, setIsSelecionado] = useState(false);
    
    let elemento: any;

    window.onmouseup = () => mousePress(false);

    const mousePress = (value: boolean) => {
        setIsSelecionado(value);
        if (value) {
            try {
                elemento = window.document.getElementById("CODEEDITOR") || <div></div>;
                elemento.onmousemove = mouseMove;
            } catch (e) { }
        } else {
            try {
                elemento = window.document.getElementById("CODEEDITOR") || <div></div>;
                elemento.onmousemove = null;
            } catch (e) { }
        }
    }

    const mouseMove = (event: any) => {
        outputPosition({
            itemId: id,
            top: event.clientY - (40 + ((height || 0) / 2)),
            left: event.clientX - (150 + ((width || 0) / 2))
        });
    }

    if (allowDrag)
        return <div id={id} ref={dragRef} style={{ ...style, left, top, backgroundColor: isDragging ? "blue" : "gray" }}>{children}</div>;
    else
        return (
            <rect
                id={id}
                y={top}
                x={left}
                width={width}
                height={height}
                ry={border}
                rx={border}
                style={{ ...style, fill: "gray", stroke: isSelecionado ? "blue" : "gray", strokeWidth: 1}}
                onMouseDown={() => mousePress(true)}
                onMouseUp={() => mousePress(false)}
            >
                <text x={top} y={left} style={{zIndex: 100}} fill="white">{children}</text>
            </rect>
        );

}

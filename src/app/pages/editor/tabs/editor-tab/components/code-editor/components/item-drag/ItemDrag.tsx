import React, { useState } from 'react';
import { useDrag } from 'react-dnd';

const style: React.CSSProperties = {
    position: 'absolute',
    border: '1px solid gray',
    backgroundColor: 'gray',
    padding: '0.5rem 1rem',
    cursor: 'move',
    height: '50px',
}

export const ItemTypes = {
    BOX: 'box',
}

export interface ItemDragProps {
    id?: any
    left?: number
    top?: number
    title: string
    hideSourceOnDrag?: boolean
    allowDrag?: boolean
    outputPosition: Function
}

export const ItemToDrag: React.FC<ItemDragProps> = ({ id, left, top, title, allowDrag, outputPosition, children }) => {

    var elemento: any;

    const [itemTop, setItemTop] = useState<number>(top || 0);
    const [itemLeft, setItemLeft] = useState<number>(left || 0);

    const mousePress = (value: boolean) => {
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

    window.onmouseup = () => mousePress(false);

    const mouseMove = (event: any) => {
        outputPosition({ itemId: id, top: event.clientY - 40, left: event.clientX - (150 + ((60 || 0) / 2)) });
        setItemTop(event.clientY - 40);
        setItemLeft(event.clientX - (150 + ((60 || 0) / 2)));
    }

    const [{ isDragging }, dragRef] = useDrag({
        item: { type: ItemTypes.BOX, itemDetail: { id, left, top, title } },
        collect: monitor => ({ isDragging: monitor.isDragging() }),
    });

    if (allowDrag)
        return <div id={id} ref={dragRef} style={{ ...style, left, top, backgroundColor: isDragging ? "blue" : "gray" }}>{children}</div>;
    else
        return <div
            id={id}
            onMouseDown={() => mousePress(true)}
            style={{ ...style, left: itemLeft, top: itemTop, backgroundColor: isDragging ? "blue" : "gray" }}
            title={title}
        >
            {children}
        </div>;
}

import React, { useRef } from 'react';
import { ConnectDragSource, DragSource, useDrag } from 'react-dnd';

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
}

export const ItemToDrag: React.FC<ItemDragProps> = ({ id, left, top, title, allowDrag, children }) => {

    const [{ isDragging }, dragRef] = useDrag({
        item: { type: ItemTypes.BOX, itemDetail: { id, left, top, title } },
        collect: monitor => ({ isDragging: monitor.isDragging() }),
    });

    if (allowDrag)
        return <div ref={dragRef} style={{ ...style, left, top, backgroundColor: isDragging ? "blue" : "" }}>{children}</div>;
    else
        return <div
            style={{ ...style, left, top, backgroundColor: isDragging ? "blue" : "" }}
            title={title}
        >
            {children}
        </div>;
}

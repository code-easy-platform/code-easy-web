import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import { FluxoComponentTypes } from '../../enuns/FluxoList';
import ComponentType from '../../../../../../../shared/enuns/ComponentType';
import { Line } from '../../../../../../../shared/components/lines/Line';

const style: React.CSSProperties = {
    position: 'absolute',
    border: '1px solid gray',
    backgroundColor: 'gray',
    padding: '0.5rem 1rem',
    cursor: 'move',
}

export interface ItemDragProps {
    id?: any
    top?: number
    left?: number
    title: string
    width?: number
    height?: number
    border?: number
    children?: any
    refItemPai?: any
    allowDrag?: boolean
    lineTargetTop?: number
    lineTargetLeft?: number
    componentType?: ComponentType
    hideSourceOnDrag?: boolean

    onSucessorChange?: Function
    outputPosition: Function
}

export const ItemToDrag: React.FC<ItemDragProps> = (props: ItemDragProps) => {
    const { lineTargetLeft, lineTargetTop } = props;
    const { componentType, outputPosition } = props;
    const { allowDrag, refItemPai, children } = props;
    const { width, height, border } = props;
    const { id, top, left, title } = props;
    const { onSucessorChange } = props;

    const [internalPosition, setInternalPosition] = useState({ top: top, left: left });
    const [isSelecionado, setIsSelecionado] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [{ isDragging }, dragRef] = useDrag({
        item: { type: componentType || FluxoComponentTypes.flowItem, itemDetail: { id, left, top, title } },
        collect: monitor => ({ isDragging: monitor.isDragging() }),
    });

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

    const mouseUp = (event: any) => {
        outputPosition({
            itemId: id,
            top: event.clientY - (40 + ((height || 0) / 2)),
            left: event.clientX - (150 + ((width || 0) / 2))
        });
        setIsSelecionado(false);
        if (refItemPai.current)
            refItemPai.current.onmousemove = null;
    }

    const mouseMove = (event: any) => {
        setInternalPosition({
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
            <g key={id} id={id}>
                <text x={internalPosition.left} y={(internalPosition.top || 0) - 5}>{title}</text>
                <rect
                    id={id}
                    y={internalPosition.top}
                    x={internalPosition.left}
                    ry={border}
                    rx={border}
                    width={width}
                    height={height}
                    style={{ ...style, fill: "gray", stroke: isSelecionado ? "blue" : "gray", strokeWidth: 1 }}
                    onContextMenu={contextMenu}
                    onMouseDown={mouseDown}
                    onMouseUp={mouseUp}
                ></rect>
                <Line
                    id={id}
                    key={id}
                    color="gray"
                    top1={(internalPosition.top || 0) + (height || 0) - 15}
                    left1={(internalPosition.left || 0) + ((width || 0) / 2)}
                    top2={(lineTargetTop || 0)}
                    left2={(lineTargetLeft || 0)}
                    onSucessorChange={onSucessorChange}
                    refItemPai={refItemPai}
                />
            </g>
        );

}

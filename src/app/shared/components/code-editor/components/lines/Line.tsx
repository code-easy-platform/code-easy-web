import React, { useState } from 'react';

/** Propriedades aceitas pela linha. */
interface LineProps {
    id: string
    top1: number
    top2?: number
    left1: number
    left2?: number
    color?: string
    refItemPai: any
    lineWidth?: number
    sucessorIndex?: number
    onSucessorChange?: Function
}

export const Line: React.FC<LineProps> = (props: LineProps) => {
    const onSucessorChange: Function = props.onSucessorChange || (() => { });
    const { lineWidth = 2, color = "blue", left1, left2 = 0 } = props;
    const { id = "0", top1 = 0, top2 = 0, sucessorIndex = 999999 } = props;
    const refItemPai: any = props.refItemPai;

    const polygonBottonCenter: number = left2;
    const polygonRight: number = (left2 + 5);
    const polygonLeft: number = (left2 - 5);
    const polygonTop: number = (top2 - 10);
    const polygonBotton: number = top2;


    const [isSelected, setIsSelected] = useState(false);
    const [position, setPosition] = useState({ polygonTop: polygonTop, polygonLeft: polygonLeft });

    window.onmouseup = (event: any) => {
        if (event.target.id && isSelected)
            onSucessorChange(id, event.target.id, sucessorIndex);
        onMouseEvent(false);
    }

    const onMouseEvent = (value: boolean) => {
        setIsSelected(value);
        if (value) {
            refItemPai.current.onmousemove = mouseMove;
        } else {
            refItemPai.current.onmousemove = null;
        }
    }

    const mouseMove = (event: any) => {
        setPosition({
            polygonTop: event.offsetY,
            polygonLeft: event.offsetX,
        });
    }

    return (
        <g key={"g_line_key_" + id} id={"g_line_key_" + id} fill="none">
            <line
                id={"line_" + id}
                key={"line_" + id}
                x1={left1}
                x2={isSelected ? position.polygonLeft : left2}
                y1={top1}
                y2={isSelected ? position.polygonTop : top2 - 10}
                strokeWidth={lineWidth}
                stroke={color || "blue"}
                stroke-line-cap="round"
            />
            {
                !isSelected
                    ? <polygon
                        id={id}
                        key={"polygon_" + id}
                        points={
                            polygonLeft + ", " +
                            polygonTop + ", " +
                            polygonRight + ", " +
                            polygonTop + ", " +
                            polygonBottonCenter + ", " +
                            polygonBotton
                        }
                        style={{
                            cursor: 'move',
                            fill: color || "blue",
                            strokeWidth: lineWidth,
                            stroke: color || "blue",
                        }}
                        onMouseDown={() => onMouseEvent(true)}
                        onMouseUp={() => onMouseEvent(false)}
                    />
                    : <rect
                        id={id}
                        ry="50"
                        rx="50"
                        width="10"
                        height="10"
                        key={"rect_" + id}
                        y={position.polygonTop - 5}
                        x={position.polygonLeft - 5}
                        onMouseUp={() => onMouseEvent(false)}
                        onMouseDown={() => onMouseEvent(true)}
                        style={{ cursor: 'default', fill: "#1e1e1e", stroke: isSelected ? "#999fff" : "gray", strokeWidth: 1 }}
                    />
            }
        </g>
    );
}

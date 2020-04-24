import React, { useState } from 'react';

/** Propriedades aceitas pela linha. */
interface LineProps {
    id: string
    top1: number
    top2?: number
    left1: number
    left2?: number
    color?: string
    lineWidth?: number
    parentElementRef: any
    sucessorIndex?: number
    onSucessorChange?: Function
}

export const Line: React.FC<LineProps> = (props: LineProps) => {
    const { lineWidth = 2, color = "var(--main-background-highlighted)", left1, left2 = 0 } = props;
    const onSucessorChange: Function = props.onSucessorChange || (() => { });
    const { id = "0", top1 = 0, top2 = 0, sucessorIndex = 999999 } = props;

    const polygonBottonCenter: number = left2;
    const polygonRight: number = (left2 + 5);
    const polygonLeft: number = (left2 - 5);
    const polygonTop: number = (top2 - 10);
    const polygonBotton: number = top2;

    const [position, setPosition] = useState({ polygonTop: polygonTop, polygonLeft: polygonLeft });
    const [isSelected, setIsSelected] = useState(false);


    const onMouseDown = () => {
        setIsSelected(true);

        window.onmousemove = mouseMove;
        window.onmouseup = onMouseUp
    }

    const onMouseUp = (e: any) => {
        setIsSelected(false);

        window.onmouseup = null;
        window.onmousemove = null;

        onSucessorChange(id, e.target.id, sucessorIndex);
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
                stroke-line-cap="round"
                strokeWidth={lineWidth}
                stroke={color || "var(--main-background-highlighted)"}
            />
            {
                !isSelected
                    ? <polygon
                        id={id}
                        key={"polygon_" + id}
                        onMouseDown={onMouseDown}
                        style={{
                            cursor: 'move',
                            strokeWidth: lineWidth,
                            fill: color || "var(--main-background-highlighted)",
                            stroke: color || "var(--main-background-highlighted)",
                        }}
                        points={
                            polygonLeft + ", " +
                            polygonTop + ", " +
                            polygonRight + ", " +
                            polygonTop + ", " +
                            polygonBottonCenter + ", " +
                            polygonBotton
                        }
                    />
                    : <rect
                        id={id}
                        ry="50"
                        rx="50"
                        width="10"
                        height="10"
                        key={"rect_" + id}
                        onMouseDown={onMouseDown}
                        y={position.polygonTop - 5}
                        x={position.polygonLeft - 5}
                        style={{
                            cursor: 'default',
                            fill: "var(--main-background)",
                            strokeWidth: 'var(--main-border-width)',
                            stroke: isSelected ? "var(--color-botton-bar)" : "var(--main-background)",
                        }}
                    />
            }
        </g>
    );

}

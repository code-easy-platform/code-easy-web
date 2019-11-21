import React, { useState } from 'react';

const style: React.CSSProperties = {
    position: 'absolute',
    border: '1px solid gray',
    backgroundColor: 'gray',
    padding: '0.5rem 1rem',
    cursor: 'move',
}

interface LineProps {
    id: string
    top1: number
    top2?: number
    left1: number
    left2?: number
    color?: string
    refItemPai: any
    lineWidth?: number
    onSucessorChange?: Function
}

export const Line: React.FC<LineProps> = (props: LineProps) => {
    const { id="0", top1=0, top2=0  }= props;
    const { lineWidth=1, color="blue", left1, left2=0 }= props;
    const refItemPai: any = props.refItemPai;
    const onSucessorChange: Function = props.onSucessorChange || (() => {});

    const polygonTop: number = (top2 - 10);
    const polygonBotton: number = top2;
    const polygonLeft: number = (left2 - 5);
    const polygonRight: number = (left2 + 5);
    const polygonBottonCenter: number = left2;

    const [isSelecionado, setIsSelecionado] = useState(false);
    const [position, setPosition] = useState({ polygonTop: polygonTop, polygonLeft: polygonLeft });

    window.onmouseup = (event: any) => {
        onMouseEvent(false);
        if (event.target.id)
            onSucessorChange(id, event.target.id);
    }

    const onMouseEvent = (value: boolean) => {
        setIsSelecionado(value);
        if (value)
            refItemPai.current.onmousemove = mouseMove;
        else
            refItemPai.current.onmousemove = null;
    }

    const mouseMove = (event: any) => {
        console.log(event);
        setPosition({
            polygonTop: event.clientY - (45),
            polygonLeft: event.clientX - (155)
        });
    }

    return (
        <g fill="none">
            <line
                id={id}
                x1={left1}
                x2={isSelecionado ? position.polygonLeft : left2}
                y1={top1}
                y2={isSelecionado ? position.polygonTop : top2 - 10}
                strokeWidth={lineWidth}
                stroke={color || "blue"}
                stroke-line-cap="round"
            />
            {
                !isSelecionado
                    ? <polygon
                        id={id}
                        points={
                            polygonLeft + ", " +
                            polygonTop + ", " +
                            polygonRight + ", " +
                            polygonTop + ", " +
                            polygonBottonCenter + ", " +
                            polygonBotton
                        }
                        style={{ fill: color || "blue", stroke: color || "blue", strokeWidth: lineWidth }}
                        onMouseDown={() => onMouseEvent(true)}
                    />
                    : <rect
                        ry="50"
                        rx="50"
                        width="20"
                        height="20"
                        y={position.polygonTop - 10}
                        x={position.polygonLeft - 5}
                        onMouseUp={() => onMouseEvent(false)}
                        onMouseDown={() => onMouseEvent(true)}
                        style={{ ...style, fill: "gray", stroke: isSelecionado ? "blue" : "gray", strokeWidth: 1 }}
                    />
            }
        </g>
    );
}

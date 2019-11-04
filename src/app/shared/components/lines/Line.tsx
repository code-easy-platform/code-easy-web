import React, { useState } from 'react';

const style: React.CSSProperties = {
    position: 'absolute',
    border: '1px solid gray',
    backgroundColor: 'gray',
    padding: '0.5rem 1rem',
    cursor: 'move',
}

export const Line = (props: any) => {
    const isHaveSucessor: boolean = props.isHaveSucessor && props.sucessorId !== 0;
    const refItemPai: any = props.refItemPai;
    const id: any = props.id;
    const onSucessorChange: Function = props.onSucessorChange;

    const top1: number = props.top1;
    const top2: number = isHaveSucessor ? props.top2 : props.top1 + 30;
    const left1: number = props.left1;
    const left2: number = isHaveSucessor ? props.left2 : props.left1;
    const width: number = props.width;
    const color: string = props.color;

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
                strokeWidth={width || 1}
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
                        style={{
                            fill: color || "blue",
                            stroke: color || "blue",
                            strokeWidth: width || 1
                        }}
                        onMouseDown={() => onMouseEvent(true)}
                    />
                    : <rect
                        y={position.polygonTop - 10}
                        x={position.polygonLeft - 5}
                        width="20"
                        height="20"
                        ry="50"
                        rx="50"
                        style={{ ...style, fill: "gray", stroke: isSelecionado ? "blue" : "gray", strokeWidth: 1 }}
                        onMouseDown={() => onMouseEvent(true)}
                        onMouseUp={() => onMouseEvent(false)}
                    />
            }
        </g>
    );
}

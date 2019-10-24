import React, { useState } from 'react';

const style: React.CSSProperties = {
    position: 'absolute',
    border: '1px solid gray',
    backgroundColor: 'gray',
    padding: '0.5rem 1rem',
    cursor: 'move',
}

export const Line = (props: any) => {    
    const top1: number = props.top1;
    const top2: number = props.top2;
    const left1: number = props.left1;
    const left2: number = props.left2;
    const width: number = props.width;
    const color: string = props.color;

    const polygonTop: number = (top2 - 10);
    const polygonBotton: number = top2;
    const polygonLeft: number = (left2 - 5);
    const polygonRight: number = (left2 + 5);
    const polygonBottonCenter: number = left2;

    const [ isSelecionado, setIsSelecionado ] = useState(false);
    const [ position, setPosition ] = useState({polygonTop: polygonTop, polygonLeft: polygonLeft});

    let elemento: any;
    window.onmouseup = () => onMouseEvent(false);
    const onMouseEvent = (value: boolean) => {
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
        setPosition({
            polygonTop: event.clientY - (45),
            polygonLeft: event.clientX - (155)
        });
    }

    return (
        <g fill="none">
            <line
                x1={left1}
                x2={isSelecionado ? position.polygonLeft + 10 : left2}
                y1={top1}
                y2={isSelecionado ? position.polygonTop + 10 : top2 - 10}
                strokeWidth={width || 1}
                stroke={color || "blue"}
                stroke-line-cap="round"
            />
            {
                !isSelecionado
                ? <polygon
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
                    style={{ ...style, fill: "gray", stroke: isSelecionado ? "blue" : "gray", strokeWidth: 1}}
                    onMouseDown={() => onMouseEvent(true)}
                    onMouseUp={() => onMouseEvent(false)}
                  />
            }
        </g>
    );
}

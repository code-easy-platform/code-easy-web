import React from 'react';

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

    return (
        <g fill="none">
            <line
                x1={left1}
                x2={left2}
                y1={top1}
                y2={top2 - 10}
                strokeWidth={width || 1}
                stroke={color || "blue"}
                stroke-line-cap="round"
            />
            <polygon
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
            />
        </g>
    );
}

import React from 'react';

export const Line = (props: any) => {
    const top1: number = props.top1;
    const top2: number = props.top2;
    const left1: number = props.left1;
    const left2: number = props.left2;
    const width: number = props.width;
    const color: string = props.color;

    return (
        <svg>
            <line
                x1={left1}
                x2={left2}
                y1={top1}
                y2={top2}
                stroke-width={width}
                stroke={color}
                stroke-line-cap="round"
            />
        </svg>
    );
}



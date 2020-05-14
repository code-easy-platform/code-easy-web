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
    sucessorIndex?: number
    onSucessorChange?: Function
    lineType?: 'dotted' | 'normal'
}

export const Line: React.FC<LineProps> = (props: LineProps) => {
    const { lineWidth = 1, color = "var(--main-background-highlighted)", left1, left2 = 0 } = props;
    const onSucessorChange: Function = props.onSucessorChange || (() => { });
    const { id = "0", sucessorIndex = 999999, lineType = 'normal' } = props;
    let { top1 = 0, top2 = 0 } = props;


    const polygonTop: number = (top2 - 10);
    const polygonRight: number = (left2 + 5);
    const polygonLeft: number = (left2 - 5);
    const polygonBottonCenter: number = left2;
    const polygonBotton: number = top2;


    const [position, setPosition] = useState({ polygonTop: polygonTop, polygonLeft: polygonLeft });
    const [isSelected, setIsSelected] = useState(false);


    let rotate: number = 0;
    // let rotate: number = isSelected ? Utils.getAngle(left1, top1, position.polygonLeft, position.polygonTop) : 0;


    const mouseMove = (event: any) => {
        setPosition({
            polygonTop: event.offsetY,
            polygonLeft: event.offsetX,
        });
    }

    const onMouseUp = (e: any) => {
        setIsSelected(false);

        window.onmouseup = null;
        window.onmousemove = null;

        setPosition({
            polygonTop: top1,
            polygonLeft: top2 - 10,
        });

        onSucessorChange(id, e.target.id, sucessorIndex);
    }

    const onMouseDown = () => {
        setIsSelected(true);

        setPosition({
            polygonTop: top1,
            polygonLeft: top2 - 10,
        });

        window.onmousemove = mouseMove;
        window.onmouseup = onMouseUp
    }

    return (
        <>
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
                strokeDasharray={lineType === 'normal' ? undefined : "5,5"}
            />
            {
                !isSelected
                    ? < path
                        id={"path_" + id}
                        key={"path_" + id}
                        onMouseDown={onMouseDown}
                        fill="var(--main-background)"
                        style={{
                            cursor: 'move',
                            strokeWidth: lineWidth,
                            transform: `rotate(${rotate}deg)`,
                            transformOrigin: `${left2}px ${polygonTop}px`,
                            fill: color || "var(--main-background-highlighted)",
                            stroke: color || "var(--main-background-highlighted)",
                        }}
                        d={`M${polygonLeft} ${polygonTop} L${polygonBottonCenter} ${polygonBotton} L${polygonRight} ${polygonTop} Z`}
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
        </>
    );

}

import React, { useState, useEffect } from 'react';
import { Utils } from 'code-easy-components';

/** Propriedades aceitas pela linha. */
interface LineProps {
    id: string;
    top1: number;
    top2?: number;
    left1: number;
    left2?: number;
    color?: string;
    lineText?: string;
    isCurved?: boolean;
    lineWidth?: number;
    isDisabled?: boolean;
    sucessorIndex?: number;
    disableOpacity: number;
    lineType?: 'dotted' | 'normal';
    lineOnMouseDown?(e: React.MouseEvent<SVGPathElement, MouseEvent>): void;
    onSucessorChange?(itemId: string | undefined, sucessorId: string, branchIndex: number | undefined): void;
}

export const Line: React.FC<LineProps> = ({ id, onSucessorChange, top1 = 0, left1 = 0, left2 = 0, top2 = 0, ...props }) => {

    const { isCurved = false, lineText = "", disableOpacity, isDisabled = false, lineOnMouseDown, lineWidth = 1, color = "var(--main-background-highlighted)", sucessorIndex, lineType = 'normal' } = props;

    if (sucessorIndex === undefined) {
        top2 = top1 + 85;
        left2 = left1;
    }

    const [basicPosition, setBasicPosition] = useState({ top1: top1, top2: top2, left1: left1, left2: left2 });
    useEffect(() => {
        setBasicPosition({
            top1: top1,
            top2: top2,
            left1: left1,
            left2: left2,
        });
    }, [left1, left2, top1, top2]);

    const polygonTop: number = (basicPosition.top2 - 50);
    const polygonLeft: number = (basicPosition.left2 - 5);
    const polygonRight: number = (basicPosition.left2 + 5);
    const polygonBottonCenter: number = basicPosition.left2;
    const polygonBotton: number = (basicPosition.top2 - 40);

    /** Encontra o ângulo para rotação da linha */
    const rotate = Utils.getAngle(basicPosition.left2, basicPosition.top2, basicPosition.left1, basicPosition.top1);

    /** Encontra a hipotenusa do triângulo que é formado x1-y1 e x2 e y2 */
    const lineDistance = (Math.hypot((basicPosition.top2 - basicPosition.top1), (basicPosition.left2 - basicPosition.left1)) - 40);

    const mouseMove = (event: MouseEvent) => {
        setBasicPosition({
            ...basicPosition,
            top2: event.offsetY,
            left2: event.offsetX,
        });
    }

    const onMouseUp = (e: any) => {
        e.stopPropagation();

        window.onmouseup = null;
        window.onmousemove = null;
        document.body.style.cursor = 'unset';

        setBasicPosition({ top1: top1, top2: top2, left1: left1, left2: left2 });

        onSucessorChange && onSucessorChange(id, e.target.id, sucessorIndex);
    }

    const onMouseDown = () => {
        document.body.style.cursor = 'crosshair';
        window.onmousemove = mouseMove;
        window.onmouseup = onMouseUp;
    }

    return (
        <g style={{ opacity: isDisabled ? disableOpacity : 1 }}>
            <g style={{ transform: `rotate(${rotate}deg)`, transformOrigin: `${basicPosition.left1}px ${basicPosition.top1}px` }}>
                <text
                    fontSize={"small"}
                    textAnchor={"middle"}
                    x={basicPosition.left1}
                    fill={"var(--color-white)"}
                    y={basicPosition.top1 + (lineDistance / 2) + (isCurved ? 35 : -5)}
                    style={{ transform: `rotate(${90}deg)`, transformOrigin: `${basicPosition.left1}px ${basicPosition.top1 + (lineDistance / 2)}px` }}
                >{lineText}</text>
            </g>
            <path
                fill="none"
                id={"line_" + id}
                key={"line_" + id}
                onMouseDown={lineOnMouseDown}
                stroke={color || "var(--main-background-highlighted)"}
                strokeDasharray={lineType === 'normal' ? undefined : "5,5"}
                style={{ transform: `rotate(${rotate}deg)`, transformOrigin: `${basicPosition.left1}px ${basicPosition.top1}px` }}
                d={`M${basicPosition.left1} ${basicPosition.top1 + 30} Q${basicPosition.left1 - (isCurved ? 50 : 0)} ${basicPosition.top1 + (lineDistance / 2)} ${basicPosition.left1} ${basicPosition.top1 + lineDistance}`}
            />
            <path
                id={"path_" + id}
                key={"path_" + id}
                onMouseDown={onMouseDown}
                fill={"var(--main-background)"}
                d={`M${polygonLeft} ${polygonTop} L${polygonBottonCenter} ${polygonBotton} L${polygonRight} ${polygonTop} Z`}
                style={{
                    cursor: 'crosshair',
                    strokeWidth: lineWidth,
                    transform: `rotate(${rotate}deg)`,
                    fill: color || "var(--main-background-highlighted)",
                    stroke: color || "var(--main-background-highlighted)",
                    transformOrigin: `${basicPosition.left2}px ${basicPosition.top2}px`,
                }}
            />
        </g>
    );
}

import React, { memo } from 'react';

interface ITextOverLine {
    top?: number;
    left?: number;
    text?: string;
    rotate?: number;
    textColor?: string;
    isCurved?: boolean;
    lineDistance?: number;
    isLeftToRight?: boolean;
    onMouseDown?(e: React.MouseEvent<SVGTextElement, MouseEvent>): void;
    onContextMenu?(e: React.MouseEvent<SVGTextElement, MouseEvent>): void;
}
/** Render the text over the line */
export const TextOverLine: React.FC<ITextOverLine> = memo(({ left = 0, top = 0, isCurved = false, isLeftToRight = true, lineDistance = 0, rotate = 0, text = '', textColor = '#fff', onMouseDown, onContextMenu }) => {

    const handleOnContextMenu = (e: React.MouseEvent<SVGTextElement, MouseEvent>) => {
        e.stopPropagation();
        e.preventDefault();
        onContextMenu && onContextMenu(e);
    }

    const handleOnMouseDown = (e: React.MouseEvent<SVGTextElement, MouseEvent>) => {
        e.stopPropagation();
        e.preventDefault();
        onMouseDown && onMouseDown(e);
    }

    return (
        <g style={{ transform: `rotate(${rotate}deg)`, transformOrigin: `${left}px ${top}px` }}>
            <text // Render the text over the line
                x={left}
                fill={textColor}
                fontSize={"small"}
                textAnchor={"middle"}
                onMouseDown={handleOnMouseDown}
                onContextMenu={handleOnContextMenu}
                y={top + (lineDistance / 2) + (isCurved ? (isLeftToRight ? 35 : -35) : -5)}
                style={{ transform: `rotate(${isLeftToRight ? 90 : -90}deg)`, transformOrigin: `${left}px ${top + (lineDistance / 2)}px` }}
            >{text}</text>
        </g>
    );
});

import React, { memo } from 'react';

interface TextOverItemProps {
    onMouseDown?(event: React.MouseEvent<SVGTextElement, MouseEvent>): void;
    textColor?: string;
    label?: string;
    left: number;
    top: number;
}
export const TextOverItem: React.FC<TextOverItemProps> = memo(({ left, top, label, textColor, onMouseDown }) => {
    return (
        <text // Move element and display their title
            onMouseDown={onMouseDown}
            textAnchor={"middle"}
            fontSize={"small"}
            fill={textColor}
            y={top - 5}
            x={left}
        >{label}</text>
    );
});

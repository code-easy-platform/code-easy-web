import React from 'react';

interface FlowCommentProp {
    id: string | undefined;
    isSelected: boolean;
    height: number;
    width: number;
    name: string;
    left: number;
    top: number;
}
export const FlowComment: React.FC<FlowCommentProp> = ({ id, isSelected, left, top, name, width, height }) => {

    const strokeColor: string = isSelected ? "var(--color-botton-bar)" : "#383321";

    return (
        <foreignObject
            id={id}
            y={top}
            x={left}
            width={width}
            height={height}
            style={{ cursor: 'move', zIndex: 2 }}
        >
            <div
                children={name}
                className="padding-xs"
                style={{
                    border: `var(--main-border-width) solid ${strokeColor}`,
                    backgroundColor: '#374e36',
                    height: '-webkit-fill-available',
                    width: '-webkit-fill-available',
                    whiteSpace: 'pre-line',
                    pointerEvents: 'none',
                    textAlign: 'start',
                    fontSize: 'small',
                    color: '#fff',
                }}
            />
        </foreignObject>
    );
}

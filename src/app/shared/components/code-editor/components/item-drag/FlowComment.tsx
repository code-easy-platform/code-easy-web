import React, { memo } from 'react';

interface FlowCommentProp {
    id: string | undefined;
    isSelected: boolean;
    height: number;
    width: number;
    name: string;
    left: number;
    top: number;
}
export const FlowComment: React.FC<FlowCommentProp> = memo(({ id, isSelected, left, top, name, width, height }) => {
    const strokeColor: string = isSelected ? "var(--color-botton-bar)" : "#383321";
    return (
        <foreignObject
            id={id}
            y={top}
            x={left}
            width={width}
            height={height}
            style={{
                zIndex: 2,
                cursor: 'move',
            }}
        >
            <div
                children={name}
                className={"padding-xs"}
                style={{
                    border: `var(--main-border-width) solid ${strokeColor}`,
                    height: '-webkit-fill-available',
                    width: '-webkit-fill-available',
                    backgroundColor: '#374e36',
                    whiteSpace: 'pre-line',
                    pointerEvents: 'none',
                    textAlign: 'start',
                    fontSize: 'small',
                    color: '#fff',
                }}
            />
        </foreignObject>
    );
});

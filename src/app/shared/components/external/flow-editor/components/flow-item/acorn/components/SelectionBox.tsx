import React, { memo } from 'react';

interface SelectionBoxProps {
    onMouseDown?(event: React.MouseEvent<SVGRectElement, MouseEvent>): void;
    allowConnection?: boolean;
    backgroundColor?: string;
    fullDraggable?: boolean;
    strokeColor?: string;
    strokeWidth?: number;
    height: number;
    width: number;
    left: number;
    top: number;
    id: string;
}
/** Render image icon */
export const SelectionBox: React.FC<SelectionBoxProps> = memo(({ height, left, top, width, id, strokeColor, strokeWidth, fullDraggable, backgroundColor, allowConnection, onMouseDown }) => {
    return (
        <>
            <rect // Help in the background
                style={{ pointerEvents: 'none' }}
                fill={backgroundColor}
                height={height}
                width={width}
                x={left}
                id={id}
                y={top}
                rx={50}
                ry={50}
            />
            <rect // Move element
                height={(height || 0) + (fullDraggable ? ((height || 0) / 3) : 0)}
                data-allow-connection={String(allowConnection || true)}
                y={top - ((height || 0) / 3)}
                style={{ cursor: 'move' }}
                onMouseDown={onMouseDown}
                fill={"transparent"}
                width={width}
                x={left}
                id={id}
            ></rect>
            <rect // Selection
                style={{ pointerEvents: 'none' }}
                strokeWidth={strokeWidth}
                strokeLinejoin="round"
                stroke={strokeColor}
                fill={"transparent"}
                height={height}
                width={width}
                x={left}
                y={top}
            />
        </>
    );
});

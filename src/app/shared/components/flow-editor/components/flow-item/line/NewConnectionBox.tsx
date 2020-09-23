import React, { memo, useRef } from 'react';

import { Line } from './Line';

interface INewConnectionBoxProps {
    top?: number;
    left?: number;
    width?: number;
    height?: number;
    originId: string;
    lineWidth?: number;
    isRounded?: boolean;
    cursor?: 'crosshair' | string;
    parentRef: React.RefObject<SVGSVGElement>;
    onMouseDown?(e: React.MouseEvent<SVGRectElement, MouseEvent>): void;
    onContextMenu?(e: React.MouseEvent<SVGRectElement, MouseEvent>): void;
}
/** Allow create a new connection */
const NewConnectionBox: React.FC<INewConnectionBoxProps> = ({ originId, parentRef, left = 0, top = 0, height = 0, width = 0, isRounded = false, lineWidth = 1, cursor = 'crosshair', onMouseDown, onContextMenu }) => {

    const ref = useRef<SVGRectElement | null>(null);

    const handleOnContextMenu = (e: React.MouseEvent<SVGRectElement, MouseEvent>) => {
        e.stopPropagation();
        e.preventDefault();
        onContextMenu && onContextMenu(e);
    }

    const handleOnMouseDown = (e: React.MouseEvent<SVGRectElement, MouseEvent>) => {
        e.stopPropagation();
        e.preventDefault();
        onMouseDown && onMouseDown(e);
    }

    return (
        <>
            <Line
                id={undefined}
                originId={originId}
                targetId={undefined}
                parentRef={parentRef}
                newConnectionBoxRef={ref}
                onMouseDown={handleOnMouseDown}
                onContextMenu={handleOnContextMenu}
            />
            <rect
                style={{ cursor, zIndex: 3 }}
                strokeWidth={lineWidth}
                rx={isRounded ? 50 : 0}
                ry={isRounded ? 50 : 0}
                fill={"transparent"}
                height={height}
                width={width}
                id={originId}
                ref={ref}
                x={left}
                y={top}
            />
        </>
    );
};

export default memo(NewConnectionBox);

import React, { memo, useCallback, useRef } from 'react';
import { IObservable, observe } from 'react-observing';

import { Line } from './Line';

interface INewConnectionBoxProps {
    top?: number;
    left?: number;
    width?: number;
    height?: number;
    lineWidth?: number;
    isRounded?: boolean;
    cursor?: 'crosshair' | string;
    parentRef: React.RefObject<SVGSVGElement>;
    originIdStore: IObservable<string | undefined>;
    onMouseDown?(e: React.MouseEvent<SVGRectElement, MouseEvent>): void;
    onContextMenu?(e: React.MouseEvent<SVGRectElement, MouseEvent>): void;
}
/** Allow create a new connection */
const NewConnectionBox: React.FC<INewConnectionBoxProps> = ({ originIdStore, parentRef, left = 0, top = 0, height = 0, width = 0, isRounded = false, lineWidth = 1, cursor = 'crosshair', onMouseDown, onContextMenu }) => {
    const ref = useRef<SVGRectElement | null>(null);

    const handleOnContextMenu = useCallback((e: React.MouseEvent<SVGRectElement, MouseEvent>) => {
        e.stopPropagation();
        e.preventDefault();
        onContextMenu && onContextMenu(e);
    }, [onContextMenu]);

    const handleOnMouseDown = useCallback((e: React.MouseEvent<SVGRectElement, MouseEvent>) => {
        e.stopPropagation();
        e.preventDefault();
        onMouseDown && onMouseDown(e);
    }, [onMouseDown]);

    return (
        <>
            <Line
                id={undefined}
                parentRef={parentRef}
                newConnectionBoxRef={ref}
                originIdStore={originIdStore}
                onMouseDown={handleOnMouseDown}
                targetIdStore={observe(undefined)}
                onContextMenu={handleOnContextMenu}
            />
            <rect
                style={{ cursor, zIndex: 3 }}
                id={originIdStore.value}
                strokeWidth={lineWidth}
                rx={isRounded ? 50 : 0}
                ry={isRounded ? 50 : 0}
                fill={"transparent"}
                height={height}
                width={width}
                ref={ref}
                x={left}
                y={top}
            />
        </>
    );
};

export default memo(NewConnectionBox);

import React, { useCallback, useRef, useState } from 'react';

import { IdeConfigStorage } from '../../services';

interface TwoColumnsResizableProps {
    minWidth?: number;
    maxWidth?: number;
    variant?: "left" | "right";
    children: [React.ReactElement, React.ReactElement];
}
export const TwoColumnsResizable: React.FC<TwoColumnsResizableProps> = ({ variant = 'right', children: [leftChild, rightChild], minWidth, maxWidth }) => {
    const oldPageX = useRef(0);

    const [[sizeLeft, sizeRight], setSizes] = useState([
        variant === 'left' ? IdeConfigStorage.getResizableColumns(String(leftChild.key)) : 0,
        variant === 'right' ? IdeConfigStorage.getResizableColumns(String(rightChild.key)) : 0,
    ]);

    const handleMouseMove = useCallback((e: any) => {
        const movementX = e.pageX - oldPageX.current;
        oldPageX.current = e.pageX;

        setSizes(oldSizes => {
            if (variant === 'left') {
                oldSizes[0] += movementX;
            } else {
                oldSizes[1] -= movementX;
            }
            return [...oldSizes];
        });
    }, [variant]);

    const handleMouseUp = useCallback(() => {
        oldPageX.current = 0;
        window.onmouseup = null;
        window.onmousemove = null;
        window.document.body.style.cursor = 'unset';
        setSizes(oldSizes => {
            if (variant === 'left') {
                if (maxWidth && oldSizes[0] > maxWidth) {
                    oldSizes[0] = maxWidth;
                } else if (minWidth && oldSizes[0] < minWidth) {
                    oldSizes[0] = minWidth;
                }
            } else {
                if (maxWidth && oldSizes[1] > maxWidth) {
                    oldSizes[1] = maxWidth;
                } else if (minWidth && oldSizes[1] < minWidth) {
                    oldSizes[1] = minWidth;
                }
            }
            return [...oldSizes];
        });
    }, [variant, maxWidth, minWidth]);

    const handleMouseDown = useCallback((e: React.MouseEvent<any, MouseEvent>) => {
        window.onmousemove = (e: any) => handleMouseMove(e);
        window.document.body.style.cursor = 'e-resize';
        window.onmouseup = handleMouseUp;
        oldPageX.current = e.pageX;
    }, [handleMouseUp, handleMouseMove]);

    return (
        <div className="full-width">
            <div
                className={`${variant === 'right' && 'flex1'}`}
                style={{
                    width: variant === 'left' ? sizeLeft : undefined,
                    maxWidth: variant === 'left' ? maxWidth : undefined,
                    minWidth: variant === 'left' ? minWidth : undefined,
                }}
            >
                {leftChild}
            </div>
            <div
                className={`${variant === 'left' && 'flex1'}`}
                style={{
                    width: variant === 'right' ? sizeRight : undefined,
                    maxWidth: variant === 'right' ? maxWidth : undefined,
                    minWidth: variant === 'right' ? minWidth : undefined,
                }}
            >
                <div
                    onMouseDown={e => handleMouseDown(e)}
                    style={{
                        zIndex: 1,
                        cursor: 'e-resize',
                        width: 'var(--main-grapper-size)',
                        marginRight: 'calc(var(--main-grapper-size) - (2 * var(--main-grapper-size)))',
                    }}
                />
                <hr
                    className="hr hr-vertical"
                    onMouseDown={e => handleMouseDown(e)}
                    style={{ cursor: 'e-resize', zIndex: 1 }}
                />
                {rightChild}
            </div>
        </div>
    );
}

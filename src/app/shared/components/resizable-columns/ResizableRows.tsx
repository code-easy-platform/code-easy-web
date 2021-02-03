import React, { useCallback, useEffect, useRef, useState } from 'react';

import { IdeConfigStorage } from '../../services';

interface ResizableColumnsProps {
    minWidth?: number;
    children: React.ReactElement[];
}
export const ResizableColumns: React.FC<ResizableColumnsProps> = ({ children, minWidth = 100 }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const [sizes, setSizes] = useState<number[]>(children.map(child => IdeConfigStorage.getResizableColumns(String(child.key))));
    const oldBodyClientWidth = useRef(0);
    const extraWidthRef = useRef(0);

    // Initialize oldBodyClientWidth
    useEffect(() => {
        oldBodyClientWidth.current = document.body.clientWidth;
    }, []);

    // Initialize childs sizes 
    useEffect(() => {
        setSizes(oldSizes => {
            const currentSizeLenght = oldSizes.reduce((size, currentSize) => size > minWidth ? currentSize + size : currentSize, 0);
            const hasNoValueLenght = oldSizes.filter(size => size < minWidth).length;
            const value = ((containerRef.current?.clientWidth || 0) - currentSizeLenght) / hasNoValueLenght;

            oldSizes = oldSizes.map(size => size < minWidth ? size = value : size);

            if (oldSizes.reduce((size, currentSize) => size > minWidth ? currentSize + size : currentSize, 0) < (containerRef.current?.clientWidth || 0)) {
                if (oldSizes.length > 0) {
                    oldSizes[0] += (containerRef.current?.clientWidth || 0) - oldSizes.reduce((size, currentSize) => size > minWidth ? currentSize + size : currentSize, 0);
                }
            }

            return [...oldSizes];
        });
    }, [minWidth]);

    const handleWindowResize = useCallback(() => {
        const clientWidth = containerRef.current?.clientWidth;
        if (clientWidth) {
            const diference = oldBodyClientWidth.current - document.body.clientWidth;
            oldBodyClientWidth.current = document.body.clientWidth;

            setSizes(oldSizes => {
                if (diference > 0) {
                    const splitedValue = diference / oldSizes.filter(oldValue => (oldValue > minWidth)).length;
                    return [
                        ...oldSizes.map(oldValue => (oldValue > minWidth) ? oldValue -= splitedValue : oldValue),
                    ];
                } else {
                    const splitedValue = diference / oldSizes.length;
                    return [
                        ...oldSizes.map(oldValue => oldValue -= splitedValue),
                    ];
                }
            });
        }
    }, [minWidth]);

    // Listen to window size changes
    useEffect(() => {
        window.addEventListener('resize', handleWindowResize);
        return () => window.removeEventListener('resize', handleWindowResize);
    }, [handleWindowResize]);

    const handleMouseMove = useCallback((e: any, index: number) => {
        setSizes(oldSizes => {
            if (extraWidthRef.current > 5 || extraWidthRef.current < -5) {
                extraWidthRef.current += e.movementX;
            } else if (index === 1) {
                if ((oldSizes[index - 1] + e.movementX) < minWidth || (oldSizes[index] - e.movementX) < minWidth) {
                    extraWidthRef.current += e.movementX;
                    return oldSizes;
                }

                oldSizes[index - 1] += e.movementX;
                oldSizes[index] -= e.movementX;
            } else if (index > 0 && index === (oldSizes.length - 1)) {
                if ((oldSizes[index - 1] + e.movementX) < minWidth || (oldSizes[index] - e.movementX) < minWidth) {
                    extraWidthRef.current += e.movementX;
                    return oldSizes;
                }

                oldSizes[index - 1] += e.movementX;
                oldSizes[index] -= e.movementX;
            } else if (index > 0 && index < (oldSizes.length - 1)) {
                if ((oldSizes[index - 1] + e.movementX) < minWidth || (oldSizes[index] - e.movementX) < minWidth) {
                    extraWidthRef.current += e.movementX;
                    return oldSizes;
                }

                oldSizes[index - 1] += e.movementX;
                oldSizes[index] -= e.movementX;
            }

            oldSizes.forEach((size, index) => {
                IdeConfigStorage.setResizableColumns(String(children[index].key), size);
            });

            return [...oldSizes];
        });
    }, [children, minWidth]);

    const handleMouseUp = useCallback(() => {
        extraWidthRef.current = 0;
        window.onmouseup = null;
        window.onmousemove = null;
        window.document.body.style.cursor = 'unset';
    }, []);

    const handleMouseDown = useCallback((index: number) => {
        window.onmousemove = (e: any) => handleMouseMove(e, index);
        window.document.body.style.cursor = 'e-resize';
        window.onmouseup = handleMouseUp;
    }, [handleMouseUp, handleMouseMove]);

    return (
        <div ref={containerRef} className="flex1 full-width">
            {children.map((child, index) => (
                <div key={index} style={{ width: sizes[index] > minWidth ? sizes[index] : minWidth }}>
                    {index !== 0 && (
                        <>
                            <div
                                onMouseDown={() => handleMouseDown(index)}
                                style={{
                                    zIndex: 1,
                                    cursor: 'e-resize',
                                    width: 'var(--main-grapper-size)',
                                    marginRight: 'calc(var(--main-grapper-size) - (2 * var(--main-grapper-size)))',
                                }}
                            />
                            <hr
                                className="hr hr-vertical"
                                style={{ cursor: 'e-resize', zIndex: 1 }}
                                onMouseDown={() => handleMouseDown(index)}
                            />
                        </>
                    )}
                    {child}
                </div>
            ))}
        </div>
    );
}

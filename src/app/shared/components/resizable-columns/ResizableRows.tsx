import React, { useCallback, useEffect, useRef, useState } from 'react';

interface ResizableColumnsProps {
    minWidth?: number;
    children: React.ReactElement[];
    maxWidths?: (number | string)[];
}
export const ResizableColumns: React.FC<ResizableColumnsProps> = ({ children, maxWidths = children.map(() => 'auto'), minWidth = 100 }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const [sizes, setSizes] = useState<number[]>(children.map(() => 0));
    const oldBodyClientWidth = useRef(0);
    const extraWidthRef = useRef(0);
    const oldPageX = useRef(0);

    // Initialize oldBodyClientWidth
    useEffect(() => {
        oldBodyClientWidth.current = document.body.clientWidth;
    }, []);

    // Validate maxWidths
    useEffect(() => {
        if (maxWidths.length !== children.length) {
            throw new Error("The number of items in maxWidths must be the same as children in the 'ResizableColumns' component");
        }
    }, [children.length, maxWidths]);

    // Initialize childs sizes 
    useEffect(() => {
        setSizes(oldSizes => {
            /** The ResizableColumns main container client width */
            const containerClientWidth = containerRef.current?.clientWidth || 0;

            /** The sum of all old sizes */
            const sumOfAllOldSizes = oldSizes.reduce((size, curSize) => size > minWidth ? curSize + size : curSize, 0);

            /** The number of sizes that are less than minWidth */
            const numberOfSizesLessThanMinWidth = oldSizes.filter(size => size < minWidth).length;

            /** The value to sizes less than min width */
            const valueToSizesLessThanMinWidth = (containerClientWidth - sumOfAllOldSizes) / numberOfSizesLessThanMinWidth;

            // Change value to sizes less than minWidth
            oldSizes = oldSizes.map(() => valueToSizesLessThanMinWidth);

            /* if (sumOfAllOldSizes < containerClientWidth) {
                if (oldSizes.length > 0) {
                    oldSizes[0] += containerClientWidth - sumOfAllOldSizes;
                }
            } else if (sumOfAllOldSizes > containerClientWidth) {
                console.log('entrou')
            } */

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
        const movementX = e.pageX - oldPageX.current;
        oldPageX.current = e.pageX;

        setSizes(oldSizes => {
            if (extraWidthRef.current > 5 || extraWidthRef.current < -5) {
                extraWidthRef.current += movementX;
                return [...oldSizes];
            } else {
                if (
                    (oldSizes[index - 1] + movementX) > maxWidths[index] ||
                    (oldSizes[index] - movementX) > maxWidths[index] ||
                    (oldSizes[index - 1] + movementX) < minWidth ||
                    (oldSizes[index] - movementX) < minWidth
                ) {
                    extraWidthRef.current += movementX;
                    return oldSizes;
                }

                oldSizes[index - 1] += movementX;
                oldSizes[index] -= movementX;

                return [...oldSizes];
            }
        });
    }, [maxWidths, minWidth]);

    const handleMouseUp = useCallback(() => {
        extraWidthRef.current = 0;
        window.onmouseup = null;
        window.onmousemove = null;
        window.document.body.style.cursor = 'unset';
    }, []);

    const handleMouseDown = useCallback((e: React.MouseEvent<any, MouseEvent>, index: number) => {
        window.onmousemove = (e: any) => handleMouseMove(e, index);
        window.document.body.style.cursor = 'e-resize';
        window.onmouseup = handleMouseUp;
        oldPageX.current = e.pageX;
    }, [handleMouseUp, handleMouseMove]);

    return (
        <div ref={containerRef} className="full-width">
            {children.map((child, index) => (
                <div
                    key={index}
                    style={{
                        maxWidth: maxWidths ? maxWidths[index] : 'auto',
                        width: sizes[index] > minWidth ? sizes[index] : minWidth
                    }}
                >
                    {index !== 0 && (
                        <>
                            <div
                                onMouseDown={e => handleMouseDown(e, index)}
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
                                onMouseDown={e => handleMouseDown(e, index)}
                            />
                        </>
                    )}
                    {child}
                </div>
            ))}
        </div>
    );
}

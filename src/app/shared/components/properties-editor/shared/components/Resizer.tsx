import React, { useCallback, useRef } from 'react';

interface ResizerProps {
    oldWidth?: number;
    onChange(left: number): void;
    onRisizeEnd?(left: number): void;
}
export const Resizer: React.FC<ResizerProps> = ({ oldWidth = 0, onChange, onRisizeEnd }) => {
    const inputLeftDistance = useRef(0);

    const mouseMove = useCallback((e: MouseEvent) => {
        onChange((window.innerWidth - e.pageX) - inputLeftDistance.current);
    }, [onChange]);

    const mouseUp = useCallback((e: MouseEvent) => {
        window.document.body.style.cursor = 'unset';
        onRisizeEnd && onRisizeEnd((window.innerWidth - e.pageX) - inputLeftDistance.current);
        window.onmousemove = null;
        window.onmouseup = null;
    }, [onRisizeEnd]);

    const mouseDown = useCallback((e: React.MouseEvent) => {
        inputLeftDistance.current = (window.innerWidth - e.pageX) - oldWidth;

        window.document.body.style.cursor = 'col-resize';
        window.onmousemove = mouseMove;
        window.onmouseup = mouseUp;
    }, [oldWidth, mouseMove, mouseUp]);

    return (
        <div
            onMouseDown={mouseDown}
            style={{
                backgroundColor: 'transparent',
                cursor: 'col-resize',
                border: 'none',
                height: 20,
                zIndex: 1,
                width: 6,
            }}
        />
    );
}

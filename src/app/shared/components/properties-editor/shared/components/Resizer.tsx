import React from 'react';

interface ResizerProps { onChange(left: number): void }
export const Resizer: React.FC<ResizerProps> = ({ onChange }) => {

    const mouseMove = (e: MouseEvent) => {
        onChange(window.innerWidth - e.pageX);
    }

    const mouseUp = () => {
        window.document.body.style.pointerEvents = 'unset';
        window.onmousemove = null;
        window.onmouseup = null;
    }

    const mouseDown = () => {
        window.document.body.style.pointerEvents = 'none';
        window.onmousemove = mouseMove;
        window.onmouseup = mouseUp;
    }

    return (
        <div
            onMouseDown={mouseDown}
            style={{
                backgroundColor: 'transparent',
                cursor: 'col-resize',
                height: '100%',
                border: 'none',
                zIndex: 1,
                width: 6,
            }}
        />
    );
}

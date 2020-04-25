import React, { useState } from 'react';

interface ResizerProps { left: number; onChange(left: number): void, paiRef: any }
export const Resizer: React.FC<ResizerProps> = ({ left, onChange, paiRef }) => {

    const [state, setState] = useState({ left: ((window.innerWidth / 2) - left) + 130 });

    const mouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setState({ ...state, left: e.pageX });
        onChange(((window.innerWidth / 2) - e.pageX) + 130);
    }

    const mouseUp = () => {
        if (paiRef.current) {
            paiRef.current.onmousemove = null;
            window.onmouseup = null;
        }
    }

    const mouseDown = (e: React.MouseEvent<HTMLHRElement, MouseEvent>) => {
        if (paiRef.current) {
            paiRef.current.onmousemove = mouseMove;
            window.onmouseup = mouseUp;
        }
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

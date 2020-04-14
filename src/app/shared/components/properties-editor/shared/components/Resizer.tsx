import React, { useState } from 'react';

interface ResizerProps { left: number; onChange(left: number): void, paiRef: any }
export const Resizer: React.FC<ResizerProps> = ({ left, onChange, paiRef }) => {

    const [state, setState] = useState({ isResizer: false, left: ((window.innerWidth / 2) - left) + 130 });

    const onMouseDown = (e: React.MouseEvent<HTMLHRElement, MouseEvent>) => {
        setState({ ...state, isResizer: true });
    }

    const onMouseUp = () => {
        setState({ ...state, isResizer: false });
    }

    if (paiRef.current !== null) {
        paiRef.current.onmousemove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            if (state.isResizer === true) {
                setState({ ...state, left: e.pageX });
                onChange(((window.innerWidth / 2) - e.pageX) + 130);
            }
        }
    }

    return (
        <div
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            style={{
                backgroundColor: 'transparent',
                position: 'absolute',
                cursor: 'col-resize',
                left: state.left,
                height: '100%',
                border: 'none',
                zIndex: 1,
                width: 6,
            }}
        />
    );
}

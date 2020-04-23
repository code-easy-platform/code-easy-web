import React, { FC, MouseEvent, useState } from 'react';

interface SelectorAreaProps {
    parentRef: any;
    onChange(top: number, left: number, endTop: number, endLeft: number, e: MouseEvent<SVGRectElement, any>): any;
}
/** Reinderiza a área de seleção na tela, para que seja possível selecionar diversos itens de uma vez. */
export const SelectorAreaNew: FC<SelectorAreaProps> = ({ parentRef, onChange = (e: any) => { } }) => {

    const [state, setState] = useState({
        isMouseDown: false,
        top: 0,
        left: 0,
        endTop: 0,
        endLeft: 0,
        startTop: 0,
        startLeft: 0,
    });

    /** Exibi uma área de seleção no painel do fluxo. */
    const showSelection = (e: any) => {

        if (!state.isMouseDown) return;

        setState({
            ...state,
            isMouseDown: true,
            endTop: Number(e.offsetY),
            endLeft: Number(e.offsetX),
        });

        setState({
            ...state,
            top: ((Number(e.offsetY) - state.startTop) > 0) ? state.startTop : Number(e.offsetY),
            left: ((Number(e.offsetX) - state.startLeft) > 0) ? state.startLeft : Number(e.offsetX),
        });

        onChange(state.top, state.left, state.endTop, state.endLeft, e);
    };

    if (parentRef.current) {
        
        parentRef.current.onmousemove = showSelection;
        window.onmousedown = (e: any) => {

            setState({
                ...state,
                isMouseDown: true,
                startTop: Number(e.offsetY),
                startLeft: Number(e.offsetX),
                endTop: Number(e.offsetY),
                endLeft: Number(e.offsetX),
            });

        };

        window.onmouseup = () => {
            setState({ isMouseDown: false, left: 0, top: 0, startTop: 0, startLeft: 0, endTop: 0, endLeft: 0 });
        };

    }

    return (
        true
            ? <rect
                y={state.top}
                x={state.left}
                strokeWidth={1}
                fill="#ffffff11"
                stroke="#999fff"
                width={((state.endLeft - state.startLeft) > 0) ? (state.endLeft - state.startLeft) : (state.startLeft - state.endLeft)}
                height={((state.endTop - state.startTop) > 0) ? (state.endTop - state.startTop) : (state.startTop - state.endTop)}
            />
            : <></>
    );
}

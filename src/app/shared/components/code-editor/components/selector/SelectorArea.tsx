import React, { FC, MouseEvent } from 'react';

interface SelectorAreaProps {
    top: number
    left: number
    endTop: number
    endLeft: number
    isShow: boolean
    startTop: number
    startLeft: number
    onMouseUp(e: MouseEvent<SVGRectElement, any>): any
}
/** Reinderiza a área de seleção na tela, para que seja possível selecionar diversos itens de uma vez. */
export const SelectorArea: FC<SelectorAreaProps> = ({ isShow = false, top = 0, left = 0, startLeft, endLeft, startTop, endTop, onMouseUp = (e: any) => { } }) => {
    return (
        isShow
            ? <rect
                y={top}
                x={left}
                strokeWidth={1}
                fill="#ffffff11"
                stroke="#999fff"
                onMouseUp={onMouseUp}
                width={((endLeft - startLeft) > 0) ? (endLeft - startLeft) : (startLeft - endLeft)}
                height={((endTop - startTop) > 0) ? (endTop - startTop) : (startTop - endTop)}
            />
            : <></>
    );
}

import React, { useState, useRef, useEffect, useCallback } from 'react';

import { ICoords } from '../../shared/interfaces';

interface SelectorAreaProps {
    isDisabled?: boolean;
    borderColor?: string;
    borderWidth?: number;
    backgroundColor?: string;
    borderType?: 'dash' | 'normal';
    onSelectionEnd?(e: MouseEvent): void;
    onSelectionStart?(e: MouseEvent): void;
    onCoordsChange?(coords: ICoords): void;
    parentElement: React.MutableRefObject<any>;
}
/** Reinderiza a área de seleção na tela, para que seja possível selecionar diversos items de uma vez. */
export const SelectorArea: React.FC<SelectorAreaProps> = ({ onSelectionEnd, onSelectionStart, parentElement, borderType, backgroundColor = "#ffffff11", borderColor = "#999fff", borderWidth = 1, isDisabled = false, onCoordsChange }) => {

    const selectorAreaRef = useRef<any>(null);
    const selectionStarted = useRef(false);

    const [position, setPosition] = useState({
        startLeft: 0,
        startTop: 0,
        endLeft: 0,
        endTop: 0,
    });

    const mouseMove = useCallback((e: MouseEvent) => {
        if (!selectionStarted.current) {
            selectionStarted.current = true;
            onSelectionStart && onSelectionStart(e);
        }

        setPosition({
            ...position,
            endLeft: e.offsetX,
            endTop: e.offsetY,
        });

        onCoordsChange &&
            onCoordsChange({
                startY: position.startTop,
                startX: position.startLeft,
                endY: e.offsetY,
                endX: e.offsetX,
            });
    }, [onCoordsChange, onSelectionStart, position]);

    const mouseUp = useCallback((e: MouseEvent) => {
        window.onmousemove = null;
        window.onmouseup = null;

        document.body.style.pointerEvents = 'unset';
        parentElement.current.style.pointerEvents = 'auto';

        setPosition({
            startLeft: 0,
            startTop: 0,
            endLeft: 0,
            endTop: 0,
        });

        if (selectionStarted.current) {
            selectionStarted.current = false;
            onSelectionEnd && onSelectionEnd(e);
        }
    }, [parentElement, onSelectionEnd]);

    const mouseDown = useCallback((e: MouseEvent | any) => {
        if (e.target.id === parentElement.current.id) {

            document.body.style.pointerEvents = 'none';
            parentElement.current.style.pointerEvents = 'auto';

            window.onmousemove = mouseMove;
            window.onmouseup = mouseUp;

            /**
             * Em teoria isso não deveria contecer já que se trata de consts
             * e em teoria deveria estar sendo feito essas atribuições dentro do setPosition,
             * funcionou apenas assim.
             */
            position.startLeft = e.offsetX;
            position.startTop = e.offsetY;
            position.endLeft = e.offsetX;
            position.endTop = e.offsetY;

            setPosition(position);
        }
    }, [parentElement, position, mouseMove, mouseUp]);

    useEffect(() => {
        if (!isDisabled && selectorAreaRef.current && parentElement.current) {
            /** Pela referencia do react da selection pega a referência do componente pai e configura o mousedown */
            parentElement.current.onmousedown = mouseDown;
        } else {
            parentElement.current.onmousedown = undefined;
        }
    }, [mouseDown, parentElement, isDisabled]);

    // Se não pode exibir retorna null
    if (isDisabled) return null;

    return (
        <rect
            stroke={borderColor}
            ref={selectorAreaRef}
            fill={backgroundColor}
            strokeWidth={borderWidth}
            strokeDasharray={borderType === 'dash' ? 5.5 : undefined}
            y={((position.endTop - position.startTop) > 0) ? position.startTop : position.endTop}
            x={((position.endLeft - position.startLeft) > 0) ? position.startLeft : position.endLeft}
            height={((position.endTop - position.startTop) > 0) ? (position.endTop - position.startTop) : (position.startTop - position.endTop)}
            width={((position.endLeft - position.startLeft) > 0) ? (position.endLeft - position.startLeft) : (position.startLeft - position.endLeft)}
        />
    );

}

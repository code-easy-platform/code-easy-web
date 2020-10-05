import React, { useState, memo, useRef, useEffect } from 'react';

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
}
/** Reinderiza a área de seleção na tela, para que seja possível selecionar diversos items de uma vez. */
const SelectorArea: React.FC<SelectorAreaProps> = ({ onSelectionEnd, onSelectionStart, borderType, backgroundColor = "#ffffff11", borderColor = "#999fff", borderWidth = 1, isDisabled = false, onCoordsChange }) => {

    const selectorAreaRef = useRef<any>(null);
    const selectionStarted = useRef(false);

    const [position, setPosition] = useState({
        startLeft: 0,
        startTop: 0,
        endLeft: 0,
        endTop: 0,
    });

    useEffect(() => {
        if (selectorAreaRef.current) {

            /** Pela referencia do react da selection pega a referência do componente pai e configura o mousedown */
            if (selectorAreaRef.current?.parentElement) {

                const mouseMove = (e: MouseEvent) => {
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
                };

                const mouseUp = (e: MouseEvent) => {
                    window.onmousemove = null;
                    window.onmouseup = null;

                    document.body.style.pointerEvents = 'unset';
                    selectorAreaRef.current.parentElement.style.pointerEvents = 'auto';

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
                };

                const mouseDown = (e: MouseEvent | any) => {
                    if (!isDisabled) {
                        if (e.target.id === selectorAreaRef.current.parentElement.id) {

                            document.body.style.pointerEvents = 'none';
                            selectorAreaRef.current.parentElement.style.pointerEvents = 'auto';

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
                    }
                };

                selectorAreaRef.current.parentElement.onmousedown = mouseDown;
            }

        }
    }, [isDisabled, onSelectionEnd, onSelectionStart, onCoordsChange, position]);

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

export default memo(SelectorArea);

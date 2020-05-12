import React, { useState } from 'react';
import { Coords } from '../../shared/Interfaces/CodeEditorInterfaces';

interface SelectorAreaProps {
    enabled?: boolean;
    parentRef: React.MutableRefObject<any>;
    onCoordsChange?(coords: Coords): void;
}
/** Reinderiza a área de seleção na tela, para que seja possível selecionar diversos itens de uma vez. */
export const SelectorArea: React.FC<SelectorAreaProps> = ({ parentRef, enabled = true, onCoordsChange = (coords: { startY: number, startX: number, endY: number, endX: number }) => { } }) => {

    const [show, setShow] = useState(false);
    const [position, setPosition] = useState({
        startLeft: 0,
        startTop: 0,
        endLeft: 0,
        endTop: 0,
    });

    const mouseMove = (e: globalThis.MouseEvent) => {
        setShow(true);

        setPosition({
            ...position,
            endLeft: e.offsetX,
            endTop: e.offsetY,
        });

        onCoordsChange({
            startY: position.startTop,
            startX: position.startLeft,
            endY: e.offsetY,
            endX: e.offsetX,
        });
    }

    const mouseUp = () => {
        setPosition({
            startLeft: 0,
            startTop: 0,
            endLeft: 0,
            endTop: 0,
        });

        window.onmousemove = null;
        window.onmouseup = null;

        setShow(false);
    }

    // Configura o mouse down
    if (parentRef.current) {
        parentRef.current.onmousedown = (e: globalThis.MouseEvent | any) => {
            if (e.target.id === parentRef.current.id) {
                window.onmousemove = mouseMove;
                window.onmouseup = mouseUp;

                /** 
                 * Em teoria isso não deveria contecer já que se trata de consts
                 * e em teoria deveria estar sendo feito essas atribuições dentro do setPosition,
                 * funcionou apenas assim.
                 * */
                position.startLeft = e.offsetX;
                position.startTop = e.offsetY;
                position.endLeft = e.offsetX;
                position.endTop = e.offsetY;

                setPosition(position);
            }
        }
    }

    return (
        show && enabled
            ? <rect
                strokeWidth={1}
                fill={"#ffffff11"}
                stroke={"#999fff"}
                y={((position.endTop - position.startTop) > 0) ? position.startTop : position.endTop}
                x={((position.endLeft - position.startLeft) > 0) ? position.startLeft : position.endLeft}
                height={((position.endTop - position.startTop) > 0) ? (position.endTop - position.startTop) : (position.startTop - position.endTop)}
                width={((position.endLeft - position.startLeft) > 0) ? (position.endLeft - position.startLeft) : (position.startLeft - position.endLeft)}
            />
            : <></>
    );
}

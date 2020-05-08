import React, { useState } from 'react';

import './Modal.css';

import icon_maximizar from './../../../assets/icons/btn-maximizar.svg';
import icon_close from './../../../assets/icons/btn-close.svg';

interface ModalProps {
    onCancel?(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
    onSave?(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
    onMaximize?(value: boolean): boolean;
    onMinimize?(value: boolean): boolean;
    onClose?(value: boolean): boolean;
    isOpen: boolean;
}
export const Modal: React.FC<ModalProps> = ({ children, onMaximize, onMinimize, onClose, isOpen, onCancel, onSave }) => {

    const [{ clickedLeft, clickedTop }, setClickedPosition] = useState({ clickedTop: 0, clickedLeft: 0 });
    
    /** Controla a posição da modal na tela */
    const [{ left, top }, setPosition] = useState({ top: 90, left: 90 });

    /** Controla se a modal está maxinizada ou minimizada */
    const [maximized, setMaximized] = useState(false);

    /** Controla se a modal está aberta ou fechada */
    const [closed, setClosed] = useState(!isOpen);

    const toggleMaximize = () => {
        if (maximized) {
            setMaximized(onMaximize ? onMaximize(!maximized) : !maximized);
        } else {
            setMaximized(onMinimize ? onMinimize(!maximized) : !maximized);
        }
    }

    const close = () => {
        setClosed(onClose ? onClose(true) : true);
    }

    const mouseMove = (e: MouseEvent) => {
        let newLeft = e.clientX + clickedLeft;
        let newTop = e.clientY + clickedTop;

        setPosition({ left: newLeft, top: newTop });
    }

    const mouseUp = () => {
        setClickedPosition({ clickedLeft: 0, clickedTop: 0 });
        window.onmousemove = null;
        window.onmouseup = null;
    }

    const mouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setClickedPosition({ clickedLeft: e.nativeEvent.offsetX, clickedTop: e.nativeEvent.offsetY });
        window.onmousemove = mouseMove;
        window.onmouseup = mouseUp;
    }

    return (
        closed
            ? <></>
            : <div style={{ top, left }} className={`base-modal background-bars box-shadow-small border-radius flex-column${maximized ? ' full-width full-height' : ' padding-xs'}`}>
                <div onMouseDown={mouseDown} className={`modal-top-bar flex-row${maximized ? ' margin-left-xs margin-right-xs' : ''}`}>
                    <button onClick={toggleMaximize} className="btn padding-xs margin-right-s border-radius outline-none">
                        <img height={30} src={icon_maximizar} alt="Toggle maximize modal" />
                    </button>
                    <button onClick={close} className="btn padding-xs border-radius outline-none">
                        <img height={30} src={icon_close} alt="Close modal" />
                    </button>
                </div>
                <div className={`modal-top-content background border-radius flex-column padding-s margin-top-xs margin-bottom-xs flex1${maximized ? ' margin-left-xs margin-right-xs' : ''}`}>
                    {children}
                </div>
                <div className={`modal-top-footer flex-row modal-top-footer${maximized ? ' margin-left-xs margin-right-xs' : ''}`}>
                    <button onClick={onCancel} className="btn padding-s padding-left-m padding-right-m margin-right-s border-radius outline-none">Cancel</button>
                    <button onClick={onSave} style={{ backgroundColor: 'var(--color-primary)' }} className="btn padding-s padding-left-m padding-right-m border-radius outline-none">Save</button>
                </div>
            </div>
    );
}

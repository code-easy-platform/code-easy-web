import React, { useState, useEffect } from 'react';

import './Modal.css';

import icon_maximizar from './../../../assets/icons/btn-maximizar.svg';
import icon_close from './../../../assets/icons/btn-close.svg';

interface ModalProps {
    onCancel?(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
    onSave?(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
    onMaximize?(value: boolean): boolean;
    onMinimize?(value: boolean): boolean;
    onClose?(value: boolean): boolean;
    closeWithBackdropClick?: boolean;
    allowBackdropClick?: boolean;
    maxHeight?: number;
    maxWidth?: number;
    isOpen: boolean;
    title?: string;
}
export const Modal: React.FC<ModalProps> = ({ children, maxWidth = 500, maxHeight = 400, title = '', onMaximize, onMinimize, onClose, isOpen, onCancel, onSave, allowBackdropClick = true, closeWithBackdropClick = false }) => {

    const [clickedPosition, setClickedPosition] = useState({ clickedTop: 0, clickedLeft: 0 });

    /** Controla a posição da modal na tela */
    const [position, setPosition] = useState({ top: (window.innerHeight / 2) - 250, left: (window.innerWidth / 2) - 250 });

    /** Controla se a modal está maxinizada ou minimizada */
    const [maximized, setMaximized] = useState(false);

    /** Controla se a modal está aberta ou fechada */
    const [closed, setClosed] = useState(!isOpen);
    useEffect(() => {
        setClosed(!isOpen);
    }, [isOpen]);

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
        let newLeft = e.x - clickedPosition.clickedLeft;
        let newTop = e.y - clickedPosition.clickedTop;

        setPosition({ left: newLeft, top: newTop });
    }

    const mouseUp = () => {
        setClickedPosition({ clickedLeft: 0, clickedTop: 0 });
        window.onmousemove = null;
        window.onmouseup = null;
    }

    const mouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        clickedPosition.clickedLeft = e.nativeEvent.offsetX;
        clickedPosition.clickedTop = e.nativeEvent.offsetY;

        setClickedPosition(clickedPosition);
        window.onmousemove = mouseMove;
        window.onmouseup = mouseUp;
    }

    const keyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.keyCode === 27) {
            if ((position.left < 0 || position.left > window.innerWidth) || (position.top < 0 || position.top > window.innerHeight)) {
                setPosition({ left: 50, top: 50 });
            }
            close();
        }
    }

    return (
        closed
            ? <></>
            : <>
                {!allowBackdropClick &&
                    <div tabIndex={0} onKeyDown={keyDown} className="fade-in full-height full-width absolute" style={{ backgroundColor: '#ffffff05' }} onClick={() => closeWithBackdropClick ? close() : () => { }}>
                        <div style={{ top: !maximized ? position.top : 0, left: !maximized ? position.left : 0 }} className={`base-modal background-bars box-shadow-small border-radius flex-column${maximized ? ' full-width full-height' : ' padding-xs'}`}>
                            <div onMouseDown={mouseDown} className={`modal-top-bar flex-row${maximized ? ' margin-left-xs margin-right-xs' : ''}`}>
                                <div className="flex1 flex-itens-center">
                                    {title}
                                </div>
                                <div>
                                    <button onClick={toggleMaximize} onMouseDown={e => e.stopPropagation()} className="btn border-radius outline-none modal-btn">
                                        <img height={30} width={30} src={icon_maximizar} alt="Toggle maximize modal" />
                                    </button>
                                    <button onClick={close} onMouseDown={e => e.stopPropagation()} className="btn border-radius outline-none modal-btn" title="Close(Esc)">
                                        <img height={30} width={30} src={icon_close} alt="Close modal" />
                                    </button>
                                </div>
                            </div>
                            <div style={{
                                maxHeight: maximized ? undefined : maxHeight, maxWidth: maximized ? undefined : maxWidth
                            }} className={`modal-top-content background border-radius flex-column padding-s margin-top-xs margin-bottom-xs flex1${maximized ? ' margin-left-xs margin-right-xs' : ''}`}>
                                {children}
                            </div>
                            <div className={`modal-top-footer flex-row modal-top-footer${maximized ? ' margin-left-xs margin-right-xs' : ''}`}>
                                <button onClick={onCancel} className="btn padding-s padding-left-m padding-right-m margin-right-s border-radius outline-none">Cancel</button>
                                <button onClick={onSave} style={{ backgroundColor: 'var(--color-primary)' }} className="btn padding-s padding-left-m padding-right-m border-radius outline-none">Save</button>
                            </div>
                        </div>
                    </div>
                }
            </>
    );
}

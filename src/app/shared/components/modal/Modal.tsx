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
export const Modal: React.FC<ModalProps> = ({ children, maxWidth = 800, maxHeight = 700, title = '', onMaximize, onMinimize, onClose, isOpen, onCancel, onSave, allowBackdropClick = true, closeWithBackdropClick = false }) => {

    const [clickedPosition, setClickedPosition] = useState({ clickedTop: 0, clickedLeft: 0 });

    /** Controla a posição da modal na tela */
    const [position, setPosition] = useState({ top: (window.innerHeight / 2) - 250, left: (window.innerWidth / 2) - 250 });
    const [width, setWidth] = useState(600);
    const [height, setHeight] = useState(400);

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

    const keyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.keyCode === 27) {
            if ((position.left < 0 || position.left > window.innerWidth) || (position.top < 0 || position.top > window.innerHeight)) {
                setPosition({ left: 50, top: 50 });
            }
            close();
        }
    }

    const close = () => {
        setClosed(onClose ? onClose(true) : true);
    }

    const modalMove = {
        mouseMove: (e: MouseEvent) => {
            let newLeft = e.x - clickedPosition.clickedLeft;
            let newTop = e.y - clickedPosition.clickedTop;

            if (maximized) {
                toggleMaximize();
            }

            setPosition({ left: newLeft, top: newTop });
        },
        mouseUp: () => {
            setClickedPosition({ clickedLeft: 0, clickedTop: 0 });
            window.onmousemove = null;
            window.onmouseup = null;
        },
        mouseDown: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            clickedPosition.clickedLeft = e.nativeEvent.offsetX;
            clickedPosition.clickedTop = e.nativeEvent.offsetY;

            setClickedPosition(clickedPosition);
            window.onmousemove = modalMove.mouseMove;
            window.onmouseup = modalMove.mouseUp;
        }
    }

    const resizeLeft = {
        mouseMove: (e: MouseEvent) => {
            const newWidth = e.x - position.left;
            setWidth(newWidth);
        },
        mouseUp: () => {
            window.onmousemove = null;
            window.onmouseup = null;
        },
        mouseDown: () => {
            window.onmousemove = resizeLeft.mouseMove;
            window.onmouseup = resizeLeft.mouseUp;
        }
    }

    const resizeRight = {
        mouseMove: (e: MouseEvent) => {
            const newWidth = (position.left - e.x) + width;

            if (newWidth >= maxWidth || newWidth <= 600) return;

            setPosition({ ...position, left: e.x });
            setWidth(newWidth);
        },
        mouseUp: () => {
            window.onmousemove = null;
            window.onmouseup = null;
        },
        mouseDown: () => {
            window.onmousemove = resizeRight.mouseMove;
            window.onmouseup = resizeRight.mouseUp;
        }
    }

    const resizeBottom = {
        mouseMove: (e: MouseEvent) => {
            const newHeight = e.y - position.top;
            setHeight(newHeight);
        },
        mouseUp: () => {
            window.onmousemove = null;
            window.onmouseup = null;
        },
        mouseDown: () => {
            window.onmousemove = resizeBottom.mouseMove;
            window.onmouseup = resizeBottom.mouseUp;
        }
    }

    const resizeTop = {
        mouseMove: (e: MouseEvent) => {
            const newHeight = (position.top - e.y) + height;

            if (newHeight >= maxHeight || newHeight <= 300) return;

            setPosition({ ...position, top: e.y });
            setHeight(newHeight);
        },
        mouseUp: () => {
            window.onmousemove = null;
            window.onmouseup = null;
        },
        mouseDown: () => {
            window.onmousemove = resizeTop.mouseMove;
            window.onmouseup = resizeTop.mouseUp;
        }
    }

    return (
        closed
            ? <></>
            : <>
                {!allowBackdropClick &&
                    <div tabIndex={0} onKeyDown={keyDown} className="fade-in full-height full-width absolute" style={{ backgroundColor: '#ffffff05' }} onClick={() => closeWithBackdropClick ? close() : () => { }}>
                        <div
                            style={{
                                width: width, height: height,
                                minWidth: maximized ? '100%' : 600,
                                top: !maximized ? position.top : 0,
                                minHeight: maximized ? '100%' : 300,
                                left: !maximized ? position.left : 0,
                                maxWidth: maximized ? '100%' : maxWidth,
                                maxHeight: maximized ? '100%' : maxHeight,
                                transitionDuration: maximized ? '.1s' : undefined,
                            }}
                            className={`base-modal background-bars box-shadow-small flex-column${maximized ? ' full-width full-height' : ''}`}
                        >
                            <div className="full-width padding-bottom-xs" style={{ cursor: 'row-resize' }} onMouseDown={resizeTop.mouseDown} />
                            <div className="flex1">
                                <div className="padding-left-xs" style={{ cursor: 'col-resize' }} onMouseDown={resizeRight.mouseDown} />
                                <div className="flex1 flex-column">

                                    <div onMouseDown={modalMove.mouseDown} onDoubleClick={toggleMaximize} className={`modal-top-bar flex-row${maximized ? ' margin-left-xs margin-right-xs' : ''}`}>
                                        <div className="flex1 flex-itens-center padding-horizontal-s opacity-9">{title}</div>
                                        <div>
                                            <button onClick={toggleMaximize} onMouseDown={e => e.stopPropagation()} className="btn border-radius-soft outline-none modal-btn">
                                                <img height={30} width={30} src={icon_maximizar} alt="Toggle maximize modal" />
                                            </button>
                                            <button onClick={close} onMouseDown={e => e.stopPropagation()} className="btn border-radius-soft outline-none modal-btn" title="Close(Esc)">
                                                <img height={30} width={30} src={icon_close} alt="Close modal" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="full-width padding-bottom-xs" />

                                    <div className={`modal-top-content background flex-column padding-s flex1${maximized ? ' margin-left-xs margin-right-xs' : ''}`}>{children}</div>

                                    <div className={`modal-top-footer padding-top-xs flex-row modal-top-footer${maximized ? ' margin-left-xs margin-right-xs' : ''}`}>
                                        <button onClick={onCancel} className="btn padding-s padding-left-m padding-right-m margin-right-s outline-none border-radius-soft">Cancel</button>
                                        <button onClick={onSave} style={{ backgroundColor: 'var(--color-primary)' }} className="btn padding-s padding-left-m padding-right-m outline-none border-radius-soft">Save</button>
                                    </div>

                                </div>
                                <div className="padding-left-xs" style={{ cursor: 'col-resize' }} onMouseDown={resizeLeft.mouseDown} />
                            </div>
                            <div className="full-width padding-bottom-xs" style={{ cursor: 'row-resize' }} onMouseDown={resizeBottom.mouseDown} />
                        </div>
                    </div>
                }
            </>
    );
}

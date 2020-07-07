import React, { useState, useEffect } from 'react';
import { IconClose, IconMaximize } from 'code-easy-components';

import './Modal.css';

interface ModalProps {
    onClickSecondary?(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
    onClickPrimary?(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
    onMaximize?(value: boolean): boolean;
    onMinimize?(value: boolean): boolean;
    onClose?(value: boolean): boolean;
    closeWithBackdropClick?: boolean;
    extraButtoms?: {
        text: string;
        onClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
    }[];
    allowBackdropClick?: boolean;
    secondaryButtomText?: string;
    primaryButtomText?: string;
    initialHeight?: number;
    initialWidth?: number;
    maxHeight?: number;
    maxWidth?: number;
    isOpen: boolean;
    title?: string;
}
export const Modal: React.FC<ModalProps> = ({ children, extraButtoms = [], primaryButtomText, secondaryButtomText, maxWidth = 800, maxHeight = 700, title = '', initialHeight = 400, initialWidth = 600, onMaximize, onMinimize, onClose, isOpen, onClickPrimary, onClickSecondary, allowBackdropClick = true, closeWithBackdropClick = false }) => {

    const [clickedPosition, setClickedPosition] = useState({ clickedTop: 0, clickedLeft: 0 });

    /** Controla a posição da modal na tela */
    const [position, setPosition] = useState({ top: (window.innerHeight / 2) - 250, left: (window.innerWidth / 2) - 250 });
    const [height, setHeight] = useState(initialHeight);
    const [width, setWidth] = useState(initialWidth);

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

    const close = () => setClosed(onClose ? onClose(true) : true);

    /** Controla as partes redimencionáveis da modal */
    const risizers = {
        initialize: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            if (e.nativeEvent.offsetX <= 4) {
                risizers.resizeLeft.mouseDown();
            } else if (e.nativeEvent.offsetY <= 4) {
                risizers.resizeTop.mouseDown();
            } else if (e.nativeEvent.offsetY >= (e.currentTarget.offsetHeight - 4)) {
                risizers.resizeBottom.mouseDown();
            } else if (e.nativeEvent.offsetX >= (e.currentTarget.offsetWidth - 4)) {
                risizers.resizeRight.mouseDown();
            }
        },
        cursorChange: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {

            if (e.nativeEvent.offsetX <= 4) {
                e.currentTarget.style.cursor = 'col-resize';
            } else if (e.nativeEvent.offsetX >= (e.currentTarget.offsetWidth - 4)) {
                e.currentTarget.style.cursor = 'col-resize';
            } else if (e.nativeEvent.offsetY <= 4) {
                e.currentTarget.style.cursor = 'row-resize';
            } else if (e.nativeEvent.offsetY >= (e.currentTarget.offsetHeight - 4)) {
                e.currentTarget.style.cursor = 'row-resize';
            } else {
                e.currentTarget.style.cursor = 'default';
            }

        },
        modalMove: {
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
                window.document.body.style.cursor = 'unset';
                window.onmousemove = null;
                window.onmouseup = null;
            },
            mouseDown: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                clickedPosition.clickedLeft = e.nativeEvent.offsetX;
                clickedPosition.clickedTop = e.nativeEvent.offsetY;

                setClickedPosition(clickedPosition);
                window.onmousemove = risizers.modalMove.mouseMove;
                window.onmouseup = risizers.modalMove.mouseUp;
            }
        },
        resizeRight: {
            mouseMove: (e: MouseEvent) => {
                const newWidth = (e.x - position.left) - 2;
                setWidth(newWidth);
            },
            mouseUp: () => {
                window.document.body.style.cursor = 'unset';
                window.onmousemove = null;
                window.onmouseup = null;
            },
            mouseDown: () => {
                window.onmousemove = risizers.resizeRight.mouseMove;
                window.onmouseup = risizers.resizeRight.mouseUp;
                window.document.body.style.cursor = 'e-resize';
            }
        },
        resizeLeft: {
            mouseMove: (e: MouseEvent) => {
                const newWidth = ((position.left - e.x) - 2) + width;

                if (newWidth >= maxWidth || newWidth <= 600) return;

                setPosition({ ...position, left: e.x });
                setWidth(newWidth);
            },
            mouseUp: () => {
                window.document.body.style.cursor = 'unset';
                window.onmousemove = null;
                window.onmouseup = null;
            },
            mouseDown: () => {
                window.onmousemove = risizers.resizeLeft.mouseMove;
                window.document.body.style.cursor = 'e-resize';
                window.onmouseup = risizers.resizeLeft.mouseUp;
            }
        },
        resizeBottom: {
            mouseMove: (e: MouseEvent) => {
                const newHeight = (e.y - position.top) - 2;
                setHeight(newHeight);
            },
            mouseUp: () => {
                window.document.body.style.cursor = 'unset';
                window.onmousemove = null;
                window.onmouseup = null;
            },
            mouseDown: () => {
                window.onmousemove = risizers.resizeBottom.mouseMove;
                window.onmouseup = risizers.resizeBottom.mouseUp;
                window.document.body.style.cursor = 'n-resize';
            }
        },
        resizeTop: {
            mouseMove: (e: MouseEvent) => {
                const newHeight = ((position.top - e.y) - 2) + height;

                if (newHeight >= maxHeight || newHeight <= 300) return;

                setPosition({ ...position, top: e.y });
                setHeight(newHeight);
            },
            mouseUp: () => {
                window.document.body.style.cursor = 'unset';
                window.onmousemove = null;
                window.onmouseup = null;
            },
            mouseDown: () => {
                window.onmousemove = risizers.resizeTop.mouseMove;
                window.document.body.style.cursor = 'n-resize';
                window.onmouseup = risizers.resizeTop.mouseUp;
            }
        }
    }

    if (closed) return null;

    return (<>
        {!allowBackdropClick &&
            <div
                tabIndex={0}
                onKeyDown={keyDown}
                style={{ backgroundColor: '#ffffff10', zIndex: 1 }}
                className={"fade-in full-height full-width absolute"}
                onClick={() => closeWithBackdropClick ? close() : undefined}
            />
        }
        <div
            id={"base-modal"}
            style={{
                right: maximized ? 0 : undefined,
                top: maximized ? 0 : position.top,
                bottom: maximized ? 0 : undefined,
                left: maximized ? 0 : position.left,

                width: maximized ? 'auto' : width,
                height: maximized ? 'auto' : height,

                minWidth: maximized ? undefined : 600,
                minHeight: maximized ? undefined : 300,
                maxWidth: maximized ? undefined : maxWidth,
                maxHeight: maximized ? undefined : maxHeight,

                transitionDuration: maximized ? '.1s' : undefined,
            }}
            tabIndex={0}
            onMouseDown={risizers.initialize}
            onMouseMove={risizers.cursorChange}
            className={`base-modal padding-xs background-bars box-shadow-small flex-column${maximized ? ' full-width full-height' : ''}`}
        >
            <div onMouseDown={risizers.modalMove.mouseDown} onDoubleClick={toggleMaximize} className={`modal-top-bar margin-bottom-xs flex-row`}>
                <div className="flex1 flex-items-center padding-horizontal-s opacity-9">{title}</div>
                <div>
                    <button onClick={toggleMaximize} onMouseDown={e => e.stopPropagation()} className="btn border-radius-soft outline-none modal-btn">
                        <img height={30} width={30} src={IconMaximize} alt="Toggle maximize modal" draggable={false} />
                    </button>
                    <button onClick={close} onMouseDown={e => e.stopPropagation()} className="btn border-radius-soft outline-none modal-btn" title="Close(Esc)">
                        <img height={30} width={30} src={IconClose} alt="Close modal" draggable={false} />
                    </button>
                </div>
            </div>

            <div className={`flex1 background padding-s padding-bottom-m overflow-auto`}>
                {children}
            </div>

            <div className={`modal-top-footer padding-top-xs flex-row modal-top-footer`}>
                {extraButtoms.map(btn => <button onClick={btn.onClick} children={btn.text || "Cancel"} className="btn padding-s padding-left-m padding-right-m margin-right-s outline-none border-radius-soft" />)}
                <button onClick={onClickSecondary} className="btn padding-s padding-left-m padding-right-m margin-right-s outline-none border-radius-soft">{secondaryButtomText || "Cancel"}</button>
                <button onClick={onClickPrimary} style={{ backgroundColor: 'var(--color-primary)' }} className="btn padding-s padding-left-m padding-right-m outline-none border-radius-soft">{primaryButtomText || "Save"}</button>
            </div>

        </div>
    </>
    );
}

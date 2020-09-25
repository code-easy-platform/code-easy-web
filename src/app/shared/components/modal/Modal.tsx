import React, { useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { IconClose, IconMaximize } from 'code-easy-components';
import { ModalElement, ModalProps } from './ModalInterfaces';


const _Modal: React.ForwardRefRenderFunction<ModalElement, ModalProps> = ({ children, allowMaximize = true, isOpen: inputIsOpen, title, isFocused = true, maxWidth = window.innerWidth, maxHeight = window.innerHeight, initialHeight = 400, initialWidth = 600, allowBackdropClick = true, closeWithBackdropClick, onClose, onBlur, onFocus, onMaximize, onMinimize }, ref) => {
    const baseref = useRef<HTMLDivElement | null>(null);

    const [clickedPosition, setClickedPosition] = useState({ clickedTop: 0, clickedLeft: 0 });

    /** Controla se a modal está maxinizada ou minimizada */
    const [isMaximized, setIsMaximized] = useState(false);
    const [height, setHeight] = useState(initialHeight);
    const [width, setWidth] = useState(initialWidth);

    const handleRecenter = useCallback(() => {
        const newTop = (window.innerHeight / 2) - (height / 2);
        const newLeft = (window.innerWidth / 2) - (width / 2);

        setPosition({ left: newLeft, top: newTop })
    }, [height, width]);

    /** Controla se a modal está aberta ou fechada */
    const [isOpen, setIsOpen] = useState(inputIsOpen);
    useEffect(() => {
        setIsOpen(inputIsOpen);
        if (!inputIsOpen) {
            handleRecenter();
            baseref.current?.focus();
        }
    }, [handleRecenter, inputIsOpen]);

    const [position, setPosition] = useState({ top: 0, left: 0 });

    const [hasFocused, setHasFocused] = useState(isFocused);
    useEffect(() => {
        if (isFocused !== undefined) {
            setHasFocused(isFocused);
        } else {
            setHasFocused(isFocused);
        }
    }, [isFocused]);

    const handleOnFocus = useCallback(() => {
        setHasFocused(true);
        onFocus && onFocus();
    }, [onFocus]);

    const handleOnBlur = useCallback(() => {
        setHasFocused(false);
        onBlur && onBlur();
    }, [onBlur]);

    const handleClose = useCallback(() => {
        setIsOpen(false);
        onClose && onClose();
    }, [onClose]);

    const toggleMaximize = useCallback(() => {
        if (isMaximized) {
            setIsMaximized(!isMaximized);
            onMinimize && onMinimize();
        } else if (allowMaximize) {
            setIsMaximized(!isMaximized);
            onMaximize && onMaximize();
        }
    }, [allowMaximize, isMaximized, onMaximize, onMinimize]);

    const handleBackdropKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Escape') {
            if ((position.left < 0 || position.left > window.innerWidth) || (position.top < 0 || position.top > window.innerHeight)) {
                setPosition({ left: 50, top: 50 });
            }
            handleClose && handleClose();
        }
    }, [handleClose, position.left, position.top]);

    const handleOpen = useCallback(() => {
        setIsOpen(true);
        handleOnFocus();
    }, [handleOnFocus]);

    /** Controla as partes redimencionáveis da modal */
    const resizers = {
        initialize: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {

            const mouseLeft = e.nativeEvent.x - e.currentTarget.offsetLeft;
            const mouseTop = e.nativeEvent.y - e.currentTarget.offsetTop;

            if ((mouseLeft >= (e.currentTarget.offsetWidth - 8)) && (mouseTop >= (e.currentTarget.offsetHeight - 8))) {
                resizers.resizeBottomRight.mouseDown();
            } else if ((mouseLeft <= 8) && (mouseTop >= (e.currentTarget.offsetHeight - 8))) {
                resizers.resizeBottomLeft.mouseDown();
            } else if ((mouseLeft <= 8) && (mouseTop <= 8)) {
                resizers.resizeTopLeft.mouseDown();
            } else if ((mouseLeft >= (e.currentTarget.offsetWidth - 8)) && (mouseTop <= 8)) {
                resizers.resizeTopRight.mouseDown();
            } else {
                if (mouseLeft <= 4) {
                    resizers.resizeLeft.mouseDown();
                } else if (mouseTop <= 4) {
                    resizers.resizeTop.mouseDown();
                } else if (mouseTop >= (e.currentTarget.offsetHeight - 4)) {
                    resizers.resizeBottom.mouseDown();
                } else if (mouseLeft >= (e.currentTarget.offsetWidth - 4)) {
                    resizers.resizeRight.mouseDown();
                }
            }
        },
        cursorChange: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {

            const mouseLeft = e.nativeEvent.x - e.currentTarget.offsetLeft;
            const mouseTop = e.nativeEvent.y - e.currentTarget.offsetTop;

            if ((mouseLeft >= (e.currentTarget.offsetWidth - 8)) && (mouseTop >= (e.currentTarget.offsetHeight - 8))) {
                e.currentTarget.style.cursor = 'nw-resize';
            } else if ((mouseLeft <= 8) && (mouseTop >= (e.currentTarget.offsetHeight - 8))) {
                e.currentTarget.style.cursor = 'ne-resize';
            } else if ((mouseLeft <= 8) && (mouseTop <= 8)) {
                e.currentTarget.style.cursor = 'nw-resize';
            } else if ((mouseLeft >= (e.currentTarget.offsetWidth - 8)) && (mouseTop <= 8)) {
                e.currentTarget.style.cursor = 'ne-resize';
            } else {
                if (mouseLeft <= 4) {
                    e.currentTarget.style.cursor = 'col-resize';
                } else if (mouseLeft >= (e.currentTarget.offsetWidth - 4)) {
                    e.currentTarget.style.cursor = 'col-resize';
                } else if (mouseTop <= 4) {
                    e.currentTarget.style.cursor = 'row-resize';
                } else if (mouseTop >= (e.currentTarget.offsetHeight - 4)) {
                    e.currentTarget.style.cursor = 'row-resize';
                } else {
                    e.currentTarget.style.cursor = 'unset';
                }
            }
        },
        modalMove: {
            mouseMove: (e: MouseEvent) => {
                let newLeft = e.x - clickedPosition.clickedLeft;
                let newTop = e.y - clickedPosition.clickedTop;

                if (isMaximized) {
                    toggleMaximize();
                }

                setPosition(oldPosition => ({
                    top: newTop > -1 ? newTop : oldPosition.top,
                    left: newLeft,
                }));
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

                window.document.body.style.cursor = 'grabbing';

                setClickedPosition(clickedPosition);
                window.onmousemove = resizers.modalMove.mouseMove;
                window.onmouseup = resizers.modalMove.mouseUp;
            }
        },
        resizeRight: {
            mouseMove: (e: MouseEvent) => {
                const newWidth = (e.x - position.left) - 2;

                if (newWidth >= maxWidth || newWidth <= 600) return;

                setWidth(newWidth);
            },
            mouseUp: () => {
                window.document.body.style.cursor = 'unset';
                window.onmousemove = null;
                window.onmouseup = null;
            },
            mouseDown: () => {
                window.onmousemove = resizers.resizeRight.mouseMove;
                window.onmouseup = resizers.resizeRight.mouseUp;
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
                window.onmousemove = resizers.resizeLeft.mouseMove;
                window.document.body.style.cursor = 'e-resize';
                window.onmouseup = resizers.resizeLeft.mouseUp;
            }
        },
        resizeBottom: {
            mouseMove: (e: MouseEvent) => {
                const newHeight = (e.y - position.top) - 2;

                if (newHeight >= maxHeight || newHeight <= 300) return;

                setHeight(newHeight);
            },
            mouseUp: () => {
                window.document.body.style.cursor = 'unset';
                window.onmousemove = null;
                window.onmouseup = null;
            },
            mouseDown: () => {
                window.onmousemove = resizers.resizeBottom.mouseMove;
                window.onmouseup = resizers.resizeBottom.mouseUp;
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
                window.onmousemove = resizers.resizeTop.mouseMove;
                window.document.body.style.cursor = 'n-resize';
                window.onmouseup = resizers.resizeTop.mouseUp;
            }
        },
        resizeBottomRight: {
            mouseMove: (e: MouseEvent) => {
                const newHeight = (e.y - position.top) - 2;
                const newWidth = (e.x - position.left) - 2;

                const changeHeight = !(newHeight >= maxHeight || newHeight <= 300);
                const changeWidth = !(newWidth >= maxWidth || newWidth <= 600);

                if (changeHeight) setHeight(newHeight);
                if (changeWidth) setWidth(newWidth);
            },
            mouseUp: () => {
                window.document.body.style.cursor = 'unset';
                window.onmousemove = null;
                window.onmouseup = null;
            },
            mouseDown: () => {
                window.onmousemove = resizers.resizeBottomRight.mouseMove;
                window.onmouseup = resizers.resizeBottomRight.mouseUp;
                window.document.body.style.cursor = 'nw-resize';
            }
        },
        resizeBottomLeft: {
            mouseMove: (e: MouseEvent) => {
                const newWidth = ((position.left - e.x) - 2) + width;
                const newHeight = (e.y - position.top) - 2;

                const changeHeight = !(newHeight >= maxHeight || newHeight <= 300);
                const changeWidth = !(newWidth >= maxWidth || newWidth <= 600);

                if (changeWidth) {
                    setPosition({ ...position, left: e.x });
                    setWidth(newWidth);
                }

                if (changeHeight) setHeight(newHeight);
            },
            mouseUp: () => {
                window.document.body.style.cursor = 'unset';
                window.onmousemove = null;
                window.onmouseup = null;
            },
            mouseDown: () => {
                window.onmousemove = resizers.resizeBottomLeft.mouseMove;
                window.onmouseup = resizers.resizeBottomLeft.mouseUp;
                window.document.body.style.cursor = 'ne-resize';
            }
        },
        resizeTopLeft: {
            mouseMove: (e: MouseEvent) => {
                const newHeight = ((position.top - e.y) - 2) + height;
                const newWidth = ((position.left - e.x) - 2) + width;

                const changeHeight = !(newHeight >= maxHeight || newHeight <= 300);
                const changeWidth = !(newWidth >= maxWidth || newWidth <= 600);

                setPosition(oldPosition => ({
                    left: changeWidth ? e.x : oldPosition.left,
                    top: changeHeight ? e.y : oldPosition.top,
                }));

                if (changeHeight) setHeight(newHeight);
                if (changeWidth) setWidth(newWidth);
            },
            mouseUp: () => {
                window.document.body.style.cursor = 'unset';
                window.onmousemove = null;
                window.onmouseup = null;
            },
            mouseDown: () => {
                window.onmousemove = resizers.resizeTopLeft.mouseMove;
                window.onmouseup = resizers.resizeTopLeft.mouseUp;
                window.document.body.style.cursor = 'nw-resize';
            }
        },
        resizeTopRight: {
            mouseMove: (e: MouseEvent) => {
                const newHeight = ((position.top - e.y) - 2) + height;
                const newWidth = (e.x - position.left) - 2;

                const changeHeight = !(newHeight >= maxHeight || newHeight <= 300);
                const changeWidth = !(newWidth >= maxWidth || newWidth <= 600);

                if (changeHeight) {
                    setPosition({ ...position, top: e.y });
                    setHeight(newHeight);
                }

                if (changeWidth) setWidth(newWidth);
            },
            mouseUp: () => {
                window.document.body.style.cursor = 'unset';
                window.onmousemove = null;
                window.onmouseup = null;
            },
            mouseDown: () => {
                window.onmousemove = resizers.resizeTopRight.mouseMove;
                window.onmouseup = resizers.resizeTopRight.mouseUp;
                window.document.body.style.cursor = 'ne-resize';
            }
        },
    };

    useImperativeHandle(ref, () => ({
        height: isMaximized && baseref.current ? baseref.current.clientHeight : height,
        width: isMaximized && baseref.current ? baseref.current.clientWidth : width,
        setPosition: (top, left) => setPosition({ top, left }),
        focus: () => setHasFocused(true),
        toggleMaximize: toggleMaximize,
        recenter: handleRecenter,
        close: handleClose,
        open: handleOpen,
        isMaximized,
        position,
        isOpen,
    }));

    if (!isOpen) return null;

    return (<>
        {!allowBackdropClick &&
            <div
                tabIndex={0}
                onKeyDown={handleBackdropKeyDown}
                onFocus={() => baseref.current?.focus()}
                style={{ backgroundColor: '#ffffff10' }}
                className={"fade-in full-height full-width absolute z2"}
                onClick={() => closeWithBackdropClick && handleClose ? handleClose() : undefined}
            />
        }
        <div
            tabIndex={0}
            onMouseDown={resizers.initialize}
            onMouseMove={resizers.cursorChange}
            onFocus={() => setHasFocused(true)}
            className="fixed outline-none padding-xs z3 fade-in"
            style={{
                minWidth: 600,
                minHeight: 300,

                right: isMaximized ? 0 : undefined,
                top: isMaximized ? 0 : position.top,
                bottom: isMaximized ? 0 : undefined,
                left: isMaximized ? 0 : position.left,

                width: isMaximized ? 'auto' : width,
                height: isMaximized ? 'auto' : height,
            }}
        >
            <div
                tabIndex={0}
                ref={baseref}
                onBlur={handleOnBlur}
                onFocus={handleOnFocus}
                onKeyDown={handleBackdropKeyDown}
                style={{ boxShadow: `0 0 ${hasFocused ? '20' : '10'}px 0px #0000008a` }}
                className={`flex1 outline-none flex-column background no-events ${hasFocused ? 'z5 border-default' : 'z3 border-default-transparent'}`}
            >
                <div
                    onDoubleClick={toggleMaximize}
                    onContextMenu={e => e.preventDefault()}
                    onMouseDown={resizers.modalMove.mouseDown}
                    className="background-bars flex-items-center events-all"
                >
                    <div className="padding-s flex1 no-events">
                        <p className="full-width text-ellipsis">{title}</p>
                    </div>
                    {allowMaximize && <img
                        src={IconMaximize}
                        onClick={toggleMaximize}
                        alt="Toggle maximize modal"
                        onMouseDown={e => e.stopPropagation()}
                        className="hover active cursor-pointer no-draggable opacity-8"
                    />}
                    <img
                        src={IconClose}
                        alt="Close modal"
                        onClick={handleClose}
                        onMouseDown={e => e.stopPropagation()}
                        onDoubleClick={e => e.stopPropagation()}
                        className="hover active cursor-pointer no-draggable"
                    />
                </div>
                <div className="flex1 flex-column events-all overflow-auto">
                    {children}
                </div>
            </div>
        </div>
    </>);
}

export const Modal = React.forwardRef(_Modal);

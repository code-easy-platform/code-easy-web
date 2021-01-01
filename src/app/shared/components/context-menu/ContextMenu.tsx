import React, { useCallback, useEffect, useRef } from 'react';
import { useObserver } from 'react-observing';
import { ContextMenuStore } from '../../stores';

import './ContextMenu.css';

export const ContextMenu: React.FC<{ title?: string }> = ({ title }) => {
    const contextMenuRef = useRef<HTMLDivElement | null>(null);

    const [state, setState] = useObserver(ContextMenuStore);

    useEffect(() => {
        if (contextMenuRef.current && state.isShow) {
            contextMenuRef.current.focus();
        }
    }, [state.isShow]);

    const handleLostFocus = useCallback(() => {
        setState({
            isShow: false,
            actions: [],
            left: -100,
            top: -100,
        });
    }, [setState]);

    if (!state.isShow) return null;

    return (
        <div
            className="context-view fade-in flex-column outline-none"
            style={{ left: state.left, top: state.top }}
            onBlur={handleLostFocus}
            ref={contextMenuRef}
            tabIndex={0}
        >
            {title && <div className="context-menu-title">{title}</div>}
            {state.actions.map(({ action, label, disabled, icon, useConfirmation, confirmationMessage }, index) => {

                if (label === '-') {
                    return <hr key={`hr-${index}`} className="hr-white margin-s margin-top-xs margin-bottom-xs border-default" />;
                }

                return (
                    <div
                        key={index}
                        className={`context-menu-list-item padding-horizontal-sm flex-items-center${disabled ? ' disabled' : ' cursor-pointer'}`}
                        onClick={e => {
                            e.stopPropagation();
                            e.preventDefault();

                            if (disabled) return;

                            // Close context menu and clear options list
                            handleLostFocus();

                            if (useConfirmation) {
                                if (window.confirm(confirmationMessage || 'Continue?')) {
                                    action();
                                }
                            } else {
                                action();
                            }
                        }}
                    >
                        <img
                            className={"padding-right-s no-draggable"}
                            style={{ opacity: icon ? 1 : 0 }}
                            height={16}
                            width={16}
                            src={icon}
                            alt=""
                        />
                        {label}
                    </div>
                )
            })}
        </div>
    );
}

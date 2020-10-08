import React, { useCallback, useEffect, useRef, useState } from 'react';

import { ContextMenuService } from './ContextMenuService';
import './ContextMenu.css';

export interface IContextItemList {
    icon?: any;
    label: string;
    action(): any;
    disabled?: boolean;
    useConfirmation?: boolean;
    confirmationMessage?: string;
}

interface ContextMenuSate {
    actions: IContextItemList[],
    isShow: boolean,
    left: number,
    top: number,
}

export const ContextMenu: React.FC<{ title?: string }> = ({ title }) => {
    const contextMenuRef = useRef<HTMLDivElement | null>(null);
    const subscription = useRef<any>();

    const [state, setState] = useState<ContextMenuSate>({
        isShow: false,
        actions: [],
        left: 0,
        top: 0,
    });
    useEffect(() => {
        subscription.current = ContextMenuService.getMessage().subscribe(data => {
            setState({
                actions: data.actions,
                left: data.left,
                top: data.top,
                isShow: true,
            });
        });

        return subscription.current.unsubscribe;
    }, []);

    useEffect(() => {
        if (contextMenuRef.current && state.isShow) {
            contextMenuRef.current.focus();
        }
    }, [state.isShow]);

    const handleLostFocus = useCallback(() => {
        ContextMenuService.clearMessages();
        setState({
            isShow: false,
            actions: [],
            left: -100,
            top: -100,
        });
    }, []);

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

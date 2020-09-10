import React, { useCallback } from 'react';
import { IconClose } from 'code-easy-components';

import { OpenWindow } from '../../../interfaces';

interface TabButtonProps extends OpenWindow {
    onContext?(tabId: string | undefined): void;
    onSelect?(tabId: string | undefined): void;
    onClose?(tabId: string | undefined): void;
    icon?: any;
}
export const TabButton: React.FC<TabButtonProps> = ({ id, description, title, icon, className, hasError, hasWarning, isSelected, useClose = true, onSelect, onContext, onClose }) => {

    const handleContext = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        e.preventDefault();

        onContext && onContext(id);
    }, [id, onContext]);

    const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        e.preventDefault();

        if (e.button === 1) {
            onClose && onClose(id);
        } else {
            onSelect && onSelect(id);
        }

        onSelect && onSelect(id);
    }, [id, onClose, onSelect]);

    const handleClose = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        e.preventDefault();

        onClose && onClose(id);
    }, [id, onClose]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
        e.stopPropagation();
        e.preventDefault();

        if (e.keyCode === 32) {
            onSelect && onSelect(id);
        }
    }, [id, onSelect]);

    return (
        <>
            <div
                role="tab"
                tabIndex={0}
                title={description}
                onKeyDown={handleKeyDown}
                onMouseDown={handleMouseDown}
                onContextMenu={handleContext}
                className={`window-tab-item flex-items-center outline-none opacity-6 cursor-pointer border-none ${isSelected ? "window-tab-selected" : ""} ${className}`}
            >
                <img height="50%" className="margin-left-s" style={{ maxWidth: 20 }} src={icon} alt={title} />
                <span className={`padding-horizontal-s text-ellipsis ${hasError ? "main-text-error-color" : hasWarning ? "main-text-warning-color" : ""}`}>{title}</span>
                {useClose && <img
                    className="background-transparent btn-close no-draggable outline-none opacity-0 margin-right-xs"
                    onMouseDown={e => e.stopPropagation()}
                    onClick={handleClose}
                    src={IconClose}
                    alt="tab-close"
                />}
            </div>
            <hr className="hr hr-vertical opacity-5" />
        </>
    );
}

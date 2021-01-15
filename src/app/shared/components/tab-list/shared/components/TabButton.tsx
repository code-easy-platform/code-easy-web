import React, { useCallback } from 'react';
import { IObservable, useObserverValue } from 'react-observing';
import { IconClose } from 'code-easy-components';

import { ITab, IFileContent } from './../interfaces';

interface TabButtonProps extends ITab {
    onContext?(tabId: string | undefined, e: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
    icon: IObservable<IFileContent | string | undefined>;
    onSelect?(tabId: string | undefined): void;
    onClose?(tabId: string | undefined): void;
    isHighlighted?: boolean;
    useClose?: boolean;
    className?: string;
}
export const TabButton: React.FC<TabButtonProps> = ({ className, useClose = true, isHighlighted = false, onSelect, onContext, onClose, ...props }) => {
    const description = useObserverValue(props.description);
    const isSelected = useObserverValue(props.isSelected);
    const hasWarning = useObserverValue(props.hasWarning);
    const hasError = useObserverValue(props.hasError);
    const title = useObserverValue(props.title);
    const icon = useObserverValue(props.icon);
    const id = useObserverValue(props.id);

    const getIconContent = useCallback((icon: IFileContent | string) => {
        if (typeof icon === 'string') {
            return icon
        } else {
            return icon.content?.toString();
        }
    }, []);

    const handleContext = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        e.preventDefault();

        onContext && onContext(id, e);
    }, [id, onContext]);

    const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        e.preventDefault();

        if (e.button === 1) {
            onClose && onClose(id);
        } else if (e.button === 2) {
            return;
        } else {
            onSelect && onSelect(id);
        }
    }, [id, onClose, onSelect]);

    const handleClose = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        e.preventDefault();

        onClose && onClose(id);
    }, [id, onClose]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
        e.stopPropagation();
        e.preventDefault();

        if (e.key === ' ') {
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
                className={`tab-item ${isSelected ? "tab-selected" : isHighlighted && "tab-highlighted"} flex-items-center outline-none opacity-6 cursor-pointer border-none ${className}`}
            >
                <img height="50%" className="margin-left-s no-events" style={{ maxWidth: 20 }} src={icon && getIconContent(icon)} alt="" />
                <span className={`padding-horizontal-s no-events text-ellipsis ${hasError ? "main-text-error-color" : hasWarning ? "main-text-warning-color" : ""}`}>{title}</span>
                {useClose && <img
                    src={IconClose}
                    onClick={handleClose}
                    alt="tab-button-close"
                    onMouseDown={e => e.stopPropagation()}
                    className="background-transparent btn-close no-draggable outline-none opacity-0 margin-right-xs"
                />}
            </div>
            <hr className="hr hr-vertical opacity-5 no-events" />
        </>
    );
}

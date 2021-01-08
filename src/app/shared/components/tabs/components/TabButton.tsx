import React, { useCallback } from 'react';
import { IObservable, useObserverValue } from 'react-observing';
import { IconClose } from 'code-easy-components';

import { IOpenedWindow } from '../../../interfaces';
import { IFileContent } from '../../external';

interface TabButtonProps extends IOpenedWindow {
    onContext?(tabId: string | undefined): void;
    onSelect?(tabId: string | undefined): void;
    onClose?(tabId: string | undefined): void;
    icon: IObservable<IFileContent | string>;
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
                className={`window-tab-item flex-items-center outline-none opacity-6 cursor-pointer border-none ${isSelected ? "window-tab-selected" : isHighlighted ? "window-tab-highlighted" : ""} ${className}`}
            >
                <img height="50%" className="margin-left-s" style={{ maxWidth: 20 }} src={getIconContent(icon)} alt="" />
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

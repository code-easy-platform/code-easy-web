import React, { Fragment, useCallback, memo } from 'react';
import { IconClose } from 'code-easy-components';

import { OpenWindow } from '../../interfaces/OpenedWindow';
import './TabsManager.css';

interface TabsManagerProps {
    tabs: OpenWindow[],
    onChange?(tabId: string): void,
    onCloseWindowTab?(tabId: string): void;
    onContextWindowTab?(tabId: string): void;
}
export const TabsManager: React.FC<TabsManagerProps> = memo(({ tabs, onChange, onContextWindowTab, onCloseWindowTab }) => {

    const closeTab = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>, tabId: string) => {
        e.preventDefault();
        e.stopPropagation();
        onCloseWindowTab && onCloseWindowTab(tabId);
    }, [onCloseWindowTab]);

    const onWeel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
        if (e.deltaY > 0) {
            e.currentTarget.scrollLeft += 25;
        } else {
            e.currentTarget.scrollLeft -= 25;
        }
    }, []);

    const onClick = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>, tabId: string) => {
        if (e.button === 1) {
            onCloseWindowTab && onCloseWindowTab(tabId);
        } else {
            onChange && onChange(tabId);
        }
    }, [onChange, onCloseWindowTab]);

    return (
        <div className="window-tabs-manager" onWheel={onWeel}>
            {tabs.map(({ id, title, className = "", isSelected = false, description, hasError, hasWarning }, index) => {
                return (
                    <Fragment key={index}>
                        <div
                            tabIndex={0}
                            title={description}
                            onMouseDown={e => onClick(e, id)}
                            onKeyDown={e => { if (e.keyCode === 32) { onClick(e as any, id); } }}
                            className={`window-tab-item flex-items-center outline-none opacity-6 cursor-pointer border-none ${isSelected ? "window-tab-selected" : ""} ${className}`}
                            onContextMenu={e => { e.preventDefault(); onContextWindowTab && onContextWindowTab(id); }}
                        >
                            <div className={`padding-s padding-horizontal-m text-ellipsis ${hasError ? "main-text-error-color" : hasWarning ? "main-text-warning-color" : ""}`}>{title}</div>
                            <img
                                className="btn background-transparent btn-close no-draggable outline-none opacity-0 margin-right-xs"
                                onMouseDown={e => e.stopPropagation()}
                                onClick={e => closeTab(e, id)}
                                src={IconClose}
                                alt="btn-close"
                            />
                        </div>
                        <hr className="hr hr-vertical opacity-5" />
                    </Fragment>
                );
            })}
        </div>
    );
});

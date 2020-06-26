import React, { Fragment } from 'react';
import { IconClose } from 'code-easy-components';

import { OpenWindow } from '../../interfaces/OpenedWindow';
import './TabsManager.css';

interface TabsManagerProps {
    tabs: OpenWindow[],
    onChange?(tabId: string): void,
    onCloseWindowTab?(tabId: string): void;
    onContextWindowTab?(tabId: string): void;
}
export const TabsManager: React.FC<TabsManagerProps> = ({ tabs, onChange, onContextWindowTab, onCloseWindowTab }) => {

    const closeTab = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, tabId: string) => {
        e.stopPropagation();
        onCloseWindowTab && onCloseWindowTab(tabId);
    }

    const onWeel = (e: React.WheelEvent<HTMLDivElement>) => {
        if (e.deltaY > 0) {
            e.currentTarget.scrollLeft += 25;
        } else {
            e.currentTarget.scrollLeft -= 25;
        }
    }

    const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, tabId: string) => {
        if (e.button === 1)
            onCloseWindowTab && onCloseWindowTab(tabId);
        else
            onChange && onChange(tabId);
    }

    return (
        <div className="window-tabs-manager" onWheel={onWeel}>
            {tabs.map(({ id, title, className = "", isSelected = false }, index) => {
                return (
                    <Fragment key={index}>
                        <div
                            tabIndex={0}
                            onMouseDown={e => onClick(e, id)}
                            className={"window-tab-item " + (isSelected ? "window-tab-selected " : "") + className}
                            onContextMenu={e => { e.preventDefault(); onContextWindowTab && onContextWindowTab(id); }}
                        >
                            <div className="padding-m text-ellipsis">{title}</div>
                            <img onClick={e => closeTab(e, id)} className="btn btn-close" src={IconClose} alt="btn-close" />
                        </div>
                        <hr className="hr hr-vertical opacity-5" />
                    </Fragment>
                );
            })}
        </div>
    );
}
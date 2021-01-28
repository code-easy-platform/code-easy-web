import React, { useCallback, memo } from 'react';
import { set } from 'react-observing';

import { TabButton } from './shared/components';
import { ITab } from './shared/interfaces';
import './shared/style/TabList.css';

interface TabListProps {
    useClose?: boolean;
    tabs: ITab[];
    isHighlighted?: boolean;
    onCloseTab?(tabId: string): void;
    onContextTab?(tabId: string, e: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
}
export const TabList: React.FC<TabListProps> = memo(({ tabs, useClose, isHighlighted = false, onContextTab, onCloseTab }) => {

    const onWeel = useCallback((e: React.WheelEvent<HTMLElement>) => {
        if (e.deltaY > 0) {
            e.currentTarget.scrollLeft += 30;
        } else {
            e.currentTarget.scrollLeft -= 30;
        }
    }, []);

    return (
        <nav role="tablist" className="tab-list font-size-xg" onWheel={onWeel} onContextMenu={e => e.preventDefault()}>
            {tabs.map((tab, index) => (
                <TabButton
                    {...tab}
                    key={index}
                    useClose={useClose}
                    onClose={onCloseTab}
                    onContext={onContextTab}
                    isHighlighted={isHighlighted}
                    onSelect={() => tabs.forEach(oldTab => set(oldTab.isSelected, oldTab.id.value === tab.id.value))}
                />
            ))}
        </nav>
    );
});

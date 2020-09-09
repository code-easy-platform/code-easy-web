import React, { useCallback, memo } from 'react';

import { OpenWindow } from '../../interfaces/OpenedWindow';
import { TabButton } from './components/TabButton';
import './TabsManager.css';

interface TabsManagerProps {
    tabs: OpenWindow[],
    onChange?(tabId: string): void,
    onCloseWindowTab?(tabId: string): void;
    onContextWindowTab?(tabId: string): void;
}
export const TabsManager: React.FC<TabsManagerProps> = memo(({ tabs, onChange, onContextWindowTab, onCloseWindowTab }) => {

    const onWeel = useCallback((e: React.WheelEvent<HTMLElement>) => {
        if (e.deltaY > 0) {
            e.currentTarget.scrollLeft += 30;
        } else {
            e.currentTarget.scrollLeft -= 30;
        }
    }, []);

    return (
        <nav role="tablist" className="window-tabs-manager font-size-xg" onWheel={onWeel}>
            {tabs.map((tab, index) => (
                <TabButton
                    {...tab}
                    key={index}
                    onSelect={onChange}
                    onClose={onCloseWindowTab}
                    onContext={onContextWindowTab}
                />
            ))}
        </nav>
    );
});

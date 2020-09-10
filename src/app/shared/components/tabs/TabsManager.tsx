import React, { useCallback, memo } from 'react';

import { OpenWindow } from '../../interfaces/OpenedWindow';
import { TabButton } from './components/TabButton';
import { FontSize } from '../../types';
import './Tabs.css';

interface OpenWindowWithIcon extends OpenWindow {
    icon?: any;
}

interface TabsManagerProps {
    tabs: OpenWindowWithIcon[];
    fontSize?: FontSize;
    onChange?(tabId: string): void;
    onCloseWindowTab?(tabId: string): void;
    onContextWindowTab?(tabId: string): void;
}
export const TabsManager: React.FC<TabsManagerProps> = memo(({ tabs, fontSize = 'xg', onChange, onContextWindowTab, onCloseWindowTab }) => {

    const onWeel = useCallback((e: React.WheelEvent<HTMLElement>) => {
        if (e.deltaY > 0) {
            e.currentTarget.scrollLeft += 30;
        } else {
            e.currentTarget.scrollLeft -= 30;
        }
    }, []);

    return (
        <nav role="tablist" className={`window-tabs-manager font-size-${fontSize}`} onWheel={onWeel}>
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

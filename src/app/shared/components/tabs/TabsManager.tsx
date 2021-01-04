import React, { useCallback, memo } from 'react';

import { TabButton } from './components/TabButton';
import { IOpenedWindow } from '../../interfaces';
import { FontSize } from '../../types';
import './Tabs.css';
import { set } from 'react-observing';

interface OpenWindowWithIcon extends IOpenedWindow {
    icon?: any;
}

interface TabsManagerProps {
    fontSize?: FontSize;
    tabs: OpenWindowWithIcon[];
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
                    icon={tab.icon.value}
                    onClose={onCloseWindowTab}
                    onContext={onContextWindowTab}
                    onSelect={() => {
                        tabs.forEach(oldTab => set(oldTab.isSelected, oldTab.id.value === tab.id.value))
                    }}
                />
            ))}
        </nav>
    );
});

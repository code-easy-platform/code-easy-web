import React, { useCallback, memo } from 'react';
import { set } from 'react-observing';

import { TabButton } from './components/TabButton';
import { IOpenedWindow } from '../../interfaces';
import { FontSize } from '../../types';
import './Tabs.css';

interface TabsManagerProps {
    useClose?: boolean;
    fontSize?: FontSize;
    tabs: IOpenedWindow[];
    onCloseWindowTab?(tabId: string): void;
    onContextWindowTab?(tabId: string): void;
}
export const TabsManager: React.FC<TabsManagerProps> = memo(({ tabs, useClose, fontSize = 'xg', onContextWindowTab, onCloseWindowTab }) => {

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
                    icon={tab.icon}
                    useClose={useClose}
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

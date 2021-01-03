import React, { useCallback, memo } from 'react';

import { TabButton } from './components/TabButton';
import { IOpenedWindow } from '../../interfaces';
import { FontSize } from '../../types';
import './Tabs.css';

interface OpenWindowWithIcon extends IOpenedWindow {
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
                    key={index}
                    id={tab.id.value}
                    onSelect={onChange}
                    icon={tab.icon.value}
                    title={tab.title.value}
                    onClose={onCloseWindowTab}
                    hasError={tab.hasError.value}
                    onContext={onContextWindowTab}
                    isSelected={tab.isSelected.value}
                    hasWarning={tab.hasWarning.value}
                    description={tab.description.value}
                />
            ))}
        </nav>
    );
});

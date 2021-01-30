import React, { useCallback, memo, useState } from 'react';
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
    const [showRightShadow, setShowRightShadow] = useState(false);
    const [showLeftShadow, setShowLeftShadow] = useState(false);

    const onWeel = useCallback((e: React.WheelEvent<HTMLElement>) => {
        if (e.deltaY > 0) {
            e.currentTarget.scrollLeft += 30;
        } else {
            e.currentTarget.scrollLeft -= 30;
        }
    }, []);

    const handleOnScroll = useCallback((e: React.UIEvent<HTMLElement, UIEvent>) => {
        if (e.currentTarget.scrollLeft > 0) {
            if (!showLeftShadow) {
                setShowLeftShadow(true);
            }
        } else {
            setShowLeftShadow(false);
        }

        if (Math.ceil(e.currentTarget.scrollLeft + e.currentTarget.offsetWidth) < e.currentTarget.scrollWidth) {
            if (!showRightShadow) {
                setShowRightShadow(true);
            }
        } else {
            setShowRightShadow(false);
        }
    }, [showLeftShadow, showRightShadow]);

    return (
        <nav
            role="tablist"
            onWheel={onWeel}
            onScroll={handleOnScroll}
            className="tab-list font-size-xg"
            onContextMenu={e => e.preventDefault()}
            style={{ boxShadow: `inset 20px -10px 5px -20px ${showLeftShadow ? "black" : "transparent"}, inset -20px -10px 5px -20px ${showRightShadow ? "black" : "transparent"}` }}
        >
            {tabs.map((tab, index, array) => (
                <TabButton
                    {...tab}
                    key={index}
                    hasDivider={!(array.length - 1 === index)}
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

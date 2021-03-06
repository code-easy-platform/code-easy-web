import React, { CSSProperties } from 'react';

import { FontSize } from '../../types';
import './Tabs.css';

interface TabGroupProps {
    className?: string;
    fontSize?: FontSize;
    style?: CSSProperties;
}
export const TabGroup: React.FC<TabGroupProps> = ({ className = "", fontSize = 'xg', children, style }) => <div className={`tab-group flex-space-between font-size-${fontSize} full-width ${className}`} style={style}>{children}</div>;

interface ITabButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    hasError?: boolean;
    fontSize?: FontSize;
    hasWarning?: boolean;
    isSelected?: boolean;
}
export const TabButtonSimple: React.FC<ITabButtonProps> = ({ hasError, hasWarning, fontSize = 'xg', isSelected, ...props }) => {
    return (
        <button
            {...props}
            tabIndex={props.tabIndex || 0}
            className={`border-none cursor-pointer background-transparent text-white flex-justfy-center flex-items-center outline-none padding-s opacity-7${hasError ? 'text-underline-error' : ''} ${hasWarning ? 'text-underline-warning' : ''} font-size-${fontSize}${isSelected ? " btn-tab-selected opacity-10" : ""} ${props.className}`}
        />
    );
};

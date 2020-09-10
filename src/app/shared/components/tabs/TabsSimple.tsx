import React, { CSSProperties, memo } from 'react';
import { useHistory } from 'react-router-dom';

import { FontSize } from '../../types';
import './Tabs.css';

interface TabGroupProps {
    className?: string;
    fontSize?: FontSize;
    style?: CSSProperties;
}
export const TabGroup: React.FC<TabGroupProps> = memo(({ className = "", fontSize = 'xg', children, style }) => <div className={`tab-group flex-space-between font-size-${fontSize} full-width ${className}`} style={style}>{children}</div>);

interface ITabButtonProps {
    id: string;
    content?: any;
    title?: string;
    className?: String;
    fontSize?: FontSize;
    isSelected?: boolean;
    style?: CSSProperties;
    to?: string | undefined;
    onFocus?(e: React.FocusEvent<HTMLDivElement>): void;
    onClick?(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
}
export const TabButton: React.FC<ITabButtonProps> = memo(({ to, fontSize = 'xg', ...props }) => {
    const history = useHistory();
    return (
        <div
            tabIndex={0}
            key={props.id}
            title={props.title}
            style={props.style}
            children={props.content}
            onDragEnter={props.onClick}
            onFocus={!to ? props.onFocus : () => history.push(to)}
            onClick={!to ? props.onClick : () => history.push(to)}
            className={`border-none cursor-pointer background-transparent flex-justfy-center flex-items-center outline-none padding-s opacity-7 font-size-${fontSize}${props.isSelected ? " btn-tab-selected opacity-10" : ""} ${props.className}`}
        />
    );
});

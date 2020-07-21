import React, { CSSProperties, memo } from 'react';
import { useHistory } from 'react-router-dom';

import './TabButton.css';

interface TabGroupProps {
    className?: string;
    style?: CSSProperties;
}
export const TabGroup: React.FC<TabGroupProps> = memo(({ className, children, style }) => <div className={"tab-group flex-space-between font-size-m full-width " + className} style={style}>{children}</div>);


interface ITabButtonProps {
    id: string;
    content?: any;
    title?: string;
    className?: String;
    isSelected?: boolean;
    style?: CSSProperties;
    to?: string | undefined;
    onFocus?(e: React.FocusEvent<HTMLDivElement>): void;
    onClick?(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
}
export const TabButton: React.FC<ITabButtonProps> = memo(({ to, ...props }) => {
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
            className={"btn-tab outline-none padding-m " + (props.isSelected ? "btn-tab-selected " : "") + props.className}
        />
    );
});

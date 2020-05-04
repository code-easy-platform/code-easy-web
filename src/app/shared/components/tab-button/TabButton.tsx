import React, { CSSProperties } from 'react';

import './TabButton.css';
import { Link } from 'react-router-dom';

export const TabGroup = (props: any) => <div className={"tab-group full-width " + props.className}>{props.children}</div>;


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
export const TabButton = (props: ITabButtonProps) => {
    return (
        !props.to
            ? <div
                tabIndex={0}
                key={props.id}
                title={props.title}
                style={props.style}
                onClick={props.onClick}
                onFocus={props.onFocus}
                children={props.content}
                className={"btn-tab outline-none padding-m " + (props.isSelected ? "btn-tab-selected " : "") + props.className}
            />
            : <Link
                tabIndex={0}
                to={props.to}
                key={props.id}
                title={props.title}
                style={props.style}
                children={<div children={props.content} />}
                className={"btn-tab outline-none padding-m " + (props.isSelected ? "btn-tab-selected " : "") + props.className}
            />
    );
}

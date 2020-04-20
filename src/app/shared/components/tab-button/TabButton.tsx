import React, { CSSProperties } from 'react';

import './TabButton.scss';

interface props {
    id: string;
    title?: string;
    onClick?: any;
    content?: any;
    style?: CSSProperties;
    className?: String;
    isSelected?: boolean;
}

export const TabGroup = (props: any) => <div className="tab-group full-width">{props.children}</div>;

export const TabButton = (props: props) => {
    return (
        <div
            // tabIndex={0}
            key={props.id}
            title={props.title}
            style={props.style}
            onClick={props.onClick}
            children={props.content}
            className={"btn-tab " + (props.isSelected ? "btn-tab-selected " : "") + props.className}
        />
    );
}

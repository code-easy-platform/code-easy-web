import React, { CSSProperties } from 'react';

import './TabButton.scss';

interface props {
    title?: string;
    onClick?: any;
    content?: any;
    style?: CSSProperties;
    className?: String;
    isSelected?: boolean;
}

export const TabGroup = (props: any) => <div className="tab-group">{props.children}</div>;

export const TabButton = (props: props) => {
    return (
        <div
            onClick={props.onClick}
            className={"btn-tab " + (props.isSelected ? "btn-tab-selected " : "") + props.className}
            title={props.title}
            style={props.style}
        >{props.content}</div>
    );
}

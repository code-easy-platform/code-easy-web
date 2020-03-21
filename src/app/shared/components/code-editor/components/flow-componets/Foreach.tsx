import React from 'react';

import icons_foreach from './../../shared/images/foreach.png';

export const Foreach = (props: any) => {

    const strokeColor: string = props.isSelecionado ? "#999fff" : "#219653";

    return (
        <>
            <rect
                key={"Foreach" + props.id}
                strokeLinejoin="round"
                height={props.height}
                stroke={strokeColor}
                width={props.width}
                strokeWidth="2"
                fill="#1e1e1e"
                x={props.left}
                y={props.top}
                id={props.id}
                rx="25"
            />
            <image
                key={"ForeachImage_" + props.id}
                xlinkHref={icons_foreach}
                height={props.height - 10}
                width={props.width - 10}
                x={props.left + 6.5}
                y={props.top + 5}
                id={props.id}
            />
        </>
    );
}
/*
<rect x={left} y={(top || 0) - 5} width={width} height={height} fill={icons_foreach} /> */
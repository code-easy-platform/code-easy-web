import React from 'react';

export const FlowComponent = ({ id, isSelected, width, height, left, top, childImage, name }: any) => {

    const strokeColor: string = isSelected ? "#999fff" : "#21965300";

    return (
        <>
            <rect
                strokeLinejoin="round"
                stroke={strokeColor}
                key={name + id}
                height={height}
                strokeWidth="1"
                fill="#1e1e1e"
                width={width}
                x={left}
                y={top}
                id={id}
            />
            <image
                key={name + "Image_" + id}
                xlinkHref={childImage}
                height={height}
                width={width}
                x={left}
                y={top}
                id={id}
            />
        </>
    );
}
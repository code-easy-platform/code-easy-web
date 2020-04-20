import React from 'react';

export const FlowComponent = ({ id, isSelected, width, height, left, top, childImage, name }: any) => {

    const strokeColor: string = isSelected ? "#999fff" : "#21965300";

    return (
        <>
            <rect
                fill="var(--main-background)"
                strokeLinejoin="round"
                stroke={strokeColor}
                key={name + id}
                height={height}
                strokeWidth="1"
                width={width}
                x={left}
                y={top}
                id={id}
            />
            <image
                style={{ pointerEvents: 'none' }}
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
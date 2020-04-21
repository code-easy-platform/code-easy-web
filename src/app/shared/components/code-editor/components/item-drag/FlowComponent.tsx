import React from 'react';

export const FlowComponent = ({ id, isSelected, width, height, left, top, childImage, name, hasError = false }: any) => {

    const strokeColor: string = isSelected ? "#999fff" : hasError ? "var(--main-error-color)" :  "#21965300";

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
                stroke={strokeColor}
            />
        </>
    );
}
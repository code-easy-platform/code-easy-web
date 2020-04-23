import React from 'react';

export const FlowComponent = ({ id, isSelected, width, height, left, top, childImage, name, hasError = false }: any) => {

    const strokeColor: string = isSelected ? "var(--color-botton-bar)" : hasError ? "var(--main-error-color)" :  "var(--main-background)";

    return (
        <>
            <rect
                fill="var(--main-background)"
                strokeLinejoin="round"
                stroke={strokeColor}
                key={name + id}
                height={height}
                strokeWidth="var(--main-border-width)"
                width={width}
                x={left}
                y={top}
                id={id}
            />
            <image
                style={{ pointerEvents: 'none' }}
                key={name + "Image_" + id}
                xlinkHref={childImage}
                stroke={strokeColor}
                height={height}
                width={width}
                x={left}
                y={top}
                id={id}
            />
        </>
    );
}
import React from 'react';

interface FlowComponentProps {
    isSelected: boolean;
    hasError?: boolean;
    height: number;
    width: number;
    left: number;
    name: string;
    top: number;
    id: string;
    icon: any;
    ref?: any;
}
export const FlowComponent: React.FC<FlowComponentProps> = ({ id, isSelected, width, height, left, top, icon, name, hasError = false, ref }) => {

    const strokeColor: string = isSelected ? "var(--color-botton-bar)" : hasError ? "var(--main-error-color)" : "var(--main-background)";

    return (
        <>
            <rect
                strokeWidth="var(--main-border-width)"
                fill="var(--main-background)"
                strokeLinejoin="round"
                stroke={strokeColor}
                key={name + id}
                height={height}
                width={width}
                ref={ref}
                x={left}
                y={top}
                id={id}
            />
            <image
                style={{ pointerEvents: 'none' }}
                key={name + "Image_" + id}
                stroke={strokeColor}
                xlinkHref={icon}
                height={height}
                width={width}
                x={left}
                y={top}
                id={id}
            />
        </>
    );
}

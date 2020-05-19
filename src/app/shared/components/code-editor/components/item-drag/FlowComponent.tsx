import React from 'react';

interface FlowComponentProps {
    isSelected: boolean;
    hasError?: boolean;
    height: number;
    name?: string;
    width: number;
    left: number;
    top: number;
    id: string;
    icon: any;
    ref?: any;
}
export const FlowComponent: React.FC<FlowComponentProps> = ({ id, isSelected, width, height, left, top, icon, hasError = false, ref }) => {

    const strokeColor: string = isSelected ? "var(--color-botton-bar)" : hasError ? "var(--main-error-color)" : "var(--main-background)";

    return (
        <>
            <rect
                strokeWidth="var(--main-border-width)"
                style={{ cursor: 'move', zIndex: 2 }}
                fill="var(--main-background)"
                strokeLinejoin="round"
                stroke={strokeColor}
                height={height}
                width={width}
                ref={ref}
                x={left}
                y={top}
                id={id}
            />
            <image
                style={{ pointerEvents: 'none' }}
                stroke={strokeColor}
                xlinkHref={icon}
                height={height}
                width={width}
                x={left}
                y={top}
            />
        </>
    );
}

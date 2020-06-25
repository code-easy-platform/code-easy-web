import React from 'react';

interface FlowComponentProps {
    isDisabled?: boolean;
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
export const FlowComponent: React.FC<FlowComponentProps> = ({ id, isSelected, isDisabled, width, height, left, top, icon, hasError = false, ref }) => {

    const strokeColor: string = isSelected ? "var(--color-botton-bar)" : hasError ? "var(--main-error-color)" : "transparent";

    return (
        <>
            <rect
                strokeWidth="var(--main-border-width)"
                style={{ pointerEvents: 'none' }}
                strokeLinejoin="round"
                stroke={strokeColor}
                fill="transparent"
                height={height}
                width={width}
                ref={ref}
                x={left}
                y={top}
                id={id}
            />
            <rect
                style={{ cursor: 'move', zIndex: 2 }}
                strokeWidth="var(--main-border-width)"
                fill="var(--main-background)"
                strokeLinejoin="round"
                height={height}
                width={width}
                x={left}
                rx={50}
                ry={50}
                y={top}
                id={id}
            />
            <image
                style={{ pointerEvents: 'none', filter: 'gray' }}
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

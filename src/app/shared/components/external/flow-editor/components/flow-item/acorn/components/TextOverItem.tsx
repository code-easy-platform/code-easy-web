import React, { memo } from 'react';
import { IObservable, useObserverValue } from 'react-observing';

interface TextOverItemProps {
    onMouseDown?(event: React.MouseEvent<SVGTextElement, MouseEvent>): void;
    label: IObservable<string | undefined>;
    textColor?: string;
    left: number;
    top: number;
}
export const TextOverItem: React.FC<TextOverItemProps> = memo(({ left, top, textColor, onMouseDown, ...props }) => {
    const label = useObserverValue(props.label);

    return (
        <text // Move element and display their title
            onMouseDown={onMouseDown}
            textAnchor={"middle"}
            fontSize={"small"}
            fill={textColor}
            y={top - 5}
            x={left}
        >{label}</text>
    );
});

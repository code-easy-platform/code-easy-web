import React, { useCallback, useEffect, useRef } from 'react';
import { IObservable, useObserver, useObserverValue } from 'react-observing';

import { useSizeByText } from '../../../../shared/hooks';

interface TextOverItemProps {
    onMouseDown?(event: React.MouseEvent<SVGTextElement, MouseEvent>): void;
    isEditableOnDoubleClick: IObservable<boolean | undefined>;
    isEditing: IObservable<boolean | undefined>;
    label: IObservable<string | undefined>;
    textColor?: string;
    left: number;
    top: number;
}
export const TextOverItem: React.FC<TextOverItemProps> = ({ left, top, textColor, onMouseDown, ...props }) => {
    const isEditableOnDoubleClick = useObserverValue(props.isEditableOnDoubleClick);
    const [isEditing, setIsEditing] = useObserver(props.isEditing);
    const [label, setLabel] = useObserver(props.label);
    const getSizeByText = useSizeByText();

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (inputRef.current && isEditing) {
            inputRef.current.select();
            inputRef.current.focus();
        }
    }, [isEditing]);

    const sizes = getSizeByText(label || '');
    const width = (sizes.width > 90 ? 90 : sizes.width) + 20;
    const height = (sizes.height || 10) + 10;

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            inputRef.current?.blur();
            setIsEditing(false);
        } else if (e.key === 'Escape') {
            inputRef.current?.blur();
            setIsEditing(false);
        }
        e.stopPropagation();
    }, [setIsEditing]);

    if (!isEditing) {
        return (
            <text // Move element and display their title
                onDoubleClick={isEditableOnDoubleClick ? () => setIsEditing(true) : undefined}
                onMouseDown={onMouseDown}
                textAnchor={"middle"}
                fontSize={"small"}
                fill={textColor}
                y={top - 5}
                x={left}
            >{label}</text>
        );
    }

    return (
        <foreignObject
            width={width}
            height={height}
            y={top - height}
            x={left - (width / 2)}
            style={{ zIndex: 10, maxWidth: 100 }}
        >
            <input
                value={label}
                ref={inputRef}
                onKeyDown={handleKeyDown}
                onBlur={() => setIsEditing(false)}
                onChange={e => setLabel(e.target.value)}
                style={{
                    width: '100%',
                    maxWidth: 100,
                    height: '100%',
                    padding: 'unset',
                    fontSize: 'smaller',
                    textAlign: 'center',
                }}
            />
        </foreignObject>
    );
};

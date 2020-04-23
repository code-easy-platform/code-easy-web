import React, { useState, useRef } from 'react';

export const FlowComment = ({ id, isSelected, width, height, left, top, name }: any) => {

    const strokeColor: string = isSelected ? "var(--color-botton-bar)" : "#219653";

    const [isEditing, setIsEditing] = useState(false);
    const textAreaRef: any = useRef(null);

    return (
        <>
            <foreignObject
                onDoubleClick={() => {
                    setIsEditing(true);
                    if (textAreaRef.current)
                        textAreaRef.current.focus()
                }}
                style={{ pointerEvents: !isEditing ? undefined : 'none' }}
                key={name + id}
                height={height}
                width={width}
                x={left}
                y={top}
                id={id}
            >
                <textarea
                    ref={textAreaRef}
                    onBlur={() => setIsEditing(false)}
                    style={{
                        backgroundColor: 'var(--main-background-highlighted)',
                        pointerEvents: isEditing ? undefined : 'none',
                        border: `var(--main-border-width) solid ${strokeColor}`,
                        height: '-webkit-fill-available',
                        width: '-webkit-fill-available',
                        color: '#fff',
                        padding: 5,
                    }} />
            </foreignObject>
        </>
    );
}
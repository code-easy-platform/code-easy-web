import React, { useState, useRef } from 'react';

export const FlowComment = ({ id, isSelected, width, height, left, top, name, onNameChange = (text: string) => { } }: any) => {

    const strokeColor: string = isSelected ? "var(--color-botton-bar)" : "#219653";

    const [isEditing, setIsEditing] = useState(false);
    const [comment, setComment] = useState(name);
    const textAreaRef: any = useRef(null);

    return (
        <>
            <foreignObject
                id={id}
                y={top}
                x={left}
                width={width}
                height={height}
                key={name + id}
                style={{ pointerEvents: !isEditing ? undefined : 'none', resize: 'both' }}
                onDoubleClick={() => {
                    setIsEditing(true);
                    if (textAreaRef.current) {
                        textAreaRef.current.focus();
                    }
                }}
            >
                <textarea
                    value={comment}
                    ref={textAreaRef}
                    onChange={e => setComment(e.target.value)}
                    onBlur={(e) => { setIsEditing(false); onNameChange(comment); }}
                    style={{
                        backgroundColor: 'var(--main-background-highlighted)',
                        pointerEvents: isEditing ? undefined : 'none',
                        border: `var(--main-border-width) solid ${strokeColor}`,
                        height: '-webkit-fill-available',
                        width: '-webkit-fill-available',
                        color: '#fff',
                        padding: 5,
                    }}
                />
            </foreignObject>
        </>
    );
}

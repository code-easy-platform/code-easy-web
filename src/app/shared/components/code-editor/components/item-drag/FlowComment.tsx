import React, { useState, useRef } from 'react';

export const FlowComment = ({ id, isSelected, width, height, left, top, name, onNameChange = (text: string) => { } }: any) => {

    const strokeColor: string = isSelected ? "var(--color-botton-bar)" : "#219653";

    const [isEditing, setIsEditing] = useState(false);
    const [comment, setComment] = useState(`${name}`);
    const textAreaRef: any = useRef(null);

    const getSizeByText = (text: string) => {

        let span = document.createElement("span");
        document.body.appendChild(span);

        span.style.position = 'absolute';
        span.style.height = 'auto';
        span.style.width = 'auto';
        span.innerText = text;

        const formattedWidth = Math.ceil(span.clientWidth);
        const formattedHeight = Math.ceil(span.clientHeight);

        document.body.removeChild(span);

        return {
            width: formattedWidth,
            height: formattedHeight,
        };
    }

    // Pega o tamanho do width e height pelo exto que está no sendo renderizado.
    const sizes = getSizeByText(comment);

    return (
        <foreignObject
            id={id}
            y={top}
            x={left}
            width={sizes.width < 100 ? 100 : sizes.width}
            height={sizes.height < 70 ? 70 : sizes.height}
            style={{ pointerEvents: !isEditing ? undefined : 'none', resize: 'both', cursor: 'move', zIndex: 2 }}
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
                onKeyDown={e => {}}
                onChange={e => setComment(e.target.value)}
                onBlur={(e) => { setIsEditing(false); onNameChange(comment); }}
                style={{
                    backgroundColor: 'var(--main-background-highlighted)',
                    pointerEvents: isEditing ? undefined : 'none',
                    border: `var(--main-border-width) solid ${strokeColor}`,
                    height: '-webkit-fill-available',
                    width: '-webkit-fill-available',
                    padding: 'var(--padding-m)',
                    color: '#fff',
                }}
            />
        </foreignObject>
    );
}

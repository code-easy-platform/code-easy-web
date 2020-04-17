import React from 'react';

export const FlowComment = ({ id, isSelected, width, height, left, top, childImage, name }: any) => {

    const strokeColor: string = isSelected ? "#999fff" : "#219653";

    return (
        <>
            <foreignObject
                key={name + id}
                height={height}
                width={width}
                x={left}
                y={top}
                id={id}
            >
                <textarea style={{
                    border: `2px solid ${strokeColor}`,
                    height: '-webkit-fill-available',
                    width: '-webkit-fill-available',
                    backgroundColor: '#333333',
                    color: '#fff',
                    padding: 5,
                }} />
            </foreignObject>
        </>
    );
}
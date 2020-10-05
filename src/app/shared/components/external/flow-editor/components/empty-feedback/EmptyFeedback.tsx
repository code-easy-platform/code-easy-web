import React from 'react';

export const EmptyFeedback: React.FC<{ show: boolean }> = ({ show, children }) => {
    if (!show) return null;
    return (
        <foreignObject width={"100%"} height={"100%"}>
            {children}
        </foreignObject>
    );
}

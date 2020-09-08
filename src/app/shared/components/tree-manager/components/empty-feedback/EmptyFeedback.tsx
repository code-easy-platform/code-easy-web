import React from 'react';

interface EmptyFeedbackProps {
    show: boolean;
    onContextMenu?(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
}
export const EmptyFeedback: React.FC<EmptyFeedbackProps> = ({ show, children, onContextMenu }) => {
    if (!show) return null;
    return (
        <div onContextMenu={onContextMenu} style={{ flex: 1 }}>
            {
                children ||
                <p style={{ textAlign: 'center', flex: 1, alignSelf: 'center' }}>Right click here to add features</p>
            }
        </div>
    );
}

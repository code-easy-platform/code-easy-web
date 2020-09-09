import React from 'react';
import { useDragLayer, XYCoord } from 'react-dnd';

export const CustomDragLayer: React.FC = ({ children }) => {

    const { isDragging, clientOffset } = useDragLayer((monitor, ) => ({
        isDragging: monitor.isDragging(),
        clientOffset: monitor.getClientOffset(),
    }));

    if (!isDragging) return null;

    const getItemStyles = (currentOffset: XYCoord | null) => {
        if (!currentOffset) return { display: 'none' };
        return {
            padding: 2,
            opacity: 0.5,
            paddingLeft: 8,
            paddingRight: 8,
            borderRadius: 50,
            alignItems: 'center',
            height: 'min-content',
            backgroundColor: 'black',
            transform: `translate(${currentOffset.x + 12}px, ${currentOffset.y + 12}px)`,
            WebkitTransform: `translate(${currentOffset.x + 12}px, ${currentOffset.y + 12}px)`,
        };
    };

    return (
        <div style={{ pointerEvents: 'none', position: 'fixed', zIndex: 10000, left: 0, top: 0 }}>
            <div style={getItemStyles(clientOffset)}>
                {children}
            </div>
        </div>
    );
}

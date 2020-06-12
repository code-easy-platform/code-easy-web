import React from 'react'
import { XYCoord, useDragLayer } from 'react-dnd';

export const CustomDragLayer: React.FC = ({ children }) => {

    const { isDragging, initialOffset, currentOffset } = useDragLayer((monitor) => ({
        item: monitor.getItem(),
        itemType: monitor.getItemType(),
        isDragging: monitor.isDragging(),
        currentOffset: monitor.getSourceClientOffset(),
        initialOffset: monitor.getInitialSourceClientOffset(),
    }));

    if (!isDragging) return null;

    const getItemStyles = (initialOffset: XYCoord | null, currentOffset: XYCoord | null) => {
        if (!initialOffset || !currentOffset) return { display: 'none' };
        return {
            padding: 2,
            paddingLeft: 8,
            paddingRight: 8,
            borderRadius: 50,
            alignItems: 'center',            
            height: 'min-content',
            backgroundColor: 'var(--color-primary)',
            transform: `translate(${currentOffset.x}px, ${currentOffset.y}px)`,
            WebkitTransform: `translate(${currentOffset.x}px, ${currentOffset.y}px)`,
        };
    };

    return (
        <div style={{ pointerEvents: 'none', position: 'fixed', height: '100%', zIndex: 10000, width: '100%', left: 0, top: 0 }}>
            <div style={getItemStyles(initialOffset, currentOffset)}>
                {children}
            </div>
        </div>
    );
}

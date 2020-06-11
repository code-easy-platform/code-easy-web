import React from 'react'
import { XYCoord, useDragLayer } from 'react-dnd';

import { IconFlowComment, IconFlowForeach, IconFlowSwitch, IconFlowAssign, IconFlowAction, IconFlowStart, IconFlowEnd, IconFlowIf } from 'code-easy-components';
import { ItemType } from '../../models/ItemFluxo';


export const CustomDragLayer: React.FC = () => {
    const { item, itemType, isDragging, initialOffset, currentOffset } = useDragLayer((monitor) => ({
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
            transform: `translate(${currentOffset.x}px, ${currentOffset.y}px)`,
            WebkitTransform: `translate(${currentOffset.x}px, ${currentOffset.y}px)`
        };
    };

    const getIcon = (type: ItemType) => {
        switch (type) {
            case ItemType.COMMENT:
                return IconFlowComment;
            case ItemType.FOREACH:
                return IconFlowForeach;
            case ItemType.SWITCH:
                return IconFlowSwitch;
            case ItemType.ASSIGN:
                return IconFlowAssign;
            case ItemType.ACTION:
                return IconFlowAction;
            case ItemType.START:
                return IconFlowStart;
            case ItemType.END:
                return IconFlowEnd;
            case ItemType.IF:
                return IconFlowIf;
            default:
                return;
        }
    };

    return (
        <div style={{ pointerEvents: 'none', position: 'fixed', height: '100%', zIndex: 10000, width: '100%', left: 0, top: 0, transition: '2s' }}>
            <div style={getItemStyles(initialOffset, currentOffset)}>
                <img src={getIcon(itemType as any)} style={{ width: 30, height: 30, marginRight: 10 }} className="toolbar-item" alt="" />
                <div style={{ display: 'inline-block' }}>{item.itemProps.title}</div>
            </div>
        </div>
    );
}

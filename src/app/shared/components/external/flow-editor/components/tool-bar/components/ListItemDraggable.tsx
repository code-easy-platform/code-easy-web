import React, { memo } from 'react';
import { useDrag } from 'react-dnd';

import { EFlowItemType } from '../../../shared/enums';
import { IDroppableItem } from '../../../shared/interfaces';

interface ListItemProps {
    icon?: any;
    label?: string;
    width?: number;
    itemType?: string;
    flowItemType: EFlowItemType;
}
const ListItemDraggable: React.FC<ListItemProps> = ({ flowItemType, itemType, label, icon, width = 30 }) => {

    /** Permite que uym elemento seja arrastado e adicionado dentro do editor de fluxo. */
    const [, dragRef] = useDrag<IDroppableItem, any, any>({
        item: { type: itemType || 'undefined', itemProps: { id: undefined, label, itemType, flowItemType, icon, width: 40, height: 40 } },
        collect: monitor => ({ isDragging: monitor.isDragging() }),
    });

    return (
        <img
            className={"toolbar-item"}
            title={label || itemType}
            ref={dragRef}
            alt={label}
            src={icon}
            style={{
                justifyContent: "center",
                alignItems: "center",
                cursor: "move",
                fontSize: 10,
                margin: 5,
                width,
            }}
        />
    );
}

export default memo(ListItemDraggable);

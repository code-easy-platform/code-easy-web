import React, { memo } from 'react';

import ListItemDraggable from './components/ListItemDraggable';
import { IFlowItem } from '../../shared/interfaces';
import './Toolbar.css';

interface ToolbarProps {
    backgroundColor?: string;
    borderColor?: string;
    items: IFlowItem[];
    itemWidth?: number;
    isShow: boolean;
}
const Toolbar: React.FC<ToolbarProps> = ({ items, isShow, itemWidth, backgroundColor, borderColor }) => {
    return (
        (items.length > 0) && isShow
            ? <div className="toolbar" style={{ backgroundColor, borderColor }}>
                {items.map((item: IFlowItem, index) => {
                    return <ListItemDraggable
                        flowItemType={item.flowItemType}
                        itemType={item.itemType}
                        label={item.label}
                        width={itemWidth}
                        icon={item.icon}
                        key={index}
                    />;
                })}
            </div>
            : null
    );
};

export default memo(Toolbar);

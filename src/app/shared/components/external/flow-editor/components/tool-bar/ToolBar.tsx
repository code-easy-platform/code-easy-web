import React from 'react';

import ListItemDraggable from './components/ListItemDraggable';
import { IFlowItem } from '../../shared/interfaces';
import './Toolbar.css';

interface ToolbarProps {
    backgroundColor?: string;
    borderColor?: string;
    items: IFlowItem[];
    itemWidth?: number;
    onFocus?(): void;
    isShow: boolean;
}
export const Toolbar: React.FC<ToolbarProps> = ({ items, isShow, itemWidth, backgroundColor, borderColor, onFocus }) => {
    return (
        (items.length > 0) && isShow
            ? <div className="toolbar" onFocus={onFocus} style={{ backgroundColor, borderColor }}>
                {items.map((item: IFlowItem, index) => {
                    return <ListItemDraggable
                        flowItemType={item.flowItemType.value}
                        itemType={item.itemType?.value}
                        label={item.label?.value}
                        icon={item.icon?.value}
                        width={itemWidth}
                        key={index}
                    />;
                })}
            </div>
            : null
    );
};

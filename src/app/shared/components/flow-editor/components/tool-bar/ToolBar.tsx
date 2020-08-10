import React, { memo } from 'react';

import ListItemDraggable from './components/ListItemDraggable';
import { IFlowItem } from '../../shared/interfaces';
import './Toolbar.css';

interface ToolbarProps {
    itemsLogica: IFlowItem[];
    backgroundColor?: string;
    borderColor?: string;
    itemWidth?: number;
    isShow: boolean;
}
const Toolbar: React.FC<ToolbarProps> = ({ itemsLogica, isShow, itemWidth, backgroundColor, borderColor }) => {
    return (
        isShow
            ? <div className="toolbar" style={{ backgroundColor, borderColor }}>
                {itemsLogica.map((item: IFlowItem, index) => {
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

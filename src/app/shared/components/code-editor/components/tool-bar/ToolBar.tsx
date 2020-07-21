import React, { memo } from 'react';

import { IFlowItem } from '../../shared/Interfaces';
import { ItemToDrag } from '../item-drag/ItemDrag';
import { FlowItem } from '../../models/FlowItem';
import './Toolbar.css';

export const Toolbar: React.FC<{ itemsLogica: FlowItem[], isShow: boolean }> = memo(({ itemsLogica, isShow }) => {
    return (
        isShow
            ? <div className="mini-scroll-bar toolbar">
                {itemsLogica.map((item: IFlowItem) => {
                    return <ItemToDrag
                        isSelected={item.isSelected}
                        itemType={item.itemType}
                        title={item.name}
                        allowDrag={true}
                        key={item.id}
                        id={item.id}
                    />;
                })}
            </div>
            : <></>
    );
});

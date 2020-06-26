import React from 'react';

import { IFlowItem } from '../../shared/Interfaces';
import { ItemToDrag } from '../item-drag/ItemDrag';
import { FlowItem } from '../../models/ItemFluxo';
import './Toolbar.css';

export const Toolbar = ({ itemsLogica, isShow }: { itemsLogica: FlowItem[], isShow: boolean }) => {

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

}

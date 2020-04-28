import React from 'react';

import { ItemFluxo, FlowItem } from '../../models/ItemFluxo';
import { ItemToDrag } from '../item-drag/ItemDrag';
import './Toolbar.css';

export const Toolbar = ({ itensLogica, isShow }: { itensLogica: FlowItem[], isShow: boolean }) => {

    return (
        isShow
            ? <div className="mini-scroll-bar toolbar">
                {itensLogica.map((item: ItemFluxo) => {
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
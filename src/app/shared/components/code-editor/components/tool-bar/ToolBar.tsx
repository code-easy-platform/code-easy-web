import React from 'react';

import { ItemFluxo, FlowItem } from '../../models/ItemFluxo';
import { ItemToDrag } from '../item-drag/ItemDrag';
import './Toolbar.scss';

export const Toolbar = ({ itensLogica, isShow }: { itensLogica: FlowItem[], isShow: boolean }) => {

    return (
        isShow
            ? <div className="mini-scroll-bar toolbar">
                {itensLogica.map((item: ItemFluxo) => {
                    return <ItemToDrag
                        isSelecionado={item.isSelecionado}
                        itemType={item.itemType}
                        title={item.nome}
                        allowDrag={true}
                        key={item.id}
                        id={item.id}
                        style={{}}
                    />;
                })}
            </div>
            : <></>
    );

}
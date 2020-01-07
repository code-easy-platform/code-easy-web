import React from 'react';

import { ItemFluxo } from '../../models/ItemFluxo';
import { ItemToDrag } from '../item-drag/ItemDrag';
import './Toolbar.scss';

export const Toolbar = (props: any) => {
    const itensLogica = props.itensLogica;

    return (
        <div className="mini-scroll-bar toolbar">
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
    );
}
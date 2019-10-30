import React from 'react';
import { ListComponent } from '../../../../../../shared/interfaces/Aplication';

import "./Tree.scss";

export const Tree = (props: any) => {
    let listComponent: ListComponent = props.listComponent;

    const onClick = () => {
        alert();
    }

    return (
        <div className="item-body">
            <div className="item-list-pai" onClick={onClick}>
                {listComponent.itemConfig.name}
            </div>
            {
                listComponent.listComponent.length !== 0 && listComponent.isExpanded === true
                    ? <div className="item-list-filho">
                        <Tree listComponent={listComponent} />
                    </div>
                    : undefined
            }
        </div>
    );
}

export default Tree;

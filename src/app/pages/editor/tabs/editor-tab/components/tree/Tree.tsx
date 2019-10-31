import React from 'react';
import { Component } from '../../../../../../shared/interfaces/Aplication';

import "./Tree.scss";

export const Tree = (props: any) => {
    const allComponents: Component[] = props.allComponents;
    let component: Component = props.component;

    const thisComponenaveCild: boolean = ((allComponents.find((comp: Component) => { return comp.key === component.key })) !== undefined);

    const onClick = () => {
        alert();
    }

    return (
        <div className="item-body">
            <div className="item-list-pai" onClick={onClick}>
                {component.configs.name}
            </div>
            {
                thisComponenaveCild && component.configs.isExpanded === true
                    ? <div className="item-list-pai" onClick={onClick}>
                        <div className="item-list-filho">
                            <Tree allComponents={allComponents} component={component} />
                        </div>
                    </div>
                    : undefined
            }
        </div>
    );
}

export default Tree;

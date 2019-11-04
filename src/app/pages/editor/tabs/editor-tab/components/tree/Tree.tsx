import React, { useContext } from 'react';

import { Component, Tab } from '../../../../../../shared/interfaces/Aplication';
import { CodeEditorContext } from '../../../../../../shared/services/contexts/code-editor-context/CodeEditorContext';
import "./Tree.scss";


export const Tree = (props: any) => {
    const codeEditorContext = useContext(CodeEditorContext);
    const tabIndex: number = codeEditorContext.project.tabs.findIndex((tab: Tab) => { return tab.configs.isEditando === true ? tab : undefined });
    const allComponents: Component[] = props.allComponents;
    let component: Component = props.component;

    const thisComponentHaveChild: boolean = ((allComponents.find((comp: Component) => { return comp.paiId === component.id })) !== undefined);
    const thisComponentChilds: Component[] = (allComponents.filter((comp: Component) => { return comp.paiId === component.id }));

    const onClick = () => {
        component.configs.isExpanded = !component.configs.isExpanded;
        codeEditorContext.changeComponentState(component.id, tabIndex, component);
    }

    const onDubleClick = () => {
        component.configs.isEditando = true;
        codeEditorContext.changeComponentState(component.id, tabIndex, component);
        alert(component.configs.name);
    }

    return (
        <div className="item-body">
            <div className="item-list-pai" onClick={onClick} onDoubleClick={onDubleClick}>
                {component.configs.name}
            </div>
            {thisComponentHaveChild && component.configs.isExpanded === true
                ? thisComponentChilds.map((comp: Component) => {
                    return (
                        <div className="item-list-filho">
                            <Tree allComponents={allComponents} component={comp} />
                        </div>
                    );
                })
                : undefined
            }
        </div>
    );
}

export default Tree;

import React, { useContext } from 'react';

import { Component } from '../../../../../../shared/interfaces/Aplication';
import { CodeEditorContext } from '../../../../../../shared/services/contexts/code-editor-context/CodeEditorContext';
import ComponentType from '../../../../../../shared/enuns/ComponentType';
import "./Tree.scss";
import { Icon } from '../../../../../../shared/components/icon/icon';


export const Tree = (props: any) => {
    const codeEditorContext = useContext(CodeEditorContext); // Pega o contexto do code editor.
    const tabIndex: number = codeEditorContext.getIndexCurrentTabSelected(); // Pega o index da aba atual.
    const allComponents: Component[] = codeEditorContext.getComponents({ typeComponent: [ComponentType.localVariable] });

    let component: Component = props.component;

    const thisComponentHaveChild: boolean = ((allComponents.find((comp: Component) => { return comp.paiId === component.id })) !== undefined);
    const thisComponentChilds: Component[] = (allComponents.filter((comp: Component) => { return comp.paiId === component.id }));

    const onClick = () => {
        component.configs.isExpanded = !component.configs.isExpanded;
        codeEditorContext.changeComponentState(component.id, tabIndex, component);
    }

    const onDubleClick = () => {

        // Troca a edição de qualquer outro component que esteja sendo editado.
        let oldEditingComponents: Component[] = allComponents.filter((comp: Component) => { return comp.configs.isEditando === true });
        oldEditingComponents.map((oldComponent: Component) => {
            oldComponent.configs.isEditando = false;
            codeEditorContext.changeComponentState(oldComponent.id, tabIndex, oldComponent);
        });

        component.configs.isEditando = true;
        codeEditorContext.changeComponentState(component.id, tabIndex, component);
        alert(component.configs.name);
    }

    return (
        <div className="item-body">
            <div className="item-list-pai" onDoubleClick={onDubleClick}>
                {(thisComponentHaveChild && component.configs.isExpanded === false) && <Icon iconName="btn-expand-folder" onClick={onClick} />}
                {(thisComponentHaveChild && component.configs.isExpanded === true) && <Icon iconName="btn-collapse-folder" onClick={onClick} />}
                {thisComponentHaveChild === false && <Icon />}
                {component.configs.name}
            </div>
            {thisComponentHaveChild && component.configs.isExpanded === true
                ? thisComponentChilds.map((comp: Component) => {
                    return (
                        <div className="item-list-filho">
                            <Tree component={comp} />
                        </div>
                    );
                })
                : undefined
            }
        </div>
    );
}

export default Tree;

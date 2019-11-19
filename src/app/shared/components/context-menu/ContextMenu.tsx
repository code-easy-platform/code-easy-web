import React, { useContext } from 'react';

import { CodeEditorContext } from '../../services/contexts/CodeEditorContext';
import ComponentType from '../../enuns/ComponentType';
import './ContextMenu.scss';


export const ContextMenu = (props: any) => {
    const codeEditorContext = useContext(CodeEditorContext);
    const isVisible: boolean = props.isVisible;
    const itemType: ComponentType = props.itemType;
    const itemId: number = props.itemId;

    const style: any = { display: isVisible ? "block" : "none" }
    const addComponent = (type: ComponentType, compName: string) => codeEditorContext.addComponent(itemId, compName, type);
    const removeComponent = () => codeEditorContext.removeComponentById(itemId);

    const actions = [
        {
            name: "Nova variável local",
            onClick: () => addComponent(ComponentType.localVariable, "Var1"),
            filter: [ComponentType.localAction, ComponentType.globalAction, ComponentType.rota]
        },
        {
            name: "Nova action local",
            onClick: () => addComponent(ComponentType.localAction, "Action1"),
            filter: [ComponentType.localAction, ComponentType.globalAction, ComponentType.rota, ComponentType.pasta]
        },
        {
            name: "Nova pasta",
            onClick: () => addComponent(ComponentType.pasta, "Pasta1"),
            filter: [ComponentType.localAction, ComponentType.globalAction, ComponentType.rota, ComponentType.pasta]
        },
        {
            name: "Excluir",
            onClick: removeComponent,
            filter: [
                ComponentType.rota,
                ComponentType.pasta,
                ComponentType.flowItem,
                ComponentType.localAction,
                ComponentType.globalAction,
                ComponentType.localVariable,
                ComponentType.inputVariable,
                ComponentType.outputVariable,
            ]
        },
    ];

    return (
        <div style={style} className="menu-context">
            {actions.map((action) => {
                if (action.filter.find((typeitem: ComponentType) => typeitem === itemType))
                    return <div key={action.name} className="item-list-pai" onClick={action.onClick}>{action.name}</div>;
                return;
            })}
        </div>
    );
}

import React, { useContext } from 'react';

import { CodeEditorContext } from '../../services/contexts/CodeEditorContext';
import './ContextMenu.scss';
import { Utils } from '../../services/Utils';
import { ComponentConfigs, Component } from '../../interfaces/Aplication';
import ComponentType from '../../enuns/ComponentType';
import FluxoComponentTypes from '../../../pages/editor/tabs/editor-tab/components/code-editor/enuns/FluxoList';


export const ContextMenu = (props: any) => {
    const codeEditorContext = useContext(CodeEditorContext);
    const isVisible: boolean = props.isVisible;
    const itemType: ComponentType = props.itemType;
    const itemId: number = props.itemId;

    const style: any = {
        display: isVisible ? "block" : "none",

    }

    const AddComponent = () => {
        codeEditorContext.addComponent(itemId, "NovaVariavelLocal", ComponentType.localVariable);
    }

    return (
        <div style={style} className="menu-context">
            <div className="item-list-pai" onClick={AddComponent}>Nova variavel local</div>
        </div>
    );
}

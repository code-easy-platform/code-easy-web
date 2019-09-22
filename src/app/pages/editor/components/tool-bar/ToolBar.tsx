import React, { Component } from 'react';
import './ToolBar.scss';

export const ToolBar = (props: any) => {
    return (
        <div className="tool-bar">
            <div className="sistem-tabs">
                <div onClick={() => props.changeCurrentTab('editor')} className="btn-editor btn-open-editor-tab" title="Editor"></div>
                <div onClick={() => props.changeCurrentTab('properties')} className="btn-editor btn-open-properties-tab" title="Propriedades do projeto"></div>
                <div onClick={() => props.changeCurrentTab('plugins')} className="btn-editor btn-open-plugins-tab" title="Adicione e remova dependências do projeto"></div >
            </div >
        </div >
    );
}

export default ToolBar;

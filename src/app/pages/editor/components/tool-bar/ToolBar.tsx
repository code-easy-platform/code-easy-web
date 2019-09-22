import React, { Component } from 'react';
import './ToolBar.scss';

export default class ToolBar extends Component {

    render() {
        return (
            <div className="tool-bar">
                <div className="sistem-tabs">
                    <div /* onClick={this.props.editorContext.changeCurrentTab} */ className="btn-editor btn-open-editor-tab" title="Editor"></div>
                    <div /* onClick={this.props.changeCurrentTab} */ className="btn-editor btn-open-properties-tab" title="Propriedades do projeto"></div>
                    <div /* onClick={this.props.changeCurrentTab} */ className="btn-editor btn-open-plugins-tab" title="Adicione e remova dependências do projeto"></div >
                </div >
            </div >
        );
    }
}

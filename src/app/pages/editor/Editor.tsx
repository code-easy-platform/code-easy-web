import React, { Component } from 'react';
import ToolBar from './components/tool-bar/ToolBar';

import './Editor.scss';

export default class Editor extends Component {

    public changeCurrentTab = () => {
        
    }

    render() {
        return (
            <div className="main-page">
                <ToolBar /* editorContext={this} *//>
            </div>
        );
    }
}

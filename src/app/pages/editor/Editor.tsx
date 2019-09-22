import React, { Component } from 'react';
import ToolBar from './components/tool-bar/ToolBar';

import './Editor.scss';

export default class Editor extends Component {

    private changeCurrentTab = (tab: String) => {
        console.log(tab);
    }

    render() {
        return (
            <div className="main-page">
                <ToolBar changeCurrentTab={this.changeCurrentTab} />
            </div>
        );
    }
}

//#region Imports

import React, { Component } from 'react';
import ComponentsBar from './components/components-bar/ComponentsBar';
import CodeEditor from './components/code-editor/CodeEditor';
import ResourcesTree from './components/resources-tree/ResourcesTree';
import PropertiesEditor from './components/properties-editor/PropertiesEditor';

import './EditorTab.scss';

//#endregion

export default class EditorTab extends Component {

    state = {
        isResizeColLeft: false,
        colLeftX: 0,
        x: 0,
        y: 0,
    }

    mouseMove = (event: any) => {
        if (this.state.isResizeColLeft === true) {
            this.setState({ colLeftX: event.screenX });
        }
        this.setState({
            x: event.screenX,
            y: event.screenY,
        });
    }

    render() {
        return (
            <div className="main-tab-editor" onMouseMove={this.mouseMove.bind(this)} onMouseUp={() => this.setState({isResizeColLeft: false})}>
                <div className='col-left' style={{ width: this.state.colLeftX }}>
                    <ComponentsBar />
                    <div onMouseDown={() => this.setState({isResizeColLeft: true})}>aqui</div>
                </div>
                <div className="col-center">
                    <CodeEditor />
                </div>
                <div className='col-right'>
                    <div className="flex1">
                        <ResourcesTree />
                    </div>
                    <div className="flex1">
                        <PropertiesEditor />
                    </div>
                </div>
            </div>
        );
    }
}

//#region Imports

import React, { Component } from 'react';
import ComponentsBar from './components/components-bar/ComponentsBar';
import CodeEditor from './components/code-editor/CodeEditor';
import ResourcesTree from './components/resources-tree/ResourcesTree';
import PropertiesEditor from './components/properties-editor/PropertiesEditor';

import './EditorTab.scss';
import ResizeColluns, { TypeColluns } from './components/resize-tamplate/ResizeTemplate';

//#endregion

export default class EditorTab extends Component {
    render() {
        return (
            <div id="main-tab-editor" className="main-tab-editor">
                <ResizeColluns type={TypeColluns.colLeft} idFatherComponent="main-tab-editor">
                    <ComponentsBar />
                </ResizeColluns>

                <div className="col-center">
                    <CodeEditor />
                </div>

                <ResizeColluns type={TypeColluns.colRight}>
                    <div className="content">
                        <div className="flex1">
                            <ResourcesTree />
                        </div>
                        <div className="flex1">
                            <PropertiesEditor />
                        </div>
                    </div>
                </ResizeColluns>
            </div>
        );
    }
}

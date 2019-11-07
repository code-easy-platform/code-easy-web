import React, { Component } from 'react';
import ComponentsBar from './components/components-bar/ComponentsBar';
import { CodeEditor } from './components/code-editor/CodeEditor';
import ResourcesTree from './components/resources/Resources';
import PropertiesEditor from './components/properties-editor/PropertiesEditor';

import EditorTabTemplate from './components/resize-tamplate/EditorTabTemplate';
import ColRightTemplate from './components/resize-tamplate/ColRightTemplate';

export default class EditorTab extends Component {
    render() {
        return (
            <EditorTabTemplate
                columnLeft={<ComponentsBar />}
                columnCenter={<CodeEditor />}
                columnRight={
                    <ColRightTemplate
                        rowTop={<ResourcesTree />}
                        rowBottom={<PropertiesEditor />}
                    />
                }
            />
        );
    }
}

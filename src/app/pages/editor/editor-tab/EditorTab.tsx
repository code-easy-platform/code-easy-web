import React, { Component } from 'react';
import { CodeEditor } from './components/code-editor/CodeEditor';
import ResourcesTree from './components/resources/Resources';
import PropertiesEditor from '../../../shared/components/properties-editor/PropertiesEditor';

import EditorTabTemplate from './components/resize-tamplate/EditorTabTemplate';
import ColRightTemplate from './components/resize-tamplate/ColRightTemplate';

export default class EditorTab extends Component {
    render() {
        return (
            <EditorTabTemplate
                // columnLeft={<></>}
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

import React, { Component } from 'react';
import { CodeEditorContext } from '../../../../shared/code-editor-context/CodeEditorContext';
import Status from '../../enuns/TypeOfStatus';
import BottonStatusBar from '../../../../components/botton-status-bar/BottonStatusBar';

export default class CodeEditor extends Component {

    constructor(
        public props: any,
        private bottonStatusBar: BottonStatusBar,
    ) { super(props) }

    render() {
        
        return (
            <>
                <button onClick={() => this.bottonStatusBar.toggleStatusbar(Status.ESCUTANDO_API)}>Teste</button>
            </>
        );
    }
}
CodeEditor.contextType = CodeEditorContext;

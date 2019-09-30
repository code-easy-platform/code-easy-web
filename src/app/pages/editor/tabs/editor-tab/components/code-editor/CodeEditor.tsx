import React, { Component } from 'react';
import { CodeEditorContext } from '../../../../shared/code-editor-context/CodeEditorContext';
import { TypeOfStatus, MessagesOfStatus, StatusBar, ColorsOfStatus } from '../../enuns/TypeOfStatus';

export default class CodeEditor extends Component {

    statusDefault: StatusBar = {
        status: TypeOfStatus.OutroStatus,
        message: MessagesOfStatus.EscutandoApi,
        messageLong: '',
        color: ColorsOfStatus.OutroStatus,
        isShowLoadingBar: false,
    }

    render() {
        return (
            <>
                <CodeEditorContext.Consumer>
                    {({ toggleStatusbar }) => (<button onClick={()=>toggleStatusbar(this.statusDefault)}>Teste</button>)}
                </CodeEditorContext.Consumer>
            </>
        );
    }
}
CodeEditor.contextType = CodeEditorContext;

import React, { Component } from 'react';
import './BottonStatusBar.scss';
import CodeEditorContext from '../../shared/code-editor-context/CodeEditorContext';
import { StatusBar } from '../../tabs/editor-tab/enuns/TypeOfStatus';

export default class BottonStatusBar extends Component {

    public toggleStatusbar = (statusBar: StatusBar) => this.context.toggleStatusbar(statusBar);

    public render() {
        return (
            <CodeEditorContext.Consumer>
                {({ statusBar }) => (
                    <div className="status-bar-main" style={{backgroundColor: statusBar.color}}>
                        <div style={{ flex: 1, textAlign: 'start' }} title={statusBar.messageLong}>{statusBar.message}</div>
                    </div>
                )}
            </CodeEditorContext.Consumer>
        );
    }
}
BottonStatusBar.contextType = CodeEditorContext;

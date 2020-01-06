import React, { Component } from 'react';
import { StatusBar } from '../../enuns/TypeOfStatus';
import CodeEditorContext from '../../services/contexts/CodeEditorContext';
import './BottonStatusBar.scss';

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

import React, { Component } from 'react';
import './BottonStatusBar.scss';
import CodeEditorContext from '../../shared/code-editor-context/CodeEditorContext';

export default class BottonStatusBar extends Component {
    render() {
        return (
            <div className="status-bar-main" /* [style.backgroundColor] = "currentStatus?.color" */ >
                <CodeEditorContext.Consumer>
                    {({ statusBar }) => <div style={{ flex: 1, textAlign: 'start' }}>{statusBar.message}</div>}
                </CodeEditorContext.Consumer>
            </div>
        );
    }
}

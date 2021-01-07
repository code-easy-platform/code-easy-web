import React from 'react';

import { BottonStatusBar, ContextModalList, ToolBar } from '../../shared/components';
import { CodeEditorProvider } from '../../shared/contexts';
import { Playground } from './editor-tab/Playground';
import './Editor.css';

export const Editor: React.FC = () => {
    return (
        <CodeEditorProvider>
            <div className="main-page">
                <ToolBar />
                <hr className="hr" />

                <div className="fade-in" style={{ height: "calc(100vh - (var(--tool-bar-height) + var(--status-bar-height)))" }}>
                    <Playground />
                </div>

                <hr className="hr z1" />
                <BottonStatusBar />
            </div>
            <ContextModalList />
        </CodeEditorProvider>
    );
}

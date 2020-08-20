import React from 'react';

import { BottonStatusBar } from '../../shared/components/botton-status-bar/BottonStatusBar';
import { ContextModalList } from '../../shared/components/context-modais/ContextModalList';
import { ToolBar } from '../../shared/components/tool-bar/ToolBar';
import { CodeEditorProvider } from '../../shared/contexts';
import { Playground } from './editor-tab/Playground';
import './Editor.css';


export const Editor: React.FC = () => {
    return (
        <CodeEditorProvider>
            <div className="main-page fade-in">
                <ToolBar />
                <hr className="hr" />

                <div style={{ height: "calc(100vh - 62px)" }}>
                    <Playground />
                </div>

                <hr className="hr" />
                <BottonStatusBar />
            </div>
            <ContextModalList />
        </CodeEditorProvider>
    );
}

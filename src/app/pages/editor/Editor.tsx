import React from 'react';

import { CodeEditorProvider, CurrentFocusProvider, TabListProvider } from '../../shared/contexts';
import { BottonStatusBar, ContextModalList, ToolBar } from '../../shared/components';
import { Playground } from './editor-tab/Playground';
import './Editor.css';

export const Editor: React.FC = () => {
    return (
        <CodeEditorProvider>
            <TabListProvider>
                <CurrentFocusProvider>
                    <div className="main-page">
                        <ToolBar />
                        <hr className="hr" />

                        <div className="fade-in" style={{ height: "calc(100vh - (var(--tool-bar-height) + var(--status-bar-height) + 2))" }}>{/* 2px is in 2x <hr/> */}
                            <Playground />
                        </div>

                        <hr className="hr z1" />
                        <BottonStatusBar />
                    </div>
                    <ContextModalList />
                </CurrentFocusProvider>
            </TabListProvider>
        </CodeEditorProvider>
    );
}

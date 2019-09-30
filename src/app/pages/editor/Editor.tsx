//#region Imports

import React, { Component } from 'react';
import ToolBar from './components/tool-bar/ToolBar';

import './Editor.scss';
import { CurrentTab } from '../../shared/enuns/CurrentTab';
import EditorTab from './tabs/editor-tab/EditorTab';
import PluginsTab from './tabs/plugins-tab/PluginsTab';
import PropertiesTab from './tabs/properties-tab/PropertiesTab';
import BottonStatusBar from './components/botton-status-bar/BottonStatusBar';
import CodeEditorContext from './shared/code-editor-context/CodeEditorContext';
import { StatusBar, TypeOfStatus, MessagesOfStatus, ColorsOfStatus } from './tabs/editor-tab/enuns/TypeOfStatus';

//#endregion

export default class Editor extends Component {
    toggleStatusBar = (statusBar: StatusBar) => {
        this.setState({
            statusBar: statusBar,
        });
    }

    state = {
        currentTab: <EditorTab />,
        statusBar: {
            status: TypeOfStatus.OutroStatus,
            message: MessagesOfStatus.OutroStatus,
            messageLong: '',
            color: ColorsOfStatus.OutroStatus,
            isShowLoadingBar: false,
        },
        toggleStatusbar: this.toggleStatusBar,
    };

    private changeCurrentTab = (tab: String) => {
        if (tab === CurrentTab.editor) {
            this.setState({ currentTab: <EditorTab /> });
        } else if (tab === CurrentTab.plugins) {
            this.setState({ currentTab: <PluginsTab /> });
        } else if (tab === CurrentTab.properties) {
            this.setState({ currentTab: <PropertiesTab /> });
        }
    }

    render() {
        return (
            <CodeEditorContext.Provider value={this.state}>
                <div className="main-page">
                    <ToolBar changeCurrentTab={this.changeCurrentTab} />

                    <div style={{ flex: 1 }}>
                        {this.state.currentTab}
                    </div>

                    <BottonStatusBar />
                </div>
            </CodeEditorContext.Provider>
        );
    }
}

import React, { Component } from 'react';
import ToolBar from './shared/components/tool-bar/ToolBar';

import './Editor.scss';
import { CurrentTab } from '../../shared/enuns/CurrentTab';
import EditorTab from './tabs/editor-tab/EditorTab';
import PluginsTab from './tabs/plugins-tab/PluginsTab';
import PropertiesTab from './tabs/properties-tab/PropertiesTab';
import BottonStatusBar from './shared/components/botton-status-bar/BottonStatusBar';
import CodeEditorContext from '../../shared/services/contexts/code-editor-context/CodeEditorContext';
import { Status, StatusBar } from './tabs/editor-tab/enuns/TypeOfStatus';
import { Project, Tab } from '../../shared/interfaces/Aplication';
import { Storage } from '../../shared/services/LocalStorage';
import { ComponentType } from '../../shared/enuns/ComponentType';

export default class Editor extends Component {

    public state = {
        statusBar: Status.OUTRO_STATUS,
        project: Storage.getProject(),
        currentTab: <EditorTab />,
        editingTab: ComponentType.tabRouters,

        toggleResourcesTab: (tab: Tab) => this.setState({ editingTab: tab }),
        toggleStatusbar: (statusBar: StatusBar) => this.setState({ statusBar }),
        changeProjectState: (project: Project) => {
            this.setState(project)
            Storage.setProject(project);
        },
        changeComponentState: () => {},
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

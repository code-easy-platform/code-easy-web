import React, { Component } from 'react';
import ToolBar from './shared/components/tool-bar/ToolBar';

import './Editor.scss';
import { CurrentTab } from '../../shared/enuns/CurrentTab';
import EditorTab from './tabs/editor-tab/EditorTab';
import PluginsTab from './tabs/plugins-tab/PluginsTab';
import PropertiesTab from './tabs/properties-tab/PropertiesTab';
import BottonStatusBar from './shared/components/botton-status-bar/BottonStatusBar';
import CodeEditorContext from '../../shared/services/contexts/code-editor-context/CodeEditorContext';
import Status, { StatusBar } from './tabs/editor-tab/enuns/TypeOfStatus';
import { Application } from '../../shared/interfaces/Aplication';
import { Storage } from '../../shared/services/LocalStorage';

export default class Editor extends Component {

    public state = {
        toggleStatusbar: (statusBar: StatusBar) => this.setState({ statusBar }),
        changeAplicationState: (application: Application) => {
            this.setState(application)
            Storage.setApplication(application);
        },
        changeRouterFlowItem: (index: number, routerFlowItem: any) => {
            let updateItens = this.state.application;
            updateItens.routers.litComponent[index].itens = routerFlowItem;
            this.setState({ application: updateItens });
            this.state.changeAplicationState(updateItens);
        },
        statusBar: Status.OUTRO_STATUS,
        application: Storage.getApplication(),
        currentTab: <EditorTab />,
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

//#region Imports

import React, { Component } from 'react';
import ToolBar from './shared/components/tool-bar/ToolBar';

import './Editor.scss';
import { CurrentTab } from '../../shared/enuns/CurrentTab';
import EditorTab from './tabs/editor-tab/EditorTab';
import PluginsTab from './tabs/plugins-tab/PluginsTab';
import PropertiesTab from './tabs/properties-tab/PropertiesTab';
import BottonStatusBar from './shared/components/botton-status-bar/BottonStatusBar';
import CodeEditorContext from './shared/services/code-editor-context/CodeEditorContext';
import Status, { StatusBar } from './tabs/editor-tab/enuns/TypeOfStatus';
import { Aplication } from '../../shared/interfaces/Aplication';
import { FluxoItemTypes } from './tabs/editor-tab/components/code-editor/enuns/FluxoList';

//#endregion

export default class Editor extends Component {

    state = {
        toggleStatusbar: (statusBar: StatusBar) => this.setState({ statusBar }),
        changeAplicationState: (application: Aplication) => this.setState({}),
        statusBar: Status.OUTRO_STATUS,
        application: {
            projectConfigs: {
                name: "",
                description: "",
                type: "",
                version: "",
                autor: "",
                currentProcess: "",
            },
            routers: {
                pastas: [],
                items: [],
            },
            actions: {
                pastas: [],
                items: [
                    {
                        configs: {
                            name: "",
                            description: "",
                            type: "",
                            version: "",
                            autor: "",
                            currentProcess: ""
                        },
                        key: 1,
                        fluxoItemTypes: FluxoItemTypes.flowItem,
                        antecessorKey: "",
                        sucessorKey: 2,
                        isHaveSucessor: true,
                        isHaveAntecessor: false,
                        top: 100,
                        left: 40,
                        width: 80,
                        height: 80,
                        title: 'Drag me 1'
                    },
                ],
            },
            data: {
                pastas: [],
                items: [],
            },
        },
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

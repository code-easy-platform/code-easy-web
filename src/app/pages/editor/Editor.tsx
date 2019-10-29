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
import { FlowItem, Application, ContentTabClass, ListComponent } from '../../shared/interfaces/Aplication';
import { FluxoItemTypes } from './tabs/editor-tab/components/code-editor/enuns/FluxoList';
import ProjectType from '../../shared/enuns/ProjectType';

//#endregion

const DATA_MOCK: ListComponent[] = [
    new ListComponent({
        isEditando: true,
        itens: [
            new FlowItem({ key: 1, fluxoItemTypes: FluxoItemTypes.flowItem, antecessorKey: 0, sucessorKey: 2, isHaveSucessor: true, isHaveAntecessor: false, top: 100, left: 40, width: 80, height: 80, title: 'Drag me 1' }),
            new FlowItem({ key: 2, fluxoItemTypes: FluxoItemTypes.flowItem, antecessorKey: 1, sucessorKey: 3, isHaveSucessor: true, isHaveAntecessor: true, top: 200, left: 40, width: 80, height: 80, title: 'Drag me 2' }),
            new FlowItem({ key: 3, fluxoItemTypes: FluxoItemTypes.flowItem, antecessorKey: 2, sucessorKey: 4, isHaveSucessor: true, isHaveAntecessor: true, top: 300, left: 40, width: 80, height: 80, title: 'Drag me 3' }),
            new FlowItem({ key: 4, fluxoItemTypes: FluxoItemTypes.flowItem, antecessorKey: 3, sucessorKey: 0, isHaveSucessor: false, isHaveAntecessor: true, top: 400, left: 40, width: 80, height: 80, title: 'Drag me 4' }),
        ]
    })
];

export default class Editor extends Component {

    state = {
        toggleStatusbar: (statusBar: StatusBar) => this.setState({ statusBar }),
        changeAplicationState: (application: Application) => this.setState(application),
        changeRouterFlowItem: (index: number, routerFlowItem: any) => {
            let updateItens = this.state.application;
            updateItens.routers.litComponent[index].itens = routerFlowItem;
            this.setState({ application: updateItens });
        },
        statusBar: Status.OUTRO_STATUS,
        application: new Application({
            projectConfigs: { autor: "", currentProcess: "", description: "", name: "", type: ProjectType.api, version: "0.0.1" },
            routers: new ContentTabClass({ pastas: [], litComponent: DATA_MOCK }),
            actions: new ContentTabClass({ pastas: [], litComponent: [] }),
            data: new ContentTabClass({ pastas: [], litComponent: [] }),
        }),
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

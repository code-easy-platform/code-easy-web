import React from 'react';
import { Redirect } from 'react-router-dom';

import { BottonStatusBar } from '../../shared/components/botton-status-bar/BottonStatusBar';
import { CodeEditorContext } from '../../shared/services/contexts/CodeEditorContext';
import { ToolBar } from '../../shared/components/tool-bar/ToolBar';
import { ComponentType } from '../../shared/enuns/ComponentType';
import { PropertiesTab } from './properties-tab/PropertiesTab';
import { Project } from '../../shared/interfaces/Aplication';
import { Storage } from '../../shared/services/LocalStorage';
import { CurrentTab } from '../../shared/enuns/CurrentTab';
import PluginsTab from './plugins-tab/PluginsTab';
import EditorTab from './editor-tab/EditorTab';
import './Editor.css';


export class Editor extends React.Component<any> {
    private params: any = this.props.match.params

    public state = {
        currentTab: <EditorTab />,
        project: Storage.getProjectById(this.params.id),
        editingTab: ComponentType.tabRouters,

        updateProjectState: (project: Project) => this.updateProjectState(project),
        toggleResourcesTab: (type: ComponentType) => this.toggleResourcesTab(type),
    }

    componentDidUpdate() {
        document.title = this.state.project.projectConfigs.label + ' - Code Easy'
    }

    private onChangeTab = (tab: CurrentTab) => {
        if (tab === CurrentTab.editor) {
            this.setState({ currentTab: <EditorTab /> });
        } else if (tab === CurrentTab.plugins) {
            this.setState({ currentTab: <PluginsTab /> });
        } else if (tab === CurrentTab.properties) {
            this.setState({ currentTab: <PropertiesTab /> });
        }
    }

    private toggleResourcesTab(type: ComponentType) {
        let project = this.state.project;

        project.tabs.forEach(tab => {
            if (tab.configs.type === type) {
                tab.configs.isEditing = true;
            } else {
                tab.configs.isEditing = false;
            }
        });

        this.updateProjectState(project);
    }

    /** Usada para atualizar o state global do projeto e para atualizar o localstorage */
    private updateProjectState(project: Project) {
        Storage.setProjectById(project);
        this.setState(project)
    }

    render() {
        return (
            <CodeEditorContext.Provider value={this.state}>
                <div className="main-page">
                    <ToolBar onChangeTab={this.onChangeTab} />
                    <hr className="hr" />

                    <div style={{ height: "calc(100vh - 60px)" }}>
                        {this.state.currentTab}
                    </div>

                    <hr className="hr" />
                    <BottonStatusBar />
                </div>
                {(this.state.project.projectConfigs.id === undefined) && <Redirect to="/" />}
            </CodeEditorContext.Provider>
        );
    }

}

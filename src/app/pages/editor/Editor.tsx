import React from 'react';
import { Redirect } from 'react-router-dom';

import { BottonStatusBar } from '../../shared/components/botton-status-bar/BottonStatusBar';
import { CodeEditorContext } from '../../shared/services/contexts/CodeEditorContext';
import { ToolBar } from '../../shared/components/tool-bar/ToolBar';
import { ComponentType } from '../../shared/enuns/ComponentType';
import { PropertiesTab } from './properties-tab/PropertiesTab';
import { Project } from '../../shared/interfaces/Aplication';
import { ProjectsStorage } from '../../shared/services/storage/ProjectsStorage';
import { CurrentTab } from '../../shared/enuns/CurrentTab';
import PluginsTab from './plugins-tab/PluginsTab';
import EditorTab from './editor-tab/EditorTab';
import './Editor.css';
import { ProblemsHelper } from '../../shared/services/helpers/ProblemsHelper';


export class Editor extends React.Component<any> {
    private params: any = this.props.match.params;

    public state = {
        currentTab: <EditorTab />,
        project: ProjectsStorage.getProjectById(this.params.id),
        editingTab: ComponentType.tabRoutes,

        updateProjectState: (project: Project) => this.updateProjectState(project),
        toggleResourcesTab: (type: ComponentType) => this.toggleResourcesTab(type),
    }

    componentDidUpdate() {
        document.title = this.state.project.projectConfigs.label + ' - Code Easy';

        if (!this.state.project.projectConfigs.id) {

        }
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

        // Valida o projeto e encontra os problemas
        project = ProblemsHelper.getProblems(project).project;

        // WindowsTabsManager
        project = ProjectsStorage.updateWindowTabs(project);

        // Salva a nova versão do projeto no local storage
        ProjectsStorage.setProjectById(project);

        // Atualiza o state do projeto para refletir as alterações na tela
        this.setState({ project: project });
    }

    render() {
        return (
            <CodeEditorContext.Provider value={this.state}>
                <div className="main-page fade-in">
                    <ToolBar />
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

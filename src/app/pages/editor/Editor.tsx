import React from 'react';
import { Redirect } from 'react-router-dom';

import { CodeEditorContext, ICodeEditorContext } from '../../shared/services/contexts/CodeEditorContext';
import { BottonStatusBar } from '../../shared/components/botton-status-bar/BottonStatusBar';
import { ContextModalList } from '../../shared/components/context-modais/ContextModalList';
import { ProjectsStorage } from '../../shared/services/storage/ProjectsStorage';
import { ProblemsHelper } from '../../shared/services/helpers/ProblemsHelper';
import { ToolBar } from '../../shared/components/tool-bar/ToolBar';
import { Project } from '../../shared/interfaces/Aplication';
import { EditorTab } from './editor-tab/EditorTab';
import './Editor.css';


export class Editor extends React.Component<any> {
    private params: any = this.props.match.params;

    public state: ICodeEditorContext = {
        currentTab: <EditorTab />,
        project: ProjectsStorage.getProjectById(this.params.id),
        updateProjectState: (project: Project) => this.updateProjectState(project),
    }

    /** Usada para atualizar o state global do projeto e para atualizar o localstorage */
    private updateProjectState(project: Project) {

        const { label } = this.state.project.projectConfigs;
        document.title = label === '' ? 'Code Easy' : label + ' - Code Easy';

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
                <ContextModalList />
                {(this.state.project.projectConfigs.id === undefined) && <Redirect to="/" />}
            </CodeEditorContext.Provider>
        );
    }

}

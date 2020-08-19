import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useParams, Redirect } from 'react-router-dom';

import { CenterLoadingIndicator } from '../components/loading-indicator/LoadingIndicator';
import { ProjectsStorage } from '../services/storage/ProjectsStorage';
import { ProblemsHelper } from '../services/helpers/ProblemsHelper';
import { Project } from '../interfaces/Aplication';

export interface ICodeEditorContext {
    project: Project,
    updateProjectState(project: Project): void,
}
const CodeEditorContext = React.createContext<ICodeEditorContext>({} as ICodeEditorContext);

export const CodeEditorProvider: React.FC = ({ children }) => {

    const { id } = useParams();

    const [state, setState] = useState<ICodeEditorContext>({
        updateProjectState: (project: Project) => updateProjectState(project),
        project: ProjectsStorage.getProjectById(id),
    });
    useEffect(() => {
        const project = ProjectsStorage.getProjectById(id);
        setState(oldState => ({ ...oldState, project }));
    }, [id]);

    /** Usada para atualizar o state global do projeto e para atualizar o localstorage */
    const updateProjectState = useCallback((project: Project) => {
        const { label } = state.project.projectConfigs;
        document.title = label === '' ? 'Code Easy' : label + ' - Code Easy';

        // Valida o projeto e encontra os problemas
        project = ProblemsHelper.getProblems(project).project;

        // WindowsTabsManager
        project = ProjectsStorage.updateWindowTabs(project);

        // Salva a nova versão do projeto no local storage
        ProjectsStorage.setProjectById(project);

        // Atualiza o state do projeto para refletir as alterações na tela
        setState(oldState => ({ ...oldState, project }));
    }, [state.project.projectConfigs]);

    return (
        <CodeEditorContext.Provider value={state}>
            {(id === undefined) && <Redirect to="/" />}
            {
                state.project.projectConfigs
                    ? children
                    : <CenterLoadingIndicator />
            }
        </CodeEditorContext.Provider>
    );
}

export const useCodeEditorContext = () => useContext<ICodeEditorContext>(CodeEditorContext);

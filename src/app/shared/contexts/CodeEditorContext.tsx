import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { CenterLoadingIndicator } from '../components/loading-indicator/LoadingIndicator';
import { ProjectsStorage } from '../services/storage/ProjectsStorage';
import { ProblemsHelper } from '../services/helpers/ProblemsHelper';
import { Project } from '../interfaces/Aplication';

export interface ICodeEditorContext {
    project: Project,
    setProject(project: Project): void,
}
const CodeEditorContext = React.createContext<ICodeEditorContext>({} as ICodeEditorContext);

export const CodeEditorProvider: React.FC = ({ children }) => {

    const history = useHistory();
    const { id } = useParams();

    /** Usada para atualizar o state global do projeto e para atualizar o localstorage */
    const handleSetProject = useCallback((project: Project) => {

        // Valida o projeto e encontra os problemas
        project = ProblemsHelper.getProblems(project).project;

        // WindowsTabsManager
        project = ProjectsStorage.updateWindowTabs(project);

        // Salva a nova versão do projeto no local storage
        ProjectsStorage.setProjectById(project);

        // Atualiza o state do projeto para refletir as alterações na tela
        setState(oldState => {
            const { label } = oldState.project.projectConfigs;
            document.title = label === '' ? 'Code Easy' : label + ' - Code Easy';

            return {
                ...oldState,
                project
            }
        });
    }, []);

    const [state, setState] = useState<ICodeEditorContext>({
        project: ProjectsStorage.getProjectById(id),
        setProject: handleSetProject,
    });
    useEffect(() => {
        if (id === undefined) history.replace('/');
        setState(oldState => ({
            ...oldState,
            project: ProjectsStorage.getProjectById(id)
        }));
    }, [id, history]);

    return (
        <CodeEditorContext.Provider value={state}>
            {
                state.project.projectConfigs
                    ? children
                    : <CenterLoadingIndicator />
            }
        </CodeEditorContext.Provider>
    );
}

export const useEditorContext = () => useContext<ICodeEditorContext>(CodeEditorContext);

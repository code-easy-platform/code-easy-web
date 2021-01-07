import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { ProjectsStorage } from '../services/storage/ProjectsStorage';
import { CenterLoadingIndicator } from '../components';
import { Project } from '../models';

export interface ICodeEditorContext {
    project: Project,
}
export const CodeEditorContext = React.createContext<ICodeEditorContext>({} as ICodeEditorContext);

export const CodeEditorProvider: React.FC = ({ children }) => {

    const { id } = useParams<{ id: string }>();
    const history = useHistory();

    /** Usada para atualizar o state global do projeto e para atualizar o localstorage */
    /* const handleSetProject = useCallback((project: Project) => {

        // Valida o projeto e encontra os problemas
        // project = ProblemsHelper.getProblems(project).project;

        // Salva a nova versão do projeto no local storage
        ProjectsStorage.setProjectById(project);
    }, []); */

    const [state, setState] = useState<ICodeEditorContext>({
        project: ProjectsStorage.getProjectById(id),
    });
    useEffect(() => {
        if (id === undefined) history.replace('/');

        setState(oldState => ({
            ...oldState,
            project: ProjectsStorage.getProjectById(id)
        }));

    }, [id, history]);

    useEffect(() => {
        return state.project.label.subscribe(label => {
            document.title = label === '' ? 'Code Easy' : label + ' - Code Easy'
        }).unsubscribe;
    }, [state.project]);

    return (
        <CodeEditorContext.Provider value={state}>
            {
                state.project
                    ? children
                    : <CenterLoadingIndicator />
            }
        </CodeEditorContext.Provider>
    );
}

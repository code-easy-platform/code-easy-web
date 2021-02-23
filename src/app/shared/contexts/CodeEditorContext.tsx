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

    const [project, setProject] = useState<Project>();
    useEffect(() => {
        if (id) {
            ProjectsStorage.getProjectById(id)
                .then(setProject)
                .catch(console.error);
        } else {
            history.replace('/');
        }
    }, [id, history]);

    // Subscribe in the label of the project to change the browser tab title
    useEffect(() => {
        return project?.label.subscribe(label => {
            document.title = label === '' ? 'Code Easy' : label + ' - Code Easy'
        }).unsubscribe;
    }, [project]);

    if (!project) return <CenterLoadingIndicator />;

    return (
        <CodeEditorContext.Provider value={{ project }}>
            {children}
        </CodeEditorContext.Provider>
    );
}

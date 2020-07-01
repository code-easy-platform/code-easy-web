import React from 'react';

import { Project } from '../../interfaces/Aplication';
import { ProjectsStorage } from './../storage/ProjectsStorage';

export interface ICodeEditorContext {
    project: Project,
    currentTab: JSX.Element,
    updateProjectState(project: Project): void,
}
export const CodeEditorContext = React.createContext<ICodeEditorContext>({
    currentTab: <></>,
    project: ProjectsStorage.getProjectById(),
    updateProjectState: (project: Project) => { },
});

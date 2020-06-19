import React from 'react';

import { Project } from '../../interfaces/Aplication';
import { ComponentType } from '../../enuns/ComponentType';
import { ProjectsStorage } from './../storage/ProjectsStorage';

export interface ICodeEditorContext {
    project: Project,
    currentTab: JSX.Element,
    editingTab: ComponentType,
    updateProjectState(project: Project): void,
    toggleResourcesTab(tab: ComponentType): void,
}
export const CodeEditorContext = React.createContext<ICodeEditorContext>({
    currentTab: <></>,
    project: ProjectsStorage.getProjectById(),
    editingTab: ComponentType.tabRoutes,

    updateProjectState: (project: Project) => { },
    toggleResourcesTab: (tab: ComponentType) => { },
});

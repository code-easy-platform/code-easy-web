import React from 'react';
import Status, { StatusBar } from '../../../../pages/editor/tabs/editor-tab/enuns/TypeOfStatus';
import { FlowItem, Application, ContentTabClass } from '../../../interfaces/Aplication';
import ProjectType from '../../../enuns/ProjectType';

const DEFAULT_PROJECT = new Application({
    projectConfigs: { autor: "", currentProcess: "", description: "", name: "", type: ProjectType.api, version: "0.0.1" },
    routers: new ContentTabClass({ pastas: [], litComponent: [] }),
    actions: new ContentTabClass({ pastas: [], litComponent: [] }),
    data: new ContentTabClass({ pastas: [], litComponent: [] })
});

export const CodeEditorContext = React.createContext({
    statusBar: Status.OUTRO_STATUS,
    application: DEFAULT_PROJECT,
    toggleStatusbar: (statusBar: StatusBar) => { },
    changeAplicationState: (application: Application) => { },
    changeRouterFlowItem: (index: number, routerFlowItem: FlowItem[]) => { },
});

export default CodeEditorContext;

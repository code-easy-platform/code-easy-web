import React from 'react';
import Status, { StatusBar } from '../../../tabs/editor-tab/enuns/TypeOfStatus';
import { Aplication, FlowItem } from '../../../../../shared/interfaces/Aplication';
import { FluxoItemTypes } from '../../../tabs/editor-tab/components/code-editor/enuns/FluxoList';

export const CodeEditorContext = React.createContext({
    statusBar: Status.OUTRO_STATUS,
    application: {
        projectConfigs: {
            name: "",
            description: "",
            type: "",
            version: "",
            autor: "",
            currentProcess: "",
        },
        routers: {
            pastas: [],
            items: [
                { key: 0, fluxoItemTypes: FluxoItemTypes.flowItem, antecessorKey: 0, sucessorKey: 0, isHaveSucessor: true, isHaveAntecessor: false, top: 0, left: 0, width: 0, height: 0, title: "" },
            ],
        },
        actions: {
            pastas: [],
            items: [],
        },
        data: {
            pastas: [],
            items: [],
        },
    },
    toggleStatusbar: (statusBar: StatusBar) => { },
    changeAplicationState: (application: Aplication) => { },
    changeRouterFlowItem: (routerFlowItem: FlowItem[]) => { },
});

export default CodeEditorContext;

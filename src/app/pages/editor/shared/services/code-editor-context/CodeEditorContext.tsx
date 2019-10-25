import React from 'react';
import Status, { StatusBar } from '../../../tabs/editor-tab/enuns/TypeOfStatus';
import { Aplication } from '../../../../../shared/interfaces/Aplication';
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
                { key: 1, fluxoItemTypes: FluxoItemTypes.flowItem, antecessorKey: "", sucessorKey: 2, isHaveSucessor: true, isHaveAntecessor: false, top: 100, left: 40, width: 80, height: 80, title: 'Drag me 1' }
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
});

export default CodeEditorContext;

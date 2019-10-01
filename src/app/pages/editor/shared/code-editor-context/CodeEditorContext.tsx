import React from 'react';
import Status, { StatusBar } from '../../tabs/editor-tab/enuns/TypeOfStatus';

export const CodeEditorContext = React.createContext({
    statusBar: Status.OUTRO_STATUS,
    toggleStatusbar: (statusBar: StatusBar) => { },
});

export default CodeEditorContext;

import React from 'react';
import { TypeOfStatus, ColorsOfStatus, MessagesOfStatus, StatusBar } from '../../tabs/editor-tab/enuns/TypeOfStatus';

const statusDefault: StatusBar = {
    status: TypeOfStatus.OutroStatus,
    message: MessagesOfStatus.OutroStatus,
    messageLong: '',
    color: ColorsOfStatus.OutroStatus,
    isShowLoadingBar: false,
}

export const CodeEditorContext = React.createContext({
    statusBar: statusDefault,
    toggleStatusbar: (statusBar: StatusBar)=>{},
});

export default CodeEditorContext;

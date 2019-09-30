export interface StatusBar {
    status: TypeOfStatus;
    message: MessagesOfStatus;
    messageLong: string;
    color: ColorsOfStatus;
    isShowLoadingBar: Boolean;
}

export enum TypeOfStatus {
    EscutandoApi,
    ApiFinalizada,
    ApiNaoIniciada,
    OutroStatus,
    FalhaGeral
}

export enum ColorsOfStatus {
    EscutandoApi = '#207d00',
    ApiFinalizada = '',
    ApiNaoIniciada = '',
    OutroStatus = '',
    FalhaGeral = ''
}

export enum MessagesOfStatus {
    EscutandoApi = 'Escutando API...',
    ApiFinalizada = '',
    ApiNaoIniciada = '',
    OutroStatus = '',
    FalhaGeral = ''
}

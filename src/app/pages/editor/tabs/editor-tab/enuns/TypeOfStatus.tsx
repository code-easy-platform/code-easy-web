export interface StatusBar {
    status: TypeOfStatusEnum | undefined;
    message: MessagesOfStatusEnum | undefined;
    messageLong: string | undefined;
    color: ColorsOfStatusEnum | undefined;
    isShowLoadingBar: Boolean | undefined;
}

export enum TypeOfStatusEnum {
    EscutandoApi,
    ApiFinalizada,
    ApiNaoIniciada,
    OutroStatus,
    FalhaGeral
}

export enum ColorsOfStatusEnum {
    EscutandoApi = '#207d00',
    ApiFinalizada = '',
    ApiNaoIniciada = '#ff3c3c',
    OutroStatus = '',
    FalhaGeral = '#ff0000'
}

export enum MessagesOfStatusEnum {
    EscutandoApi = 'Escutando API...',
    ApiFinalizada = 'Api finalizada...',
    ApiNaoIniciada = 'Api não iniciada...',
    OutroStatus = '',
    FalhaGeral = 'Falha geral...'
}

export class Status {
    constructor(
        public custom_status: StatusBar
    ) { }

    public static ESCUTANDO_API: StatusBar = {
        status: TypeOfStatusEnum.EscutandoApi,
        message: MessagesOfStatusEnum.EscutandoApi,
        messageLong: '',
        color: ColorsOfStatusEnum.EscutandoApi,
        isShowLoadingBar: false,
    }

    public static API_FINALIZADA: StatusBar = {
        status: TypeOfStatusEnum.ApiFinalizada,
        message: MessagesOfStatusEnum.ApiFinalizada,
        messageLong: '',
        color: ColorsOfStatusEnum.ApiFinalizada,
        isShowLoadingBar: false,
    }

    public static API_NAO_INICIADA: StatusBar = {
        status: TypeOfStatusEnum.ApiNaoIniciada,
        message: MessagesOfStatusEnum.ApiNaoIniciada,
        messageLong: '',
        color: ColorsOfStatusEnum.ApiNaoIniciada,
        isShowLoadingBar: false,
    }

    public static OUTRO_STATUS: StatusBar = {
        status: TypeOfStatusEnum.OutroStatus,
        message: MessagesOfStatusEnum.OutroStatus,
        messageLong: '',
        color: ColorsOfStatusEnum.OutroStatus,
        isShowLoadingBar: false,
    }

    public static FALHA_GERAL: StatusBar = {
        status: TypeOfStatusEnum.FalhaGeral,
        message: MessagesOfStatusEnum.FalhaGeral,
        messageLong: '',
        color: ColorsOfStatusEnum.FalhaGeral,
        isShowLoadingBar: false,
    }
}
export default Status;

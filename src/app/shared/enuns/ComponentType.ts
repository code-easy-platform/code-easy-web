
/**
 * Tipos possíveis de item, pode ser uma "action", uma "pasta" ou uma "rota" por exemplo!
 */
export enum ComponentType {
    outputVariable = "OUTPUT_VARIABLE",
    inputVariable = "INPUT_VARIABLE",
    localVariable = "LOCAL_VARIABLE",

    globalAction = "GLOBAL_ACTION",
    localAction = "LOCAL_ACTION",

    /**
     * Aba do sistema onde é definido as rotas das APIs
    */
    tabRouters = "TAB_ROUTERS",
    /**
     * Aba do sistema onde é definido as actions globais
    */
    tabActions = "TAB_ACTIONS",
    /**
     * Aba do sistema onde é definido as tabelas ou as estruturas de dados
    */
    tabDates = "TAB_DATE",
}


/**
 * Tipos possíveis de item, pode ser uma "action", uma "pasta" ou uma "rota" por exemplo!
 */
export enum ComponentType {

    /**
     * Usado em itens que tem apenas a função de agrupar itens
     * 
     * ex: "pastas";
     */
    grouper = "GROUPER",

    outputVariable = "OUTPUT_VARIABLE",
    inputVariable = "INPUT_VARIABLE",
    localVariable = "LOCAL_VARIABLE",

    globalAction = "Global action",
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

    /**
     * Tipa um item que será considerado uma rota do sistema
     * */
    router = "Router",

}

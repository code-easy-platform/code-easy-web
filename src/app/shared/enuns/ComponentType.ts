
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

    outputVariable = "Output variable",
    inputVariable = "Input variable",
    localVariable = "Local variable",

    globalAction = "Global action",
    localAction = "Local action",
    extension = "Extension",

    /**
     * Aba do sistema onde é definido as rotas das APIs
    */
    tabRoutes = "Routes tab",
    /**
     * Aba do sistema onde é definido as actions globais
    */
    tabActions = "Actions tab",
    /**
     * Aba do sistema onde é definido as tabelas ou as estruturas de dados
    */
    tabDates = "Data tab",

    /**
     * Tipa um item que será considerado uma rota do sistema
     * */
    router = "Router",

}

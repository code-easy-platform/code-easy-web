/**
 * Tipos possíveis de item, pode ser uma "action", uma "pasta" ou uma "rota" por exemplo!
 */
export enum ComponentType {
    tabDates = "TAB_DATE",
    tabRouters = "TAB_ROUTERS",
    tabActions = "TAB_ACTIONS",
    rota = "ROTA",
    pasta = "PASTA",
    globalAction = "GLOBAL_ACTION",
    localAction = "LOCAL_ACTION",
    localVariable = "LOCAL_VRIABLE",
    inputVariable = "INPUT_VARIABLE",
    outputVariable = "OUTPUT_VARIABLE",
}

export default ComponentType;

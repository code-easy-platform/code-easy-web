
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
    /**
     * Tipo de variável usada para emitir algum valor como retorno a uma chamada.
     */
    outputVariable = "Output variable",
    /**
     * Tipo de variável usada para receber algum tipo de informação em actions ou routes.
     */
    inputVariable = "Input variable",
    /**
     * Tipo de variável usada para se trabalhar informações de forma local.
     */
    localVariable = "Local variable",
    /**
     * Principal grupo de actions, usadas para definir regras de negócio que pode3 ser acessada em toda a aplicação.
     */
    globalAction = "Global action",
    /**
     * Grupo de actions que poderá ser usado dentro de outra action global dentro de uma route ou atpe mesmo dentro dela mesma.
     */
    localAction = "Local action",
    /**
     * Tipo de item que será conseiderado para executar algum tipo de código JS dentro do servidor node.
     */
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
     * Tipa um item que será considerado uma rota de API
     * */
    router = "Router",
}

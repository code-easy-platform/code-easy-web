export interface IBasicFields {
    /**
     * Usado como identificador do registro
     * 
     * * Se ***undefined*** significa que o registro está sendo criado novo ou a partir de outro.
     */
    id: string | undefined;
    /**
     * Usado para identificar um registro dentro do sistema.
     * 
     *  * Não pode ter espaço
     *  * Não pode ter caracteres especiais
     *  * Não pode ser vazio
     */
    name: string;
    /**
     * Usado para nomear um registro apenas de forma visual
     */
    label: string;
    /**
     * Usado para descrever algum detalhe do registro
     */
    description: string;
    /**
     * Campo usado para controlar a onder dos items
     */
    ordem?: number;
    /**
     * Field used to store criation date
     */
    createdDate?: Date;
    /**
     * Field used to store updated date
     */
    updatedDate?: Date;

    // Aqui vai o campo para a lista de proriedades.
}

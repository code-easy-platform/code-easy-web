/**
 * Tipos de items existentes na toolbar.
 * 
 * Used to define the different types of logic
 * items that may be present in the flow.
 */
export enum EItemType {
    /**
     * Used to define the representation of a logical Comment
     */
    COMMENT = "Comment",
    /**
     * Used to define the representation of a logical Foreach
     */
    FOREACH = "Foreach",
    /**
     * Used to define the representation of a logical Switch
     */
    SWITCH = "Switch",
    /**
     * Used to define values
     */
    ASSIGN = "Assign",
    /**
     * Used to execute other logical flows
     */
    ACTION = "Action",
    /**
     * Used to indicate the start of the flow
     */
    START = "Start",
    /**
     * Used to indicate the end of the flow
     */
    END = "End",
    /**
     * Used to define the representation of a logical IF
     */
    IF = "If",
}

/**
 * Used when we want to build a list of possible flow items
 */
export const EItemTypeList = [
    EItemType.COMMENT,
    EItemType.FOREACH,
    EItemType.SWITCH,
    EItemType.ASSIGN,
    EItemType.ACTION,
    EItemType.START,
    EItemType.END,
    EItemType.IF,
];

/**
 * Used to easily convert a string into a EItemType
 * @param value string to be converted
 */
export const parseEItemType = (value: string) => {
    switch (value) {
        case EItemType.START:
            return EItemType.START;
            
        case EItemType.ACTION:
            return EItemType.ACTION;

        case EItemType.ASSIGN:
            return EItemType.ASSIGN;

        case EItemType.COMMENT:
            return EItemType.COMMENT;

        case EItemType.END:
            return EItemType.END;

        case EItemType.FOREACH:
            return EItemType.FOREACH;

        case EItemType.IF:
            return EItemType.IF;

        case EItemType.SWITCH:
            return EItemType.SWITCH;
    
        default:
            return EItemType.START;
    }
}

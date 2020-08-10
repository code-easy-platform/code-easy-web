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

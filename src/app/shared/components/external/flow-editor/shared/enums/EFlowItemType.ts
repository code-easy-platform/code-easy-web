/**
 * Possible types of flow items
 * 
 * Usually we only have these types of flow items,
 * with which you can create any type of logic component!
 */
export enum EFlowItemType {
    /**
     * Used to connect a acorn in other
     */
    line = "LINE",
    /**
     * Represents the logical components
     */
    acorn = "ACORN",
    /**
     * Used to help in the code documentation
     */
    comment = "COMMENT",
}
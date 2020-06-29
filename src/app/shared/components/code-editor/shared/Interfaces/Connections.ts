/** Used to represente lines in the flow between flow items */
export interface IConnections {
    /** This will apper in the line as a title */
    connectionLabel?: string;
    /** Unique id to identify the connection */
    id: string | undefined;
    /** Used to identify when the usre click over the line */
    isSelected?: boolean;
    /** Identifier of the element that is connected by the line  */
    connectionId: string;
}

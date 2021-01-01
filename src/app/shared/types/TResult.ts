/**
 * A method result
 */
export type TResult<T, E = any> = T extends void
    ? void | {
        error?: E;
    }
    : {
        result?: T;
        error?: E;
    };

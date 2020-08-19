
/**
 * Makes all mandatory attributes optional
 */
export type Optional<T> = {
    [P in keyof T]?: T[P];
};

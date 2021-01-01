export interface IResponseProps<T = any> {
    statusCode: string;
    message?: string;
    error?: string;
    data?: T
}

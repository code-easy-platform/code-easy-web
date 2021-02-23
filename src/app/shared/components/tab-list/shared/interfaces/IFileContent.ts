export interface IFileContent {
    content?: string | ArrayBuffer | null,
    lastModified?: number,
    name?: string,
    size?: number,
    type?: string,
}
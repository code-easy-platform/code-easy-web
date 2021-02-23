export interface IFileToDownloadAsZip {
    name: string;
    type?: string;
    content?: string;
    isFolder: boolean;
    children?: IFileToDownloadAsZip[];
}

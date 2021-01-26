import { saveAs } from 'file-saver';
import JSZip from 'jszip';

interface IFileToDownload {
    name: string;
    type?: string;
    content?: string;
    isFolder: boolean;
    children?: IFileToDownload[];
}

/**
 * Allow download many files and folders
 * @param files List of files to download
 */
const downloadFilesAsZip = (files: IFileToDownload[]): boolean => {
    try {
        const base = new JSZip();

        const zipFolderOrFile = (zip: JSZip, folderOrFile: IFileToDownload) => {
            if (folderOrFile.isFolder) {
                const folder = zip.folder(folderOrFile.name);
                if (!folder) {
                    throw new Error(`Error creating folder "${folderOrFile.name}"`);
                } else {
                    folderOrFile.children?.forEach(_folderOrFile => zipFolderOrFile(folder, _folderOrFile));
                }
            } else {
                zip.file(`${folderOrFile.name}.${folderOrFile.type}`, folderOrFile?.content || '');
            }
        }

        // Convert files
        files.forEach(fileOrFolder => {
            zipFolderOrFile(base, fileOrFolder);
        });

        base.generateAsync({ type: "blob" }).then(content => {
            saveAs(content, 'MyProject')
        });

        return true;
    } catch (error) {
        console.error(error)
        return false;
    }
}

export const DownloadService = {
    downloadFilesAsZip,
}

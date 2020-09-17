import { BasicConfigurations } from "./BasicConfigurations";
import { IProjectConfigurations } from "../interfaces";
import { EProjectType } from "../../../enuns";

export class ProjectConfigurations extends BasicConfigurations<EProjectType> implements IProjectConfigurations {
    author: string;
    version: string;
    currentPlatformVersion: string;
    createdInPlatformVersion: string;

    constructor(fields: IProjectConfigurations) {
        super(fields);

        this.author = fields.author;
        this.version = fields.version;
        this.currentPlatformVersion = fields.currentPlatformVersion;
        this.createdInPlatformVersion = fields.createdInPlatformVersion;
    }
}

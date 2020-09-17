import { IconError, IconWarning, Utils } from "code-easy-components";

import { ITreeItem } from "../../../components/tree-manager";
import { BasicConfigurations } from "./BasicConfigurations";
import { IProjectConfigurations } from "../interfaces";
import { EProjectType } from "../../../enuns";


type OmitInConstructor = 'name' | 'problems';

export class ProjectConfigurations extends BasicConfigurations<EProjectType> implements IProjectConfigurations {
    public author: string;
    public version: string;
    public currentPlatformVersion: string;
    public createdInPlatformVersion: string;

    public get problems(): ITreeItem[] {
        let problems = super.problems;

        const addProblem = (label: string, type: 'warning' | 'error') => {
            problems.push({
                icon: type === 'warning' ? IconWarning : IconError,
                isDisabledSelect: true,
                nodeExpanded: false,
                isSelected: false,
                id: undefined,
                iconSize: 15,
                type: "ITEM",
                label,
            });
        }

        if (this.author.length === 0) {
            addProblem('Author field must be have a value', 'error');
            this.hasError = true;
        } else if (this.author.length < 3) {
            addProblem('Project Author name field cannot be less than 3 characters', 'warning');
            this.hasWarning = true;
        } else if (this.author.length > 50) {
            addProblem('Project Author name field cannot exceed 50 characters', 'warning');
            this.hasWarning = true;
        }

        if (this.version.length === 0) {
            addProblem('Version field must be have a value', 'error');
            this.hasError = true;
        } else if (Utils.isValidVersion(this.version)) {
            addProblem('Project version field is not valid', 'error');
        }

        return problems;
    }

    constructor(fields: Omit<IProjectConfigurations, OmitInConstructor>) {
        super(fields);

        this.author = fields.author;
        this.version = fields.version;
        this.currentPlatformVersion = fields.currentPlatformVersion;
        this.createdInPlatformVersion = fields.createdInPlatformVersion;
    }
}

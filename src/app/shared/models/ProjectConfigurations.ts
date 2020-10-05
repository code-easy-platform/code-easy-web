import { IconError, IconWarning, Utils } from "code-easy-components";

import { TypeOfValues, ITreeItem } from "../components/external";
import { BasicConfigurations } from "./BasicConfigurations";
import { EProjectType, PropertieTypes } from "./../enuns";
import { IProjectConfigurations } from "../interfaces";


type OmitInConstructor = 'name' | 'problems';

export class ProjectConfigurations extends BasicConfigurations<EProjectType> implements IProjectConfigurations {

    public get author(): string {
        return this.properties.find(prop => prop.propertieType === PropertieTypes.author)?.value || '';
    };
    public set author(value: string) {
        let prop = this.properties.find(prop => prop.propertieType === PropertieTypes.author);
        if (prop) {
            prop.value = value || prop.value;
        } else {
            this.properties.push({
                value,
                id: Utils.getUUID(),
                focusOnRender: true,
                type: TypeOfValues.string,
                name: PropertieTypes.author,
                propertieType: PropertieTypes.author,
            });
        }
    };

    public get version(): string {
        return this.properties.find(prop => prop.propertieType === PropertieTypes.version)?.value || '';
    };
    public set version(value: string) {
        let prop = this.properties?.find(prop => prop.propertieType === PropertieTypes.version);
        if (prop) {
            prop.value = value;
        } else {
            this.properties.push({
                value,
                id: Utils.getUUID(),
                focusOnRender: true,
                type: TypeOfValues.string,
                name: PropertieTypes.version,
                propertieType: PropertieTypes.version,
            });
        }
    };

    public get currentPlatformVersion(): string {
        return this.properties.find(prop => prop.propertieType === PropertieTypes.platformVersion)?.value || '';
    };
    public set currentPlatformVersion(value: string) {
        let prop = this.properties?.find(prop => prop.propertieType === PropertieTypes.platformVersion);
        if (prop) {
            prop.value = value;
        } else {
            this.properties.push({
                value,
                id: Utils.getUUID(),
                focusOnRender: true,
                type: TypeOfValues.string,
                name: PropertieTypes.platformVersion,
                propertieType: PropertieTypes.platformVersion,
            });
        }
    };

    public get createdInPlatformVersion(): string {
        return this.properties.find(prop => prop.propertieType === PropertieTypes.createdInPlatformVersion)?.value || '';
    };
    public set createdInPlatformVersion(value: string) {
        let prop = this.properties?.find(prop => prop.propertieType === PropertieTypes.createdInPlatformVersion);
        if (prop) {
            prop.value = value;
        } else {
            this.properties.push({
                value,
                id: Utils.getUUID(),
                focusOnRender: true,
                type: TypeOfValues.string,
                name: PropertieTypes.createdInPlatformVersion,
                propertieType: PropertieTypes.createdInPlatformVersion,
            });
        }
    };

    public get problems(): ITreeItem[] {
        let problems = super.problems;

        const addProblem = (label: string, type: 'warning' | 'error') => {
            problems.push({
                icon: type === 'warning' ? IconWarning : IconError,
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

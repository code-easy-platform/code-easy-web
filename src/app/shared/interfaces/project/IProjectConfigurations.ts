import { IBasicFields } from "./IBasicFields";
import { ProjectType } from "./../../enuns";

/**
 * Exclusivamente utilizada na configuração do projeto,
 * em informações que definem o tipo de projeto.
 * 
 * Representa: "Nome do projeto", "version", "autor" e etc...
 */
export interface IProjectConfigurations extends IBasicFields {
    id: string | undefined;
    name: string;
    label: string;
    autor: string;
    version: string;
    type: ProjectType;
    createdDate: Date;
    updatedDate: Date;
    description: string;
    currentProcess: string;
    currentPlatformVersion: string;
}

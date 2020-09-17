import { IBasicFields } from "./IBasicFields";
import { EProjectType } from "./../../enuns";

/**
 * Exclusivamente utilizada na configuração do projeto,
 * em informações que definem o tipo de projeto.
 * 
 * Representa: "Nome do projeto", "version", "autor" e etc...
 */
export interface IProjectConfigurations extends IBasicFields {
    author: string;
    version: string;
    type: EProjectType;
    createdDate: Date;
    updatedDate: Date;
    currentProcess: string;
    currentPlatformVersion: string;
}

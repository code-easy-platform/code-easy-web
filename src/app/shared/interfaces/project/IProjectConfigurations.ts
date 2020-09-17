import { IBasicConfigurations } from "./IBasicConfigurations";
import { EProjectType } from "./../../enuns";

/**
 * Exclusively used in the project configuration.
 */
export interface IProjectConfigurations extends IBasicConfigurations<EProjectType> {
    /**
     * Project creator
     */
    author: string;
    /**
     * Current version of the project
     */
    version: string;
    /**
     * Version of the platform on which the project was created
     */
    createdInPlatformVersion: string;
    /**
     * Platform version since last change
     */
    currentPlatformVersion: string;
}

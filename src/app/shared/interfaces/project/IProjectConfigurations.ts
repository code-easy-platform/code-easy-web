import { IObservable } from "react-observing";

import { IBasicConfigurations } from "./IBasicConfigurations";
import { EProjectType } from "./../../enuns";

/**
 * Exclusively used in the project configuration.
 */
export interface IProjectConfigurations extends IBasicConfigurations<EProjectType> {
    /**
     * Project creator
     */
    author: IObservable<string>;
    /**
     * Current version of the project
     */
    version: IObservable<string>;
    /**
     * Version of the platform on which the project was created
     */
    createdInPlatformVersion: IObservable<string>;
    /**
     * Platform version since last change
     */
    currentPlatformVersion: IObservable<string>;
}

import { IObservable } from "react-observing";

import { IFileToDownloadAsZip } from "./../../IFileToDownloadAsZip";
import { IProperty } from "./../../../components/external";
import { ITab } from "./ITab";

/**
 * Represents a full project structure
 */
export interface IProject {
  /**
   * Store all properties to the project
   */
  properties: IObservable<IProperty[]>;
  /**
   * Used to separate routes, actions, data and etc...
   */
  tabs: IObservable<ITab[]>;
  /**
   * Allow export the project as files
   */
  exportAsFiles: () => Promise<IFileToDownloadAsZip>;
}

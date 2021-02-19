import { IObservable, observe } from "react-observing";

import { IFileToDownloadAsZip, IProject, ITab } from "./../../../interfaces";
import { ProjectConfigurations } from "./ProjectConfigurations";
import { IProperty } from "./../../../components/external";
import { EProjectType, ETabType } from "./../../../enuns";
import { TabAction, TabData, TabRoute } from "./../tabs";
import { Tab } from "./Tab";

/**
 * Fields passeds in constructor
 */
interface IConstructor {
  properties: IProperty[];
  type: EProjectType;
  tabs: ITab[];
  id?: string;
}

/**
 * Represents a full project
 */
export abstract class Project extends ProjectConfigurations implements IProject {
  public tabs: IObservable<Tab[]>;

  constructor(props: IConstructor) {
    super(props);

    this.tabs = observe(props.tabs.map(tab => {
      switch (tab.type.value) {
        case ETabType.tabRoutes:
          return new TabRoute(this, {
            id: tab.id.value,
            items: tab.items.value,
            properties: tab.properties.value || [],
          });
        case ETabType.tabActions:
          return new TabAction(this, {
            id: tab.id.value,
            items: tab.items.value,
            properties: tab.properties.value || [],
          });
        case ETabType.tabDatas:
          return new TabData(this, {
            id: tab.id.value,
            items: tab.items.value,
            properties: tab.properties.value || [],
          });
        default:
          //TODO: Ajustar
          return new TabData(this, {
            id: tab.id.value,
            items: tab.items.value,
            properties: tab.properties.value || [],
          });
      }
    }));
  }

  public async exportAsFiles(): Promise<IFileToDownloadAsZip> {
    return {
      children: [],
      isFolder: true,
      name: this.name.value,
    };
  }
}

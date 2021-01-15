import { IObservable, observe } from "react-observing";

import { ProjectConfigurations } from "./ProjectConfigurations";
import { IProperty } from "./../../components/external";
import { IProject, ITab } from "./../../interfaces";
import { EProjectType } from "./../../enuns";
import { Tab } from "./generic";

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
export class Project extends ProjectConfigurations implements IProject {
  public tabs: IObservable<Tab[]> = observe<Tab[]>([]);

  constructor(props: IConstructor) {
    super(props);

    this.tabs = observe(props.tabs.map(tab => new Tab({
      id: tab.id.value,
      type: tab.type.value,
      items: tab.items.value,
      properties: tab.properties.value || [],
    })));
  }
}

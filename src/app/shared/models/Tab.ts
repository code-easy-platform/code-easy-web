import { IObservable, observe } from "react-observing";

import { BasicConfigurations } from "./BasicConfigurations";
import { ITreeItemComponent, ITab } from "./../interfaces";
import { TreeItemComponent } from "./TreeItemComponent";
import { IProperty } from "./../components/external";
import { EComponentType } from "./../enuns";

/**
 * Fields passeds in constructor
 */
interface IConstructor {
  items: ITreeItemComponent[];
  properties?: IProperty[];
  type: EComponentType;
  id?: string;
}

/**
 * Represents a full Tab implementation
 */
export class Tab extends BasicConfigurations<EComponentType> implements ITab {
  public items: IObservable<TreeItemComponent[]> = observe<TreeItemComponent[]>([]);

  constructor(props: IConstructor) {
    super(props);
    this.items = observe(props.items.map(item => new TreeItemComponent({
      properties: item.properties.value,
      items: item.items.value,
      type: item.type.value,
      id: item.id.value,
    })));
  }
}

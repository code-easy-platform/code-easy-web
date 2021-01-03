import { IObservable, observe } from "react-observing";

import { BasicConfigurations } from "./BasicConfigurations";
import { ITreeItemComponent, ITab } from "./../interfaces";
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
  public items: IObservable<ITreeItemComponent[]> = observe<ITreeItemComponent[]>([]);

  constructor(props: IConstructor) {
    super(props);
    this.items = observe(props.items);
  }
}

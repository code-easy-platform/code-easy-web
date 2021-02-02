import { IObservable, observe } from "react-observing";
import { Utils } from "code-easy-components";

import { FlowItemAction, FlowItemAssign, FlowItemComment, FlowItemEnd, FlowItemForeach, FlowItemIf, FlowItemStart, FlowItemSwitch } from "../flow-items";
import { EItemType, IProperty, TypeOfValues } from "./../../../components/external";
import { IFlowItemComponent, ITreeItemComponent } from "./../../../interfaces";
import { EComponentType, PropertieTypes } from "./../../../enuns";
import { BasicConfigurations } from "../BasicConfigurations";
import { FlowItemComponent } from "./FlowItemComponent";

/**
 * Fields passeds in constructor
 */
interface IConstructor<T> {
  items?: IFlowItemComponent[];
  properties: IProperty[];
  id?: string;
  type: T;
}

/**
 * Represents a full tree item implementation
 */
export class TreeItemComponent<T extends EComponentType = EComponentType> extends BasicConfigurations<T> implements ITreeItemComponent<T> {
  public items: IObservable<FlowItemComponent[]> = observe([]);

  public get ascendantId() {
    let prop = this.properties.value.find(prop => prop.propertieType.value === PropertieTypes.ascendantId)?.value;
    if (prop) {
      return prop;
    }

    prop = observe(undefined);

    this.properties.value = [
      ...this.properties.value,
      {
        value: prop,
        id: observe(Utils.getUUID()),
        type: observe(TypeOfValues.hidden),
        name: observe(PropertieTypes.ascendantId),
        propertieType: observe(PropertieTypes.ascendantId),

        group: observe(undefined),
        suggestions: observe(undefined),
        information: observe(undefined),
        fileMaxSize: observe(undefined),
        nameHasError: observe(undefined),
        valueHasError: observe(undefined),
        focusOnRender: observe(undefined),
        nameHasWarning: observe(undefined),
        valueHasWarning: observe(undefined),
        nameSuggestions: observe(undefined),
        editNameDisabled: observe(undefined),
        onPickerNameClick: observe(undefined),
        editValueDisabled: observe(undefined),
        onPickerValueClick: observe(undefined),
      }
    ];

    return prop;
  }

  constructor(props: IConstructor<T>) {
    super(props);

    if (props.items) {
      this.items = observe(props.items.map(item => {
        switch (item.type.value) {
          case EItemType.ACTION:
            return new FlowItemAction({
              id: item.id.value,
              connections: item.connections.value,
              properties: item.properties.value || [],
            });
          case EItemType.ASSIGN:
            return new FlowItemAssign({
              id: item.id.value,
              connections: item.connections.value,
              properties: item.properties.value || [],
            });
          case EItemType.COMMENT:
            return new FlowItemComment({
              id: item.id.value,
              connections: item.connections.value,
              properties: item.properties.value || [],
            });
          case EItemType.END:
            return new FlowItemEnd({
              id: item.id.value,
              properties: item.properties.value || [],
            });
          case EItemType.FOREACH:
            return new FlowItemForeach({
              id: item.id.value,
              connections: item.connections.value,
              properties: item.properties.value || [],
            });
          case EItemType.IF:
            return new FlowItemIf({
              id: item.id.value,
              connections: item.connections.value,
              properties: item.properties.value || [],
            });
          case EItemType.START:
            return new FlowItemStart({
              id: item.id.value,
              connections: item.connections.value,
              properties: item.properties.value || [],
            });
          case EItemType.SWITCH:
            return new FlowItemSwitch({
              id: item.id.value,
              connections: item.connections.value,
              properties: item.properties.value || [],
            });
          default:
            return new FlowItemComponent({
              id: item.id.value,
              type: item.type.value,
              connections: item.connections.value,
              properties: item.properties.value || [],
            });
        }
      }));
    }
  }
}

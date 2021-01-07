import { IObservable, observe, set, transform } from "react-observing";
import { Utils } from "code-easy-components";

import { IFlowItemComponent, ITreeItemComponent } from "./../interfaces";
import { IProperty, TypeOfValues } from "./../components/external";
import { EComponentType, PropertieTypes } from "./../enuns";
import { BasicConfigurations } from "./BasicConfigurations";
import { FlowItemComponent } from "./FlowItemComponent";
import { PropertiesEditorStore } from "../stores";
import { openModal } from "../services";

/**
 * Fields passeds in constructor
 */
interface IConstructor {
  items: IFlowItemComponent[];
  properties: IProperty[];
  type: EComponentType;
  id?: string;
}

/**
 * Represents a full Tab implementation
 */
export class TreeItemComponent extends BasicConfigurations<EComponentType> implements ITreeItemComponent {
  public items: IObservable<IFlowItemComponent[]>;

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

  public get isSelected(): IObservable<boolean> {
    const handleSelect = (value: boolean): boolean => {
      if (value) {
        set(PropertiesEditorStore, {
          id: this.id,
          name: this.label,
          subname: this.type,
          properties: this.properties.value.map(prop => {
              return {
                ...prop,
                onPickerValueClick: observe(() => openModal(prop.id.value || ''))
              };
            })
        });
      }
      return value;
    }

    return transform(super.isSelected, value => value, handleSelect);
  }

  constructor(props: IConstructor) {
    super(props);

    this.items = observe(props.items.map(item => new FlowItemComponent({
      id: item.id.value,
      type: item.type.value,
      connections: item.connections.value,
      properties: item.properties.value || [],
    })));
  }
}

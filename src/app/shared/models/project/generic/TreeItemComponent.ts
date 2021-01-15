import { IObservable, observe, set, transform } from "react-observing";
import { Utils } from "code-easy-components";

import { flowItemsStore, PropertiesEditorStore, tabListStore } from "./../../../stores";
import { IFlowItemComponent, ITreeItemComponent } from "./../../../interfaces";
import { IProperty, TypeOfValues } from "./../../../components/external";
import { EComponentType, PropertieTypes } from "./../../../enuns";
import { BasicConfigurations } from "../BasicConfigurations";
import { FlowItemComponent } from "./FlowItemComponent";
import { openModal } from "./../../../services";

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
      if (value && PropertiesEditorStore.value?.id.value !== this.id.value) {
        set(PropertiesEditorStore, {
          id: this.id,
          name: this.label,
          subname: transform(this.type, value => String(value)),
          properties: transform(this.properties, properties => properties.map(prop => {
            return {
              ...prop,
              onPickerValueClick: observe(() => openModal(prop.id.value || ''))
            };
          }))
        });
      }
      return value;
    }

    return transform(super.isSelected, value => value, handleSelect);
  }

  public get isEditing(): IObservable<boolean> {
    const handleEdit = (value: boolean): boolean => {
      if (value) {
        tabListStore.addTab({
          icon: this.icon,
          title: this.label,
          hasError: this.hasError,
          isSelected: this.isEditing,
          hasWarning: this.hasWarning,
          description: this.description,
          id: transform(this.id, id => String(id), id => id),
        });

        flowItemsStore.next({
          items: this.items,
          itemId: this.id,
        });
      }

      return value;
    }

    return transform(super.isEditing, value => value, handleEdit);
  }

  constructor(props: IConstructor<T>) {
    super(props);

    if (props.items) {
      this.items = observe(props.items.map(item => new FlowItemComponent({
        id: item.id.value,
        type: item.type.value,
        connections: item.connections.value,
        properties: item.properties.value || [],
      })));
    } else {
      this.items = observe([]);
    }
  }
}

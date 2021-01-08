import { IObservable, observe, set, transform } from "react-observing";
import { IconFlowEnd, IconFlowStart, Utils } from "code-easy-components";

import { FlowItemsStore, PropertiesEditorStore, WindowsStore } from "../stores";
import { IFlowItemComponent, ITreeItemComponent } from "./../interfaces";
import { EItemType, IProperty, TypeOfValues } from "./../components/external";
import { EComponentType, PropertieTypes } from "./../enuns";
import { BasicConfigurations } from "./BasicConfigurations";
import { FlowItemComponent } from "./FlowItemComponent";
import { openModal } from "../services";

/**
 * Fields passeds in constructor
 */
interface IConstructor {
  items?: IFlowItemComponent[];
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
      if (value && PropertiesEditorStore.value?.id.value !== this.id.value) {
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

  public get isEditing(): IObservable<boolean> {
    const handleEdit = (value: boolean): boolean => {
      if (value) {
        if (!WindowsStore.value.some(window => window.id.value === this.id.value)) {
          set(WindowsStore, oldWindows => {
            return [
              ...oldWindows,
              {
                icon: this.icon,
                title: this.label,
                hasError: this.hasError,
                isSelected: this.isEditing,
                hasWarning: this.hasWarning,
                description: this.description,
                id: transform(this.id, id => String(id), id => id),
              }
            ];
          });
        }

        set(FlowItemsStore, {
          treeItemId: this.id.value,
          items: this.items,
        });
      }

      return value;
    }

    return transform(super.isEditing, value => value, handleEdit);
  }

  constructor(props: IConstructor) {
    super(props);

    if (props.items) {
      this.items = observe(props.items.map(item => new FlowItemComponent({
        id: item.id.value,
        type: item.type.value,
        connections: item.connections.value,
        properties: item.properties.value || [],
      })));
    } else if (props.type !== EComponentType.routerConsume) {
      this.items = observe([
        new FlowItemComponent({
          id: '1',
          type: EItemType.START,
          connections: [{ id: observe(Utils.getUUID()), targetId: observe('2'), originId: observe('1'), isSelected: observe(false), connectionDescription: observe(''), connectionLabel: observe('') }],
          properties: [
            {
              id: observe(Utils.getUUID()),
              value: observe(EItemType.START),
              type: observe(TypeOfValues.string),
              name: observe(PropertieTypes.label),
              propertieType: observe(PropertieTypes.label),

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
            },
            {
              id: observe(Utils.getUUID()),
              name: observe(PropertieTypes.top),
              type: observe(TypeOfValues.hidden),
              value: observe(Math.round(128 / 15) * 15),
              propertieType: observe(PropertieTypes.top),

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
            },
            {
              value: observe(100),
              id: observe(Utils.getUUID()),
              type: observe(TypeOfValues.hidden),
              name: observe(PropertieTypes.left),
              propertieType: observe(PropertieTypes.left),

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
            },
            {
              id: observe(Utils.getUUID()),
              value: observe(IconFlowStart),
              type: observe(TypeOfValues.binary),
              name: observe(PropertieTypes.icon),
              propertieType: observe(PropertieTypes.icon),

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
            },
          ],
        }),
        new FlowItemComponent({
          id: '2',
          connections: [],
          type: EItemType.END,
          properties: [
            {
              id: observe(Utils.getUUID()),
              value: observe(EItemType.END),
              type: observe(TypeOfValues.string),
              name: observe(PropertieTypes.label),
              propertieType: observe(PropertieTypes.label),

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
            },
            {
              value: observe(IconFlowEnd),
              id: observe(Utils.getUUID()),
              type: observe(TypeOfValues.binary),
              name: observe(PropertieTypes.icon),
              propertieType: observe(PropertieTypes.icon),

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
            },
            {
              value: observe(100),
              id: observe(Utils.getUUID()),
              type: observe(TypeOfValues.hidden),
              name: observe(PropertieTypes.left),
              propertieType: observe(PropertieTypes.left),

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
            },
            {
              id: observe(Utils.getUUID()),
              name: observe(PropertieTypes.top),
              type: observe(TypeOfValues.hidden),
              value: observe(Math.round(328 / 15) * 15),
              propertieType: observe(PropertieTypes.top),

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
            },
          ],
        })
      ]);
    } else {
      this.items = observe([]);
    }
  }
}

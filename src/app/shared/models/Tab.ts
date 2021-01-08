import { IObservable, observe, set, transform } from "react-observing";
import { Utils } from "code-easy-components";

import { FlowItemsStore, PropertiesEditorStore, WindowsStore } from "../stores";
import { IProperty, TypeOfValues } from "./../components/external";
import { BasicConfigurations } from "./BasicConfigurations";
import { EComponentType, PropertieTypes } from "./../enuns";
import { ITreeItemComponent, ITab } from "./../interfaces";
import { TreeItemComponent } from "./TreeItemComponent";
import { openModal } from "../services";

/**
 * Fields passeds in constructor
 */
interface IConstructor {
  items: ITreeItemComponent[];
  properties: IProperty[];
  type: EComponentType;
  id?: string;
}

/**
 * Represents a full Tab implementation
 */
export class Tab extends BasicConfigurations<EComponentType> implements ITab {
  public items: IObservable<TreeItemComponent[]>;

  public addItem(label: string, type: EComponentType, ascendantId?: string) {
    set(this.items, oldItems => {

      oldItems.forEach(oldItem => {
        set(oldItem.isEditing, false);
        set(oldItem.isSelected, false);
      });

      const newTreeItem = new TreeItemComponent({
        type,
        properties: [
          {
            value: observe(label),
            id: observe(Utils.getUUID()),
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
            value: observe(''),
            id: observe(Utils.getUUID()),
            type: observe(TypeOfValues.bigstring),
            name: observe(PropertieTypes.description),
            propertieType: observe(PropertieTypes.description),

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
            value: observe(true),
            id: observe(Utils.getUUID()),
            type: observe(TypeOfValues.hidden),
            name: observe(PropertieTypes.isSelected),
            propertieType: observe(PropertieTypes.isSelected),

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
            value: observe(true),
            id: observe(Utils.getUUID()),
            type: observe(TypeOfValues.hidden),
            name: observe(PropertieTypes.isExpanded),
            propertieType: observe(PropertieTypes.isExpanded),

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
            type: observe(TypeOfValues.hidden),
            name: observe(PropertieTypes.isEditing),
            propertieType: observe(PropertieTypes.isEditing),
            value: observe(type !== EComponentType.routerConsume),

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
            value: observe(ascendantId),
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
          },
        ]
      });

      // Show new item in the properties editor
      set(PropertiesEditorStore, {
        id: newTreeItem.id,
        name: newTreeItem.label,
        subname: newTreeItem.type,
        properties: newTreeItem.properties.value.map(prop => {
          return {
            ...prop,
            onPickerValueClick: observe(() => openModal(prop.id.value || ''))
          };
        })
      });

      // Show new item in the tabs
      set(WindowsStore, oldWindows => {
        return [
          ...oldWindows,
          {
            icon: newTreeItem.icon,
            title: newTreeItem.label,
            hasError: newTreeItem.hasError,
            isSelected: newTreeItem.isEditing,
            hasWarning: newTreeItem.hasWarning,
            description: newTreeItem.description,
            id: transform(newTreeItem.id, id => String(id), id => id),
          }
        ];
      });

      // Show new item in the flow editor
      set(FlowItemsStore, {
        treeItemId: newTreeItem.id.value,
        items: newTreeItem.items,
      });

      return [
        ...oldItems,
        newTreeItem,
      ];
    })
  }

  constructor(props: IConstructor) {
    super(props);

    this.items = observe(
      props.items.map(item => new TreeItemComponent({
        properties: item.properties.value || [],
        items: item.items.value,
        type: item.type.value,
        id: item.id.value,
      }))
    );
  }
}

import { IObservable, observe, set, transform } from "react-observing";

import { FlowItemsStore, PropertiesEditorStore, WindowsStore } from "./../../stores";
import { BasicConfigurations } from "./../BasicConfigurations";
import { ITreeItemComponent, ITab } from "./../../interfaces";
import { EComponentType, ETabType } from "./../../enuns";
import { IProperty } from "./../../components/external";
import { TreeItemComponent } from "./TreeItemComponent";
import { openModal } from "./../../services";

/**
 * Fields passeds in constructor
 */
interface IConstructor<T> {
  items: ITreeItemComponent[];
  properties: IProperty[];
  id?: string;
  type: T;
}

/**
 * Represents a full Tab implementation
 */
export class Tab<T = ETabType> extends BasicConfigurations<T> implements ITab<T> {
  public items: IObservable<TreeItemComponent[]>;

  public addItem(newTreeItem: TreeItemComponent) {
    set(this.items, oldItems => {

      switch (newTreeItem.type.value) {
        case EComponentType.grouper:
          oldItems.forEach(oldItem => set(oldItem.isSelected, false));

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
          break;

        default:
          oldItems.forEach(oldItem => {
            set(oldItem.isEditing, false);
            set(oldItem.isSelected, false);
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
          break;
      }

      return [
        ...oldItems,
        newTreeItem,
      ];
    })
  }

  constructor(props: IConstructor<T>) {
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

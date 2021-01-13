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
            properties: transform(newTreeItem.properties, properties => properties.map(prop => {
              return {
                ...prop,
                onPickerValueClick: observe(() => openModal(prop.id.value || ''))
              };
            }))
          });
          break;
        case EComponentType.routeConsume:
          oldItems.forEach(oldItem => set(oldItem.isSelected, false));

          // Show new item in the properties editor
          set(PropertiesEditorStore, {
            id: newTreeItem.id,
            name: newTreeItem.label,
            subname: newTreeItem.type,
            properties: transform(newTreeItem.properties, properties => properties.map(prop => {
              return {
                ...prop,
                onPickerValueClick: observe(() => openModal(prop.id.value || ''))
              };
            }))
          });
          break;
        case EComponentType.inputVariable:
          oldItems.forEach(oldItem => set(oldItem.isSelected, false));

          // Show new item in the properties editor
          set(PropertiesEditorStore, {
            id: newTreeItem.id,
            name: newTreeItem.label,
            subname: newTreeItem.type,
            properties: transform(newTreeItem.properties, properties => properties.map(prop => {
              return {
                ...prop,
                onPickerValueClick: observe(() => openModal(prop.id.value || ''))
              };
            }))
          });
          break;
        case EComponentType.localVariable:
          oldItems.forEach(oldItem => set(oldItem.isSelected, false));

          // Show new item in the properties editor
          set(PropertiesEditorStore, {
            id: newTreeItem.id,
            name: newTreeItem.label,
            subname: newTreeItem.type,
            properties: transform(newTreeItem.properties, properties => properties.map(prop => {
              return {
                ...prop,
                onPickerValueClick: observe(() => openModal(prop.id.value || ''))
              };
            }))
          });
          break;
        case EComponentType.outputVariable:
          oldItems.forEach(oldItem => set(oldItem.isSelected, false));

          // Show new item in the properties editor
          set(PropertiesEditorStore, {
            id: newTreeItem.id,
            name: newTreeItem.label,
            subname: newTreeItem.type,
            properties: transform(newTreeItem.properties, properties => properties.map(prop => {
              return {
                ...prop,
                onPickerValueClick: observe(() => openModal(prop.id.value || ''))
              };
            }))
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
            properties: transform(newTreeItem.properties, properties => properties.map(prop => {
              return {
                ...prop,
                onPickerValueClick: observe(() => openModal(prop.id.value || ''))
              };
            }))
          });

          // Show new item in the tabs
          set(WindowsStore, oldWindows => {
            oldWindows.forEach(oldWindow => {
              set(oldWindow.isSelected, false);
            });
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
    });
  }

  public removeItem(itemId: string) {

    // Remove all dependents items
    const removeRecursive = (itemId: string, items: TreeItemComponent[]): TreeItemComponent[] => {
      const dependents = items.filter(item => item.ascendantId.value === itemId);

      dependents.forEach(item => {
        if (item.id.value) {
          items = removeRecursive(item.id.value, items);
        }
      });

      // Show new item in the tabs
      set(WindowsStore, oldWindows => {
        return oldWindows.filter(oldWindow => oldWindow.id.value !== itemId);
      });

      // Show new item in the properties editor
      if (PropertiesEditorStore.value?.id.value === itemId) {
        set(PropertiesEditorStore, undefined);
      }

      // Show new item in the flow editor
      if (FlowItemsStore.value?.treeItemId === itemId) {
        set(FlowItemsStore, {
          treeItemId: undefined,
          items: observe([]),
        });
      }

      return items.filter(item => item.id.value !== itemId);
    }

    // Remove the item by their id
    set(this.items, oldItems => removeRecursive(itemId, oldItems));
  }
}

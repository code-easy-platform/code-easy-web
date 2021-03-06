import { IObservable, observe, set } from "react-observing";

import { TreeItemFolder, TreeItemGlobalAction, TreeItemInputVariable, TreeItemLocalVariable, TreeItemOutpuVariable, TreeItemRouterConsume, TreeItemRouterExpose, TreeItemExtension, TreeItemLocalAction } from "../tree-items";
import { ITreeItemComponent, ITab } from "./../../../interfaces";
import { BasicConfigurations } from "./../BasicConfigurations";
import { EComponentType, ETabType } from "./../../../enuns";
import { IProperty } from "./../../../components/external";
import { TreeItemComponent } from "./TreeItemComponent";
import { Project } from "./Project";

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
export abstract class Tab<T extends ETabType = ETabType> extends BasicConfigurations<T> implements ITab<T> {
  public items: IObservable<TreeItemComponent[]>;

  constructor(public projectParent: Project | undefined, props: IConstructor<T>) {
    super(props);

    this.items = observe(
      props.items.map(item => {
        switch (item.type.value) {
          case EComponentType.extension:
            return new TreeItemExtension(this, {
              properties: item.properties.value || [],
              id: item.id.value,
            });
          case EComponentType.globalAction:
            return new TreeItemGlobalAction(this, {
              properties: item.properties.value || [],
              items: item.items.value,
              id: item.id.value,
            });
          case EComponentType.grouper:
            return new TreeItemFolder(this, {
              properties: item.properties.value || [],
              id: item.id.value,
            });
          case EComponentType.inputVariable:
            return new TreeItemInputVariable(this, {
              properties: item.properties.value || [],
              id: item.id.value,
            });
          case EComponentType.localAction:
            return new TreeItemLocalAction(this, {
              properties: item.properties.value || [],
              items: item.items.value,
              id: item.id.value,
            });
          case EComponentType.localVariable:
            return new TreeItemLocalVariable(this, {
              properties: item.properties.value || [],
              id: item.id.value,
            });
          case EComponentType.outputVariable:
            return new TreeItemOutpuVariable(this, {
              properties: item.properties.value || [],
              id: item.id.value,
            });
          case EComponentType.routeConsume:
            return new TreeItemRouterConsume(this, {
              properties: item.properties.value || [],
              id: item.id.value,
            });
          case EComponentType.routeExpose:
            return new TreeItemRouterExpose(this, {
              properties: item.properties.value || [],
              items: item.items.value,
              id: item.id.value,
            });

          default:
            return new TreeItemComponent(this, {
              properties: item.properties.value || [],
              items: item.items.value,
              type: item.type.value,
              id: item.id.value,
            });
        }
      })
    );
  }

  public addItem(newTreeItem: TreeItemComponent) {
    this.items.value.forEach(item => set(item.isSelected, false));
    set(this.items, oldItems => [...oldItems, newTreeItem]);
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

      return items.filter(item => item.id.value !== itemId);
    }

    // Remove the item by their id
    set(this.items, oldItems => removeRecursive(itemId, oldItems));
  }
}

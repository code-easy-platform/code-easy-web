import { useCallback, useContext } from "react";

import { CodeEditorContext, ICodeEditorContext } from "../contexts";
import { TreeItemComponent } from "../models";
import { AssetsService } from "../services";
import { EComponentType } from "../enuns";


export const useEditorContext = () => {
  const { project, setProject } = useContext<ICodeEditorContext>(CodeEditorContext);

  const handleGetItemTreeEditing = useCallback((): TreeItemComponent | null => {
    let itemTree: TreeItemComponent | null = null;

    project.tabs.value.forEach(tab => {
      const resItemTree = tab.items.value.find(itemTree => itemTree.isEditing);
      if (resItemTree) {
        itemTree = new TreeItemComponent({
          properties: resItemTree.properties.value,
          items: resItemTree.items.value,
          type: resItemTree.type.value,
          id: resItemTree.id.value,
        });
      }
    });

    return itemTree;
  }, [project.tabs]);

  const handleGetItemTreeById = useCallback((id: string, type?: EComponentType): TreeItemComponent | null => {
    if (type) {
      const tab = project.tabs.value.find(tab => tab.type.value === type);
      if (!tab) return null;

      const itemTree = tab.items.value.find(itemTree => itemTree.id.value === id);
      if (!itemTree) return null;

      return new TreeItemComponent({
        properties: itemTree.properties.value,
        items: itemTree.items.value,
        type: itemTree.type.value,
        id: itemTree.id.value,
      });
    } else {
      let itemTree: TreeItemComponent | null = null;

      project.tabs.value.forEach(tab => {
        const resItemTree = tab.items.value.find(itemTree => itemTree.id.value === id);
        if (resItemTree) {
          itemTree = new TreeItemComponent({
            properties: resItemTree.properties.value,
            items: resItemTree.items.value,
            type: resItemTree.type.value,
            id: resItemTree.id.value,
          });;
        }
      });

      return itemTree;
    }
  }, [project.tabs]);

  const handleGetItemTreeByName = useCallback((name: string, type?: EComponentType): TreeItemComponent | null => {
    if (type) {
      const tab = project.tabs.value.find(tab => tab.type.value === type);
      if (!tab) return null;

      const itemTree = tab.items.value.find(itemTree => itemTree.name.value === name);
      if (!itemTree) return null;

      return new TreeItemComponent({
        properties: itemTree.properties.value,
        items: itemTree.items.value,
        type: itemTree.type.value,
        id: itemTree.id.value,
      });;
    } else {
      let itemTree: TreeItemComponent | null = null;

      project.tabs.value.forEach(tab => {
        const resItemTree = tab.items.value.find(itemTree => itemTree.name.value === name);
        if (resItemTree) {
          itemTree = new TreeItemComponent({
            properties: resItemTree.properties.value,
            items: resItemTree.items.value,
            type: resItemTree.type.value,
            id: resItemTree.id.value,
          });;
        }
      });

      return itemTree;
    }
  }, [project.tabs]);

  const handleGetIconByItemId = useCallback((id: string): TreeItemComponent | null => {
    let icon: any = undefined;

    project.tabs.value.forEach(tab => {
      const resItemTree = tab.items.value.find(itemTree => itemTree.id.value === id);
      if (resItemTree) {
        icon = resItemTree.icon.value.content;
        if (!icon) {
          icon = AssetsService.getIcon(resItemTree.type);
        }
      }
    });

    return icon;
  }, [project.tabs]);

  return {
    /**
     * @returns `ItemComponent` | `null` - Returns the tree element that is currently being edited or null
     */
    getItemTreeEditing: handleGetItemTreeEditing,
    /**
     * Return a item tree by there id and type
     * 
     * @param id Identifier of the item tree 
     * @param type Tab where the item is. Can be: `tabActions`, `tabDates` and `tabRoutes`.
     */
    getItemTreeById: handleGetItemTreeById,
    /**
     * Return a item tree by there name and type
     * 
     * @param name Name of the item tree 
     * @param type Tab where the item is. Can be: `tabActions`, `tabDates` and `tabRoutes`.
     */
    getItemTreeByName: handleGetItemTreeByName,
    getIconByItemId: handleGetIconByItemId,
    setProject,
    project,
  };
}
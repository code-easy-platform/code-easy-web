import { useEffect, useState } from "react";
import { ISubscription, transform, useObserverValue } from "react-observing";

import { useEditorContext } from "./useEditorContext";
import { IOpenedWindow } from "../interfaces";

export const useWindows = () => {
  const [windows, setWindows] = useState<IOpenedWindow[]>([]);

  const { project } = useEditorContext();
  const tabs = useObserverValue(project.tabs);

  useEffect(() => {
    const subscriptions: ISubscription[] = [];

    tabs.forEach(tab => {
      tab.items.value.forEach(item => {
        if (item.isEditing.value) {
          if (windows.some(window => window.id.value === item.id.value)) {
            return;
          }

          setWindows(oldWindows => [
            ...oldWindows,
            {
              title: item.label,
              hasError: item.hasError,
              hasWarning: item.hasWarning,
              isSelected: item.isSelected,
              description: item.description,
              id: transform(item.id, id => String(id), id => id),
            }
          ]);
        }
      });
    });

    tabs.forEach(tab => {
      subscriptions.push(tab.items.subscribe(items => {
        items.forEach(item => {
          subscriptions.push(item.isEditing.subscribe(isEditing => {
            if (isEditing) {
              if (windows.some(window => window.id.value === item.id.value)) {
                return;
              }

              setWindows(oldWindows => [
                ...oldWindows,
                {
                  title: item.label,
                  hasError: item.hasError,
                  hasWarning: item.hasWarning,
                  isSelected: item.isSelected,
                  description: item.description,
                  id: transform(item.id, id => String(id), id => id),
                }
              ]);

            } else {
              setWindows(oldWindows => {
                oldWindows.splice(oldWindows.findIndex(window => window.id.value === item.id.value), 1);
                return oldWindows;
              });
            }
          }));
        });
      }));
    });

    return () => subscriptions.forEach(subs => subs?.unsubscribe())
  }, [tabs, windows]);

  return windows;
}

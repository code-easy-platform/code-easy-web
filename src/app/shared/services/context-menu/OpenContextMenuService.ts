import { set } from "react-observing"

import { IContextItemList } from "../../interfaces";
import { ContextMenuStore } from "../../stores";

export const openContextMenu = (left: number, top: number, actions: IContextItemList[]) => {
  set(ContextMenuStore, {
    isShow: true,
    actions,
    left,
    top
  });
}

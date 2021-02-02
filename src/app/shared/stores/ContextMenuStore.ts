import { observe } from 'react-observing';

import { IContextMenu } from '../interfaces';

export const ContextMenuStore = observe<IContextMenu>({
  isShow: false,
  actions: [],
  left: -100,
  top: -100,
});

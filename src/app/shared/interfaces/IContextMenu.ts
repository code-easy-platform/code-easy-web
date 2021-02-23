export interface IContextItemList {
  icon?: any;
  label: string;
  disabled?: boolean;
  action?: () => void;
  useConfirmation?: boolean;
  confirmationMessage?: string;
}

export interface IContextMenu {
  actions: IContextItemList[],
  isShow: boolean,
  left: number,
  top: number,
}

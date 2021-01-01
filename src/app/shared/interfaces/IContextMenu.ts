export interface IContextItemList {
  icon?: any;
  label: string;
  action(): any;
  disabled?: boolean;
  useConfirmation?: boolean;
  confirmationMessage?: string;
}

export interface IContextMenu {
  actions: IContextItemList[],
  isShow: boolean,
  left: number,
  top: number,
}

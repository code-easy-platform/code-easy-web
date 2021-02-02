import { set } from "react-observing"

import { ModalListStore } from "../../stores";

export const openModal = (modalId: string) => {
  set(ModalListStore, oldModals => [...oldModals, modalId]);
}

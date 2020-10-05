import { atom } from "recoil";
import { LocalStorageService } from "../local-storage/LocalStorage";

export const InputWidthStore = atom<number>({
    key: 'input-width',
    default: LocalStorageService.getInputsWidth(),
});

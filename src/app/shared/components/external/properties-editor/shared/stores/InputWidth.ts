import { observe } from "react-observing";

import { LocalStorageService } from "../local-storage/LocalStorage";

export const InputWidthStore = observe(LocalStorageService.getInputsWidth());

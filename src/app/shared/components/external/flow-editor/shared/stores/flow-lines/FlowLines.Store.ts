import { atom } from "recoil";

import { ILine } from "./../../interfaces";

export const FlowLinesStore = atom<ILine[]>({
    key: 'flow-lines',
    default: [],
});

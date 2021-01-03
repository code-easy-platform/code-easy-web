import { observe } from "react-observing";

import { ECurrentFocus } from "../enuns";

export const CurrentFocusStore = observe<ECurrentFocus>(ECurrentFocus.flow);

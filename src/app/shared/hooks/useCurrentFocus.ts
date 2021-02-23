import { useContext } from "react";
import { set } from "react-observing";

import { CurrentFocusContext } from "../contexts";
import { ECurrentFocus } from "../enuns";

export const useCurrentFocus = () => {
    const observable = useContext(CurrentFocusContext);

    return {
        currentFocusStore: observable,
        setCurrentFocus: (value: ECurrentFocus) => set(observable, value)
    };
}

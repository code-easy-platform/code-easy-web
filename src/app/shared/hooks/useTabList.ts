import { useContext } from "react";
import { TabListContext } from "../contexts";

export const useTabList = () => {
    return {
        tabListStore: useContext(TabListContext),
    };
}

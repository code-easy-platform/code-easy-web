import { useContext } from "react";
import { useObserverValue } from "react-observing";

import { CodeEditorContext, ICodeEditorContext } from "../contexts";

export const useEditorContext = () => {
  const { project } = useContext<ICodeEditorContext>(CodeEditorContext);
  const tabs = useObserverValue(project.tabs);

  return {
    project,
    tabs,
  };
}

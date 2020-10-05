import { useContext } from "react";

import { ConfigurationContext } from "../contexts";

export const useConfigs = () => useContext(ConfigurationContext).configs;

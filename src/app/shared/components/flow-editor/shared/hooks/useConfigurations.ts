import { useContext } from "react";

import { ConfigurationContext } from "../contexts/Configurations";

export const useConfigs = () => useContext(ConfigurationContext).configs;

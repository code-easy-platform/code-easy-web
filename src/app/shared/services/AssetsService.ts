import { ComponentType } from "../enuns/ComponentType";
import { ItemType } from "../components/code-editor/models/ItemFluxo";

import icon_output_param from './../../assets/icons/icon-output-param.png';
import icon_local_param from './../../assets/icons/icon-local-param.png';
import icon_input_param from './../../assets/icons/icon-input-param.png';
import icon_router from './../../assets/icons/icon-router.png';
import icon_action from './../../assets/icons/icon-action.png';
import icon_folder from './../../assets/icons/icon-folder.png';


class Assets {
    public getIcon(type: ComponentType | ItemType): string {
        switch (type) {
            case ComponentType.router:
                return icon_router;

            case ComponentType.globalAction:
                return icon_action;

            case ComponentType.localAction:
                return icon_action;

            case ComponentType.grouper:
                return icon_folder;

            case ComponentType.inputVariable:
                return icon_input_param;

            case ComponentType.localVariable:
                return icon_local_param;

            case ComponentType.outputVariable:
                return icon_output_param;

            default:
                return '';
        }

    }
}

export const AssetsService = new Assets();

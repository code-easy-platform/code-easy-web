import {
    IconAction, IconInputParam, IconLocalParam, IconFolder, IconOutpuParam,
    IconFlowAction, IconFlowAssign, IconFlowComment, IconFlowEnd, IconFlowForeach,
    IconFlowIf, IconFlowStart, IconFlowSwitch, IconRouterConsume, IconRouterExpose
} from 'code-easy-components';

import { ItemType } from "../components/code-editor/models/ItemFluxo";
import { ComponentType } from "../enuns/ComponentType";


class Assets {
    public getIcon(type: ComponentType | ItemType): string {
        switch (type) {
            case ItemType.ACTION:
                return IconFlowAction;

            case ItemType.ASSIGN:
                return IconFlowAssign;

            case ItemType.COMMENT:
                return IconFlowComment;

            case ItemType.END:
                return IconFlowEnd;

            case ItemType.FOREACH:
                return IconFlowForeach;

            case ItemType.IF:
                return IconFlowIf;

            case ItemType.START:
                return IconFlowStart;

            case ItemType.SWITCH:
                return IconFlowSwitch;

            case ComponentType.routerConsume:
                return IconRouterConsume;

            case ComponentType.routerExpose:
                return IconRouterExpose;

            case ComponentType.globalAction:
                return IconAction;

            case ComponentType.localAction:
                return IconAction;

            case ComponentType.grouper:
                return IconFolder;

            case ComponentType.inputVariable:
                return IconInputParam;

            case ComponentType.localVariable:
                return IconLocalParam;

            case ComponentType.outputVariable:
                return IconOutpuParam;

            default:
                return '';
        }

    }
}

export const AssetsService = new Assets();

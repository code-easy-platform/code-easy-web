import {
    IconAction, IconInputParam, IconLocalParam, IconFolder, IconOutpuParam,
    IconFlowAction, IconFlowAssign, IconFlowComment, IconFlowEnd, IconFlowForeach,
    IconFlowIf, IconFlowStart, IconFlowSwitch, IconRouterConsume, IconRouterExpose, IconRouter
} from 'code-easy-components';

import { ComponentType } from "../enuns/ComponentType";
import { EItemType } from '../components/flow-editor';


class Assets {
    public getIcon(type: ComponentType | EItemType): string {
        switch (type) {
            case EItemType.ACTION:
                return IconFlowAction;

            case EItemType.ASSIGN:
                return IconFlowAssign;

            case EItemType.COMMENT:
                return IconFlowComment;

            case EItemType.END:
                return IconFlowEnd;

            case EItemType.FOREACH:
                return IconFlowForeach;

            case EItemType.IF:
                return IconFlowIf;

            case EItemType.START:
                return IconFlowStart;

            case EItemType.SWITCH:
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

            case ComponentType.tabActions:
                return IconAction;

            case ComponentType.tabRoutes:
                return IconRouter;

            default:
                return '';
        }

    }
}

export const AssetsService = new Assets();

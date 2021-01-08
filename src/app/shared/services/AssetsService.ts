import {
    IconAction, IconInputParam, IconLocalParam, IconFolder, IconOutpuParam,
    IconFlowAction, IconFlowAssign, IconFlowComment, IconFlowEnd, IconFlowForeach,
    IconFlowIf, IconFlowStart, IconFlowSwitch, IconRouterConsume, IconRouterExpose, IconRouter
} from 'code-easy-components';

import { EComponentType, EProjectType, ETabType } from "../enuns";
import { EItemType } from '../components/external';


class Assets {
    public getIcon<T = any>(type: EComponentType | ETabType | EItemType | EProjectType | T): string {
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

            case EComponentType.routerConsume:
                return IconRouterConsume;

            case EComponentType.routerExpose:
                return IconRouterExpose;

            case EComponentType.globalAction:
                return IconAction;

            case EComponentType.localAction:
                return IconAction;

            case EComponentType.grouper:
                return IconFolder;

            case EComponentType.inputVariable:
                return IconInputParam;

            case EComponentType.localVariable:
                return IconLocalParam;

            case EComponentType.outputVariable:
                return IconOutpuParam;

            case ETabType.tabActions:
                return IconAction;

            case ETabType.tabRoutes:
                return IconRouter;

            case ETabType.tabDatas:
                return IconRouter;

            default:
                return '';
        }

    }
}

export const AssetsService = new Assets();

import { TreeInterface } from "../../components/tree-manager/shared/models/TreeInterface";
import { Project } from "../../interfaces/Aplication";

import icon_warning from './../../../assets/icons/icon-warning.png';
import icon_error from './../../../assets/icons/icon-error.png';
import { Utils } from "../Utils";
import { ComponentType } from "../../enuns/ComponentType";
import { ItemType } from "../../components/code-editor/models/ItemFluxo";

class ProblemsHelperService {
    /**
     * Get all problems in a project
     */
    public getProblems(project: Project): TreeInterface[] {
        let res: TreeInterface[] = [];

        const addProblem = (label: string, type: 'warning' | 'error') => {
            res.push({
                icon: type === 'warning' ? icon_warning : icon_error,
                isDisabledSelect: true,
                nodeExpanded: false,
                isSelected: false,
                id: undefined,
                type: "ITEM",
                childs: [],
                label,
            });
        }

        // Valida a versão digitada no projeto para que seja compatível com os package.json que será gerado 
        if (Utils.isValidVersion(project.projectConfigs.version)) {
            addProblem('Project version field is not valid', 'error');
        }

        // Valida os itens das tabs
        project.tabs.forEach(tab => {

            if (tab.itens.length === 0 && tab.configs.type === ComponentType.tabRouters) {
                addProblem(`Add at least one route to your app`, 'warning');
            }

            tab.itens.forEach(item => {

                if (!(item.itens.some(comp => comp.itemType === ItemType.START) && item.itens.some(comp => comp.itemType === ItemType.END))) {
                    addProblem(`A ${item.type} must be have a "start" and an "end" item in "${item.label}"`, 'error');
                }

                item.itens.forEach(flowItem => {
                    if((flowItem.itemType !== ItemType.END && flowItem.itemType !== ItemType.COMMENT) && flowItem.sucessor.length === 0) {
                        addProblem(`In ${item.label} a flow item is missing a connector`, 'error');
                    }
                });

            });

        });

        if (res.length === 0) {
            res.push({
                label: "No problems have been detected",
                isDisabledSelect: true,
                nodeExpanded: false,
                isSelected: false,
                id: undefined,
                type: "ITEM",
                childs: [],
            });
        }

        return res;
    }
}

export const ProblemsHelper = new ProblemsHelperService();

import { Utils } from "code-easy-components";

import { TreeInterface } from "../../components/tree-manager/shared/models/TreeInterface";
import { ItemType } from "../../components/code-editor/models/ItemFluxo";
import icon_warning from './../../../assets/icons/icon-warning.png';
import icon_error from './../../../assets/icons/icon-error.png';
import { ComponentType } from "../../enuns/ComponentType";
import { Project } from "../../interfaces/Aplication";

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
                iconSize: 15,
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

                if (item.type === ComponentType.globalAction || item.type === ComponentType.localAction || item.type === ComponentType.router) {
                    if (!(item.itens.some(comp => comp.itemType === ItemType.START) && item.itens.some(comp => comp.itemType === ItemType.END))) {
                        addProblem(`A ${item.type} must be have a "start" and an "end" item in "${item.label}"`, 'error');
                    }
                }

                item.itens.forEach(flowItem => {
                    if ((flowItem.itemType !== ItemType.END && flowItem.itemType !== ItemType.COMMENT) && flowItem.sucessor.length === 0) {
                        addProblem(`In ${item.label} a flow item is missing a connector`, 'error');
                    }

                    // Valida se action está com o campo action vazio.
                    if (flowItem.itemType === ItemType.ACTION) {

                        flowItem.properties.forEach(prop => {
                            if (prop.name === "Action" && prop.value === "") {
                                addProblem(`In ${item.label} the flow item ${flowItem.name} must have a valid value in the ${prop.name} field.`, 'error');
                            }
                            if (prop.name === "Action" && prop.value !== "") {

                                const tabActions = project.tabs.find(tab => tab.configs.type === ComponentType.tabActions);
                                if (!tabActions) return;

                                if (!tabActions.itens.some(item => item.id === prop.value)) {
                                    addProblem(`In ${item.label} the flow item ${flowItem.name} must have a valid value in the ${prop.name} field.`, 'error');
                                }

                            }
                        });

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

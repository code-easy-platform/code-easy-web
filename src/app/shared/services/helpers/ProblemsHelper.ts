import { Utils, IconWarning, IconError } from "code-easy-components";

import { TreeInterface } from "../../components/tree-manager/shared/models/TreeInterface";
import { ItemType } from "../../components/code-editor/shared/enums/ItemType";
import { PropertieTypes } from "../../enuns/PropertieTypes";
import { ComponentType } from "../../enuns/ComponentType";
import { Project } from "../../interfaces/Aplication";

class ProblemsHelperService {
    /**
     * Get all problems in a project
     */
    public getProblems(project: Project): { problems: TreeInterface[]; project: Project } {
        let res: TreeInterface[] = [];

        const addProblem = (label: string, type: 'warning' | 'error') => {
            res.push({
                icon: type === 'warning' ? IconWarning : IconError,
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

        // Valida os items das tabs
        project.tabs.forEach(tab => {

            if (tab.items.length === 0 && tab.configs.type === ComponentType.tabRoutes) {
                addProblem(`Add at least one route to your app`, 'warning');
            }

            tab.items.forEach(item => {

                const numStarts = item.items.filter(item_flow => item_flow.itemType === ItemType.START);
                if (numStarts.length > 1) {
                    addProblem(`In ${item.label} must have only start flow item`, 'error');
                }

                if (item.type === ComponentType.globalAction || item.type === ComponentType.localAction || item.type === ComponentType.routerConsume) {
                    if (!(item.items.some(comp => comp.itemType === ItemType.START) && item.items.some(comp => comp.itemType === ItemType.END))) {
                        addProblem(`A ${item.type} must be have a "start" and an "end" item in "${item.label}"`, 'error');
                    }
                }

                item.items.forEach(flowItem => {
                    flowItem.hasError = false;

                    // Se for diferente de END e COMMENT valida se tem sucessores
                    if ((flowItem.itemType !== ItemType.END && flowItem.itemType !== ItemType.COMMENT) && flowItem.connections.length === 0) {
                        addProblem(`In ${item.label} a flow item is missing a connector`, 'error');
                        flowItem.hasError = true;
                    }

                    // Valida as props da action
                    if (flowItem.itemType === ItemType.ACTION) {

                        flowItem.properties.forEach(prop => {
                            prop.valueHasError = false;

                            // Valida se action está com o campo action vazio.
                            if (prop.propertieType === PropertieTypes.action && prop.value === "") {
                                addProblem(`In ${item.label} the flow item ${flowItem.name} must have a valid value in the ${prop.name} field.`, 'error');
                                prop.valueHasError = true;
                            }

                            if (prop.propertieType === PropertieTypes.action && prop.value !== "") {

                                const tabActions = project.tabs.find(tab => tab.configs.type === ComponentType.tabActions);
                                if (!tabActions) return;

                                if (!tabActions.items.some(item => item.id === prop.value)) {
                                    addProblem(`In ${item.label} the flow item ${flowItem.name} must have a valid value in the ${prop.name} field.`, 'error');
                                    prop.valueHasError = true;
                                }

                            }

                            if (prop.propertieType === PropertieTypes.param) {
                                project.tabs.forEach(toValidateTab => {

                                    // Pode ser usado o prop id para achar o parâmetro(componente de árvore) porque esse id é o mesmo usado na hroa de montar os parâmetros da action. 
                                    const paramCurrent = toValidateTab.items.find(tabItem => tabItem.id === prop.id);
                                    if (paramCurrent) {
                                        paramCurrent.properties.forEach(paramProp => {

                                            if (paramProp.propertieType === PropertieTypes.required && (paramProp.value === true && prop.value === "")) {

                                                // Adiciona o erro no painel de problemas
                                                addProblem(`In ${item.label} the flow item ${flowItem.name} must be set a required "${prop.name}" param.`, 'error');

                                                // Configura se o registro terá erro ou não
                                                prop.valueHasError = (paramProp.value === true && prop.value === "");
                                            }

                                        });
                                    }

                                });
                            }

                        });

                    } else if (flowItem.itemType === ItemType.ASSIGN) {

                        // Valida os assigns
                        flowItem.properties.forEach(prop => {
                            prop.valueHasError = false;

                            if (prop.propertieType === PropertieTypes.assigns) {

                                if ((prop.name !== '' && prop.value === '') || (prop.name === '' && prop.value !== '')) {
                                    addProblem(`In ${item.label} a ${flowItem.name} flow item have incorrect values`, 'error');
                                    prop.valueHasError = true;
                                }

                            }
                        });

                    } else if (flowItem.itemType === ItemType.END) {

                        // Valida os ends
                        const index = item.items.findIndex(item_flow => item_flow.connections.some(connection => connection.connectionId === flowItem.id || 'undefined'));
                        if (index === -1) {
                            addProblem(`In ${item.label} a ${flowItem.name} flow item is not used`, 'error');
                            flowItem.hasError = true;
                        }

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

        return { problems: res, project };
    }
}

export const ProblemsHelper = new ProblemsHelperService();

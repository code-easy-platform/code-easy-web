import { IconWarning, IconError } from "code-easy-components";

import { ITreeItem } from "../../components/tree-manager";
import { EComponentType } from "../../enuns/ComponentType";
import { EItemType } from "../../components/flow-editor";
import { PropertieTypes } from "../../enuns";
import { Project } from "../../models";

class ProblemsHelperService {
    private _problems: ITreeItem[] = [];

    /**
     * Get all problems in a project
     */
    public getProblems(project: Project): { problems: ITreeItem[]; project: Project } {
        this._problems = [];

        // Valida possiveis erros nas configurações
        this._problems = [...this._problems, ...project.problems];

        project.tabs.forEach(tab => {
            tab.items.forEach(treeItem => {
                treeItem.items.forEach(flowItem => {

                    // Valida as props da action
                    if (flowItem.type === EItemType.ACTION) {

                        flowItem.properties.forEach(prop => {
                            prop.valueHasError = false;

                            if (prop.propertieType === PropertieTypes.action && prop.value !== "") {

                                const tabActions = project.tabs.find(tab => tab.type === EComponentType.tabActions);
                                if (!tabActions) return;

                                if (!tabActions.items.some(item => item.name === prop.value)) {
                                    this._addProblem(`In "${treeItem.label}" the flow item "${flowItem.name}" must have a valid value in the "${prop.name}" field.`, 'error');
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
                                                this._addProblem(`In ${treeItem.label} the flow item ${flowItem.name} must be set a required "${prop.name}" param.`, 'error');

                                                // Configura se o registro terá erro ou não
                                                prop.valueHasError = (paramProp.value === true && prop.value === "");
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            });
        });

        if (this._problems.length === 0) {
            this._problems.push({
                label: "No problems detected",
                isDisabledSelect: true,
                nodeExpanded: false,
                isSelected: false,
                id: undefined,
                type: "ITEM",
            });
        }

        return { problems: this._problems, project };
    }

    private _addProblem(label: string, type: 'warning' | 'error') {
        this._problems.push({
            icon: type === 'warning' ? IconWarning : IconError,
            nodeExpanded: false,
            isSelected: false,
            id: undefined,
            iconSize: 15,
            type: "ITEM",
            label,
        });
    }
}

export const ProblemsHelper = new ProblemsHelperService();

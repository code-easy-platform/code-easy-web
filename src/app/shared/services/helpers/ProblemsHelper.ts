import { ITreeItem } from "../../components/external";
import { Project } from "../../models";

class ProblemsHelperService {
    /**
     * Get all problems in a project
     */
    public getProblems(project: Project): { problems: ITreeItem[]; project: Project } {
        /* project.tabs.forEach(tab => {
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
                                    project.addProblem(`In "${treeItem.label}" the flow item "${flowItem.name}" must have a valid value in the "${prop.name}" field.`, 'error');
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
                                                project.addProblem(`In ${treeItem.label} the flow item ${flowItem.name} must be set a required "${prop.name}" param.`, 'error');

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

        if (project.problems.length === 0) {
            project.addProblem("No problems detected", 'success');
        } */

        return { problems: /* project.problems */[], project };
    }
}

export const ProblemsHelper = new ProblemsHelperService();

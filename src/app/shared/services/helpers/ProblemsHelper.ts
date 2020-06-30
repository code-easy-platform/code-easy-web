import { Utils, IconWarning, IconError } from "code-easy-components";

import { TreeInterface } from "../../components/tree-manager/shared/models/TreeInterface";
import { ItemType } from "../../components/code-editor/shared/enums/ItemType";
import { PropertieTypes } from "../../enuns/PropertieTypes";
import { ComponentType } from "../../enuns/ComponentType";
import { Project, IProjectConfigs } from "../../interfaces/Aplication";
import { Tab } from "../../interfaces/Tabs";
import { ItemComponent } from "../../interfaces/ItemTreeComponent";
import { ItemFlowComplete } from "../../interfaces/ItemFlowComponent";

class ProblemsHelperService {
    private _problems: TreeInterface[] = [];

    /**
     * Get all problems in a project
     */
    public getProblems(project: Project): { problems: TreeInterface[]; project: Project } {
        this._problems = [];

        // Valida possiveis erros nas configurações
        this._getProjectConfigsProblems(project.projectConfigs);

        project.tabs.forEach(tab => {

            // Valida alguns detalhes da tab
            this._getTabsProblems(tab);

            // Valida os items da tab
            tab.items.forEach(treeItem => {

                // Valida um tree item
                this._getTreeItemProblems(treeItem);

                treeItem.items.forEach(flowItem => {
                    flowItem.hasError = false;

                    // Valida os problemas presentes no flow item
                    const flowItemRes = this._getFlowItemProblems(flowItem, treeItem);
                    if (flowItemRes) {
                        flowItem.hasError = true;
                    }

                    // Valida as props da action
                    if (flowItem.itemType === ItemType.ACTION) {

                        flowItem.properties.forEach(prop => {
                            prop.valueHasError = false;

                            // Valida se action está com o campo action vazio.
                            if (prop.propertieType === PropertieTypes.action && prop.value === "") {
                                this._addProblem(`In ${treeItem.label} the flow item ${flowItem.name} must have a valid value in the ${prop.name} field.`, 'error');
                                prop.valueHasError = true;
                            }

                            if (prop.propertieType === PropertieTypes.action && prop.value !== "") {

                                const tabActions = project.tabs.find(tab => tab.configs.type === ComponentType.tabActions);
                                if (!tabActions) return;

                                if (!tabActions.items.some(item => item.id === prop.value)) {
                                    this._addProblem(`In ${treeItem.label} the flow item ${flowItem.name} must have a valid value in the ${prop.name} field.`, 'error');
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

                    } else if (flowItem.itemType === ItemType.ASSIGN) {

                        // Valida os assigns
                        flowItem.properties.forEach(prop => {
                            prop.valueHasError = false;

                            if (prop.propertieType === PropertieTypes.assigns) {

                                if ((prop.name !== '' && prop.value === '') || (prop.name === '' && prop.value !== '')) {
                                    this._addProblem(`In ${treeItem.label} a ${flowItem.name} flow item have incorrect values`, 'error');
                                    prop.valueHasError = true;
                                }

                            }
                        });

                    } else if (flowItem.itemType === ItemType.END) {

                        // Valida os ends
                        const index = treeItem.items.findIndex(item_flow => item_flow.connections.some(connection => connection.connectionId === flowItem.id || 'undefined'));
                        if (index === -1) {
                            this._addProblem(`In ${treeItem.label} a ${flowItem.name} flow item is not used`, 'error');
                            flowItem.hasError = true;
                        }

                    }

                });

            });

        });

        if (this._problems.length === 0) {
            this._problems.push({
                label: "No problems have been detected",
                isDisabledSelect: true,
                nodeExpanded: false,
                isSelected: false,
                id: undefined,
                type: "ITEM",
                childs: [],
            });
        }

        return { problems: this._problems, project };
    }

    private _addProblem(label: string, type: 'warning' | 'error') {
        this._problems.push({
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

    private _getProjectConfigsProblems(configs: IProjectConfigs) {

        // Valida a versão digitada no projeto para que seja compatível com os package.json que será gerado 
        if (Utils.isValidVersion(configs.version)) {
            this._addProblem('Project version field is not valid', 'error');
        }

        // Valida o name
        if (configs.label === '') {
            this._addProblem('Project Name field cannot be empty', 'error');
        } else if (configs.label.length < 3) {
            this._addProblem('Project Name field cannot be less than 3 characters', 'error');
        } else if (configs.label.length > 50) {
            this._addProblem('Project Name field cannot exceed 50 characters', 'error');
        }

        // Valida o name
        if (configs.autor === '') {
            this._addProblem('Project Author name field cannot be empty', 'warning');
        } else if (configs.autor.length < 3) {
            this._addProblem('Project Author name field cannot be less than 3 characters', 'warning');
        } else if (configs.autor.length > 50) {
            this._addProblem('Project Author name field cannot exceed 50 characters', 'warning');
        }

    }

    private _getTabsProblems(tab: Tab) {

        if (tab.items.length === 0 && tab.configs.type === ComponentType.tabRoutes) {
            this._addProblem(`Add at least one route to your app`, 'error');
        }

    }

    private _getTreeItemProblems(treeItem: ItemComponent) {

        // Valida o numero de starts na tela
        const numStarts = treeItem.items.filter(item_flow => item_flow.itemType === ItemType.START);
        if (numStarts.length > 1) {
            this._addProblem(`In ${treeItem.label} must have only start flow item`, 'error');
        }

        // Valida se encontra um start e um end na tela
        if (treeItem.type === ComponentType.globalAction || treeItem.type === ComponentType.localAction || treeItem.type === ComponentType.routerConsume) {
            if (!(treeItem.items.some(comp => comp.itemType === ItemType.START) && treeItem.items.some(comp => comp.itemType === ItemType.END))) {
                this._addProblem(`A ${treeItem.type} must be have a "start" and an "end" item in "${treeItem.label}"`, 'error');
            }
        }

        // Valida o label
        if (treeItem.label === '') {
            this._addProblem('Field Label cannot be empty', 'error');
        } else if (treeItem.label.length < 3) {
            this._addProblem(`Field Label cannot be less than 3 characters in ${treeItem.label}`, 'error');
        } else if (treeItem.label.length > 50) {
            this._addProblem(`Field Label cannot exceed 50 characters in ${treeItem.label}`, 'error');
        }

    }

    private _getFlowItemProblems(flowItem: ItemFlowComplete, treeItem: ItemComponent): boolean {
        let hasError = false;

        // Se for diferente de END e COMMENT valida se tem sucessores
        if ((flowItem.itemType !== ItemType.END && flowItem.itemType !== ItemType.COMMENT) && flowItem.connections.length === 0) {
            this._addProblem(`In ${treeItem.label} a flow item is missing a connector`, 'error');
            flowItem.hasError = true;
        }

        // Valida o name
        if (flowItem.name === '') {
            this._addProblem(`We do not recommend that the flow item be empty in ${treeItem.label}`, 'warning');
        } else if (flowItem.name.length < 3) {
            this._addProblem(`A suitable name for a stream item must be longer than 3 characters in ${treeItem.label}`, 'warning');
        } else if (flowItem.name.length > 20) {
            this._addProblem(`A suitable name for a stream item must be less than 20 characters in ${treeItem.label}`, 'warning');
        }

        return hasError;
    }

}

export const ProblemsHelper = new ProblemsHelperService();

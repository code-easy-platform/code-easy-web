import { TreeInterface } from "../../components/tree-manager/shared/models/TreeInterface";
import { Project } from "../../interfaces/Aplication";

class ProblemsHelperService {
    /**
     * Get all problems in a project
     */
    public getProblems(project: Project): TreeInterface[] {
        let res: TreeInterface[] = [];



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

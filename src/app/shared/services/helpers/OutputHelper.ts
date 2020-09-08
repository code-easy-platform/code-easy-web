import { ITreeItem } from "../../components/tree-manager";
import { Project } from "../../interfaces/Aplication";

class OutputHelperService {
    /**
     * Get all problems in a project
     */
    public getOutput(project: Project): ITreeItem[] {
        let res: ITreeItem[] = [];

        if (res.length === 0) {
            res.push({
                label: "No output have been detected",
                isDisabledSelect: true,
                nodeExpanded: false,
                isSelected: false,
                id: undefined,
                type: "ITEM",
            });
        }

        return res;
    }
}

export const OutputHelper = new OutputHelperService();

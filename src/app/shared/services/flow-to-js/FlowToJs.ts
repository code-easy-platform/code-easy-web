import { IFlowItemComponent, ITreeItemComponent } from "../../interfaces";

export const FlowToJs = (treeItem: ITreeItemComponent, flowItems: IFlowItemComponent[]) => {
    let result = `export const ${treeItem.label.value} = () => {\n`;

    result = result + flowItems.map(flowItem => `// ${flowItem.name.value}${flowItem.label.value} -  - ${flowItem.type.value} - ${flowItem.flowItemType.value} - `).join('\n');

    return result + '\n}\n';
}

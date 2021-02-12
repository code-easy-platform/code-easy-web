import { IFlowItemComponent } from "../../interfaces";

export const FlowToJs = (flowItems: IFlowItemComponent[]) => {
    const result: string[] = [];

    flowItems.forEach(flowItem => {
        result.push(`// ${flowItem.name.value}${flowItem.label.value} -  - ${flowItem.type.value} - ${flowItem.flowItemType.value} - `);
    });

    return result.join('\n');
}

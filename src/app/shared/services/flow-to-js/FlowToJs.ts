import { EItemType } from "../../components/external";
import { IFlowItemComponent } from "../../interfaces";
import { PropertieTypes } from "../../enuns";

export const FlowToJs = (flowItems: IFlowItemComponent[]) => {
    const result: string[] = [
        '',
    ];

    const convertAssign = (item: IFlowItemComponent) => {
        const assigns = item.properties.value?.filter(prop => prop.propertieType.value === PropertieTypes.assigns);
        if (!assigns) return;

        assigns.forEach(assign => {
            if (assign.name.value !== '' && assign.value.value !== '') {
                result.push(`${assign.name.value} = ${assign.value.value};`);
            } else if (assign.name.value !== '' && assign.value.value === '') {
                result.push(`${assign.name.value} = undefined;`);
            }
        });
    }

    flowItems.forEach(flowItem => {
        if (flowItem.description.value) {
            result.push(`// ${flowItem.description.value}`);
        }

        switch (flowItem.type.value) {
            case EItemType.ASSIGN:
                convertAssign(flowItem);
                break;

            default:
                result.push(`// ${flowItem.name.value}${flowItem.label.value} - ${flowItem.type.value} - ${flowItem.flowItemType.value}`);
                break;
        }
    });

    return result.join('\n');
}

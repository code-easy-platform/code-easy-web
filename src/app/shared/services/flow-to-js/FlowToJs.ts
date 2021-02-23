import { EItemType, IConnection } from "../../components/external";
import { IFlowItemComponent } from "../../interfaces";
import { toCamelCase } from "../text-conversion";
import { PropertieTypes } from "../../enuns";

export const FlowToJs = (flowItems: IFlowItemComponent[], identation: number = 0) => {

    const connectedFlowItems = flowItems.filter((item, _, array) => {
        if (array.some(arrayItem => arrayItem.connections.value.some(conn => conn.targetId.value === item.id.value))) {
            return true;
        } else if (item.type.value === EItemType.START) {
            return true;
        } else {
            return false;
        }
    });

    const convertAssign = (item: IFlowItemComponent, result: string[], identation: number = 0) => {
        let identationSpaces = '';
        for (let index = 0; index < identation; index++) {
            identationSpaces = identationSpaces + ' ';
        }

        const assigns = item.properties.value?.filter(prop => prop.propertieType.value === PropertieTypes.assigns);
        if (!assigns) return;

        assigns.forEach(assign => {
            if (assign.name.value !== '' && assign.value.value !== '') {
                result.push(`${identationSpaces}${assign.name.value} = ${assign.value.value};`);
            } else if (assign.name.value !== '' && assign.value.value === '') {
                result.push(`${identationSpaces}${assign.name.value} = undefined;`);
            }
        });
    }

    const convertAction = (item: IFlowItemComponent, result: string[], identation: number = 0) => {
        let identationSpaces = '';
        for (let index = 0; index < identation; index++) {
            identationSpaces = identationSpaces + ' ';
        }

        const action = item.properties.value?.find(prop => prop.propertieType.value === PropertieTypes.action);

        if (!action) return;
        if (action.value.value === '') return;

        result.push(`${identationSpaces}const ${toCamelCase(action.value.value)}Result = ${toCamelCase(action.value.value)}();`);
    }

    const convertIf = (item: IFlowItemComponent, contentTrue: string[], contentFalse: string[], result: string[], identation: number = 0) => {
        let identationSpaces = '';
        for (let index = 0; index < identation; index++) {
            identationSpaces = identationSpaces + ' ';
        }

        const condition = item.properties.value?.find(prop => prop.propertieType.value === PropertieTypes.condition);

        if (!condition) return;
        if (condition.value.value === '') return;

        result.push(`${identationSpaces}if (${condition.value.value}) {`);
        result.push(...contentTrue);
        result.push(`${identationSpaces}} else {`);
        result.push(...contentFalse);
        result.push(`${identationSpaces}}`);
    }

    const convertSwitch = (item: IFlowItemComponent, getContent: (connection: IConnection) => string[], result: string[], identation: number = 0) => {
        let identationSpaces = '';
        for (let index = 0; index < identation; index++) {
            identationSpaces = identationSpaces + ' ';
        }

        // Find all conditions from switch flow item
        const conditions = item.connections.value.map(connection => {
            const condiction = item.properties.value?.find(prop => prop.propertieType.value === PropertieTypes.condition && prop.id.value === connection.id.value);
            return {
                connection,
                condiction,
            };
        });

        if (!conditions || conditions.length === 0) return;

        // Has only default connection
        if (conditions.length === 1) {
            result.push(...getContent(conditions[0].connection));
        }

        // More than one default connection
        for (let index = 1; index < conditions.length; index++) {
            const condition = conditions[index];

            if (index === 1) {
                result.push(`${identationSpaces}if (${condition.condiction?.value.value}) {`);
            } else {
                result.push(`${identationSpaces}} else if (${condition.condiction?.value.value}) {`);
            }

            result.push(...getContent(condition.connection));

            if (index === (conditions.length - 1)) {
                result.push(`${identationSpaces}} else {`);
                result.push(...getContent(conditions[0].connection));
                result.push(`${identationSpaces}}`);
            }
        }

    }

    const convertForeach = (item: IFlowItemComponent, foreachContent: string[], result: string[], identation: number = 0) => {
        let identationSpaces = '';
        for (let index = 0; index < identation; index++) {
            identationSpaces = identationSpaces + ' ';
        }

        const sourceList = item.properties.value?.find(prop => prop.propertieType.value === PropertieTypes.sourceList);
        if (!sourceList) return;

        result.push(`${identationSpaces}${sourceList.value.value}.forEach((current, currentIndex) => {`)
        result.push(...foreachContent);
        result.push(`${identationSpaces}});`)
    }

    const convertDefault = (item: IFlowItemComponent, result: string[], identation: number = 0) => {
        let identationSpaces = '';
        for (let index = 0; index < identation; index++) {
            identationSpaces = identationSpaces + ' ';
        }

        result.push(`${identationSpaces}// ${item.label.value} - ${item.type.value} - ${item.flowItemType.value}`);
    }

    const recursiveConversion = (item: IFlowItemComponent, items: IFlowItemComponent[], identation: number = 0, stopId?: string): string[] => {
        const result: string[] = [];

        let next: IFlowItemComponent | undefined = undefined;
        switch (item.type.value) {
            case EItemType.ASSIGN:
                convertAssign(item, result, identation);

                next = items.find(nextItem => item.connections.value.some(conn => conn.targetId.value === nextItem.id.value));
                if (!next) return result;

                return [
                    ...result,
                    ...recursiveConversion(next, items, identation, stopId),
                ];
            case EItemType.ACTION:
                if (item.description.value) {
                    let identationSpaces = '';
                    for (let index = 0; index < identation; index++) {
                        identationSpaces = identationSpaces + ' ';
                    }
                    result.push(`${identationSpaces}// ${item.description.value}`);
                }

                convertAction(item, result, identation);

                next = items.find(nextItem => item.connections.value.some(conn => conn.targetId.value === nextItem.id.value));
                if (!next) return result;

                return [
                    ...result,
                    ...recursiveConversion(next, items, identation, stopId),
                ];
            case EItemType.IF:
                if (item.label.value) {
                    let identationSpaces = '';
                    for (let index = 0; index < identation; index++) {
                        identationSpaces = identationSpaces + ' ';
                    }
                    result.push(`${identationSpaces}// ${item.label.value}`);
                }

                const itemTrue = items.find(nextItem => item.connections.value.length > 0 ? item.connections.value[0].targetId.value === nextItem.id.value : false);
                const itemFalse = items.find(nextItem => item.connections.value.length > 1 ? item.connections.value[1].targetId.value === nextItem.id.value : false);

                const contentTrue = itemTrue ? recursiveConversion(itemTrue, items, identation + 2, stopId) : [];
                const contentFalse = itemFalse ? recursiveConversion(itemFalse, items, identation + 2, stopId) : [];

                convertIf(item, contentTrue, contentFalse, result, identation);

                return result;
            case EItemType.SWITCH:
                if (item.label.value) {
                    let identationSpaces = '';
                    for (let index = 0; index < identation; index++) {
                        identationSpaces = identationSpaces + ' ';
                    }
                    result.push(`${identationSpaces}// ${item.label.value}`);
                }

                convertSwitch(item, (connection) => {
                    const target = items.find(item => item.id.value === connection.targetId.value);
                    if (!target) return [];

                    return recursiveConversion(target, items, identation + 2, stopId);
                }, result, identation);

                return result;
            case EItemType.FOREACH:
                if (item.id.value === stopId) return result;

                const foreachCycleTarget = items.find(nextItem => item.connections.value.some(conn => conn.targetId.value === nextItem.id.value && conn.connectionLabel.value === 'Cycle'));
                if (!foreachCycleTarget) return result;

                convertForeach(item, recursiveConversion(foreachCycleTarget, items, identation + 2, item.id.value), result, identation);

                const foreachTarget = items.find(nextItem => item.connections.value.some(conn => conn.targetId.value === nextItem.id.value && (conn.connectionLabel.value === '' || conn.connectionLabel.value === ' ')));
                if (!foreachTarget) return result;

                return [
                    ...result,
                    ...recursiveConversion(foreachTarget, items, identation, stopId),
                ];

            default:
                if (item.description.value) {
                    let identationSpaces = '';
                    for (let index = 0; index < identation; index++) {
                        identationSpaces = identationSpaces + ' ';
                    }
                    result.push(`${identationSpaces}// ${item.description.value}`);
                }

                convertDefault(item, result, identation);

                next = items.find(nextItem => item.connections.value.some(conn => conn.targetId.value === nextItem.id.value));
                if (!next) return result;

                return [
                    ...result,
                    ...recursiveConversion(next, items, identation, stopId),
                ];
        }
    }

    const start = connectedFlowItems.find(item => item.type.value === EItemType.START);
    if (!start) return '';

    return recursiveConversion(start, connectedFlowItems, identation).join('\n');
}

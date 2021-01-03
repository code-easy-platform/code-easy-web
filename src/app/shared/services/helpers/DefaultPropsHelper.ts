import { IProperty, EItemType } from "../../components/external";
import { EComponentType } from "../../enuns/ComponentType";

class DefaultPropsService {

    /** Devolve uma lista de propriedades para ser adicionado em novos items de fluxo ou da árvore. */
    public getNewProps(itemType: EItemType | EComponentType, name: string, inARouter: boolean = false): IProperty[] {
        switch (itemType) {
            /*             case EItemType.START:
                            return [
                                { id: Utils.getUUID(), name: PropertieTypes.label, type: TypeOfValues.viewOnly, value: name, propertieType: PropertieTypes.label },
                            ];
            
                        case EItemType.ACTION:
                            return [
                                { id: Utils.getUUID(), name: PropertieTypes.label, type: TypeOfValues.string, value: name, propertieType: PropertieTypes.label },
                                { id: Utils.getUUID(), name: 'Action', type: TypeOfValues.expression, value: '', propertieType: PropertieTypes.action, focusOnRender: true },
                            ];
            
                        case EItemType.ASSIGN:
                            return [
                                { id: Utils.getUUID(), name: PropertieTypes.label, type: TypeOfValues.string, value: name, propertieType: PropertieTypes.label, focusOnRender: true },
                                { id: Utils.getUUID(), name: '', type: TypeOfValues.assign, value: '', group: 'Assigments', propertieType: PropertieTypes.assigns },
                            ];
            
                        case EItemType.COMMENT:
                            return [
                                { id: Utils.getUUID(), name: 'Write your comment here', type: TypeOfValues.fullBigString, value: '', propertieType: PropertieTypes.comment, focusOnRender: true, useOnChange: true },
                            ];
            
                        case EItemType.FOREACH:
                            return [
                                { id: Utils.getUUID(), name: PropertieTypes.label, type: TypeOfValues.string, value: name, propertieType: PropertieTypes.label },
                                { id: Utils.getUUID(), name: 'SourceList', type: TypeOfValues.expression, value: name, propertieType: PropertieTypes.sourceList, focusOnRender: true },
                            ];
            
                        case EItemType.IF:
                            return [
                                { id: Utils.getUUID(), name: PropertieTypes.label, type: TypeOfValues.string, value: name, propertieType: PropertieTypes.label },
                                { id: Utils.getUUID(), name: 'Condition', type: TypeOfValues.expression, value: '', propertieType: PropertieTypes.condition, focusOnRender: true },
                            ];
            
                        case EItemType.SWITCH:
                            return [
                                { id: Utils.getUUID(), name: PropertieTypes.label, type: TypeOfValues.string, value: name, propertieType: PropertieTypes.label, focusOnRender: true },
                            ];
            
                        case EItemType.END:
                            return [
                                { id: Utils.getUUID(), name: PropertieTypes.label, type: TypeOfValues.viewOnly, value: name, propertieType: PropertieTypes.label },
                            ];
            
                        case EComponentType.routerExpose:
                            return [
                                { id: Utils.getUUID(), name: PropertieTypes.label, value: name, type: TypeOfValues.string, propertieType: PropertieTypes.label, focusOnRender: true },
                                { id: Utils.getUUID(), name: 'Description', type: TypeOfValues.bigstring, value: "", propertieType: PropertieTypes.description },
                                { id: Utils.getUUID(), name: 'Url', type: TypeOfValues.string, value: "/newroute", propertieType: PropertieTypes.url },
                                {
                                    id: Utils.getUUID(), name: 'Method http', type: TypeOfValues.selection, value: MethodsApi.post, propertieType: PropertieTypes.type, suggestions: MethodsApiList.map(value => {
                                        return {
                                            name: value,
                                            value: value,
                                            label: value,
                                            disabled: false,
                                            description: value,
                                        };
                                    })
                                }
                            ];
            
                        case EComponentType.routerConsume:
                            return [
                                { id: Utils.getUUID(), name: PropertieTypes.label, value: name, type: TypeOfValues.string, propertieType: PropertieTypes.label, focusOnRender: true },
                                { id: Utils.getUUID(), name: 'Description', type: TypeOfValues.bigstring, value: "", propertieType: PropertieTypes.description },
                                {
                                    id: Utils.getUUID(), name: 'Method http', type: TypeOfValues.selection, value: MethodsApi.post, propertieType: PropertieTypes.type, suggestions: MethodsApiList.map(value => {
                                        return {
                                            name: value,
                                            value: value,
                                            label: value,
                                            disabled: false,
                                            description: value,
                                        };
                                    })
                                },
                                { id: Utils.getUUID(), name: 'Url', type: TypeOfValues.string, value: "https://www.yourdomain.com/api/v1/hello", propertieType: PropertieTypes.url },
                            ];
            
                        case EComponentType.globalAction:
                            return [
                                { id: Utils.getUUID(), name: PropertieTypes.label, value: name, type: TypeOfValues.string, propertieType: PropertieTypes.label, focusOnRender: true },
                                { id: Utils.getUUID(), name: 'Description', type: TypeOfValues.bigstring, value: "", propertieType: PropertieTypes.description },
                                { id: Utils.getUUID(), name: 'Icon', type: TypeOfValues.binary, value: "Default", propertieType: PropertieTypes.icon },
                            ];
            
                        case EComponentType.localAction:
                            return [
                                { id: Utils.getUUID(), name: PropertieTypes.label, value: name, type: TypeOfValues.string, propertieType: PropertieTypes.label, focusOnRender: true },
                                { id: Utils.getUUID(), name: 'Description', type: TypeOfValues.bigstring, value: "", propertieType: PropertieTypes.description },
                                { id: Utils.getUUID(), name: 'Icon', type: TypeOfValues.binary, value: "Default", propertieType: PropertieTypes.icon },
                            ];
            
                        case EComponentType.inputVariable:
                            return [
                                { id: Utils.getUUID(), name: PropertieTypes.label, value: name, type: TypeOfValues.string, propertieType: PropertieTypes.label, focusOnRender: true },
                                { id: Utils.getUUID(), name: 'Description', type: TypeOfValues.bigstring, value: "", propertieType: PropertieTypes.description },
                                ...(inARouter
                                    ? [{
                                        id: Utils.getUUID(), name: 'Parameter in', type: TypeOfValues.selection, value: ParametersLocation.body, propertieType: PropertieTypes.parametersIn, suggestions: ParametersLocationList.map(value => {
                                            return {
                                                name: value,
                                                value: value,
                                                label: value,
                                                disabled: false,
                                                description: value,
                                            };
                                        })
                                    }]
                                    : []
                                ),
                                { id: Utils.getUUID(), name: 'Required', type: TypeOfValues.boolean, value: true, propertieType: PropertieTypes.required },
                                {
                                    id: Utils.getUUID(), name: 'Data type', type: TypeOfValues.selection, value: DataTypes.string, propertieType: PropertieTypes.dataType, suggestions: DataTypesList.map(value => {
                                        return {
                                            name: value,
                                            label: value,
                                            value: value,
                                            disabled: false,
                                            description: value,
                                        }
                                    })
                                },
                                { id: Utils.getUUID(), name: 'Default value', type: TypeOfValues.expression, value: "", propertieType: PropertieTypes.defaultValue },
                            ];
            
                        case EComponentType.localVariable:
                            return [
                                { id: Utils.getUUID(), name: PropertieTypes.label, value: name, type: TypeOfValues.string, propertieType: PropertieTypes.label, focusOnRender: true },
                                { id: Utils.getUUID(), name: 'Description', type: TypeOfValues.bigstring, value: "", propertieType: PropertieTypes.description },
                                {
                                    id: Utils.getUUID(), name: 'Data type', type: TypeOfValues.selection, value: DataTypes.string, propertieType: PropertieTypes.dataType, suggestions: DataTypesList.map(value => {
                                        return {
                                            name: value,
                                            label: value,
                                            value: value,
                                            disabled: false,
                                            description: value,
                                        }
                                    })
                                },
                                { id: Utils.getUUID(), name: 'Default value', type: TypeOfValues.expression, value: "", propertieType: PropertieTypes.defaultValue },
                            ];
            
                        case EComponentType.outputVariable:
                            return [
                                { id: Utils.getUUID(), name: PropertieTypes.label, value: name, type: TypeOfValues.string, propertieType: PropertieTypes.label, focusOnRender: true },
                                { id: Utils.getUUID(), name: 'Description', type: TypeOfValues.bigstring, value: "", propertieType: PropertieTypes.description },
                                {
                                    id: Utils.getUUID(), name: 'Data type', type: TypeOfValues.selection, value: DataTypes.string, propertieType: PropertieTypes.dataType, suggestions: DataTypesList.map(value => {
                                        return {
                                            name: value,
                                            label: value,
                                            value: value,
                                            disabled: false,
                                            description: value,
                                        }
                                    })
                                },
                                { id: Utils.getUUID(), name: 'Default value', type: TypeOfValues.expression, value: "", propertieType: PropertieTypes.defaultValue },
                            ];
             */
            default:
                return [
                    // { id: Utils.getUUID(), name: PropertieTypes.label, type: TypeOfValues.viewOnly, value: '<tipo de item não encontrado>', propertieType: PropertieTypes.label },
                ];
        }
    }

}

export const DefaultPropsHelper = new DefaultPropsService();

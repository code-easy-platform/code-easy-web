import { Utils } from "code-easy-components";

import { IProperties, TypeValues } from "../../components/properties-editor/shared/interfaces";
import { ParametersLocationList, ParametersLocation } from "../../enuns/ParametersLocation";
import { ItemType } from "../../components/code-editor/models/ItemFluxo";
import { MethodsApi, MethodsApiList } from "../../enuns/ApiMethods";
import { DataTypes, DataTypesList } from "../../enuns/DataType";
import { PropertieTypes } from "../../enuns/PropertieTypes";
import { ComponentType } from "../../enuns/ComponentType";

class DefaultPropsService {

    /** Devolve uma lista de propriedades para ser adicionado em novos itens de fluxo ou da árvore. */
    public getNewProps(itemType: ItemType | ComponentType, name: string, inARouter: boolean = false): IProperties[] {
        switch (itemType) {
            case ItemType.START:
                return [
                    { id: Utils.getUUID(), name: 'Label', type: TypeValues.viewOnly, value: name, propertieType: PropertieTypes.label },
                ];

            case ItemType.ACTION:
                return [
                    { id: Utils.getUUID(), name: 'Label', type: TypeValues.string, value: name, propertieType: PropertieTypes.label },
                    { id: Utils.getUUID(), name: 'Action', type: TypeValues.expression, value: '', propertieType: PropertieTypes.action },
                ];

            case ItemType.ASSIGN:
                return [
                    { id: Utils.getUUID(), name: 'Label', type: TypeValues.string, value: name, propertieType: PropertieTypes.label },
                    { id: Utils.getUUID(), name: '', type: TypeValues.assign, value: '', group: 'Assigments', propertieType: PropertieTypes.assigns },
                ];

            case ItemType.COMMENT:
                return [
                    { id: Utils.getUUID(), name: 'Write your comment here', type: TypeValues.fullBigString, value: '', propertieType: PropertieTypes.comment },
                ];

            case ItemType.FOREACH:
                return [
                    { id: Utils.getUUID(), name: 'Label', type: TypeValues.string, value: name, propertieType: PropertieTypes.label },
                    { id: Utils.getUUID(), name: 'SourceList', type: TypeValues.expression, value: name, propertieType: PropertieTypes.sourceList },
                ];

            case ItemType.IF:
                return [
                    { id: Utils.getUUID(), name: 'Label', type: TypeValues.string, value: name, propertieType: PropertieTypes.label },
                    { id: Utils.getUUID(), name: 'Condiction', type: TypeValues.expression, value: '', propertieType: PropertieTypes.condiction },
                ];

            case ItemType.SWITCH:
                return [
                    { id: Utils.getUUID(), name: 'Label', type: TypeValues.string, value: name, propertieType: PropertieTypes.label },
                    { id: Utils.getUUID(), name: 'Condiction1', type: TypeValues.expression, value: '', propertieType: PropertieTypes.condiction },
                ];

            case ItemType.END:
                return [
                    { id: Utils.getUUID(), name: 'Label', type: TypeValues.viewOnly, value: name, propertieType: PropertieTypes.label },
                ];

            case ComponentType.router:
                return [
                    { id: Utils.getUUID(), name: 'Label', value: name, type: TypeValues.string, propertieType: PropertieTypes.label },
                    { id: Utils.getUUID(), name: 'Description', type: TypeValues.bigstring, value: "", propertieType: PropertieTypes.description },
                    { id: Utils.getUUID(), name: 'Url', type: TypeValues.string, value: "/newroute", propertieType: PropertieTypes.url },
                    {
                        id: Utils.getUUID(), name: 'Method http', type: TypeValues.selection, value: MethodsApi.post, propertieType: PropertieTypes.type, suggestions: MethodsApiList.map(value => {
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

            case ComponentType.globalAction:
                return [
                    { id: Utils.getUUID(), name: 'Label', value: name, type: TypeValues.string, propertieType: PropertieTypes.label },
                    { id: Utils.getUUID(), name: 'Description', type: TypeValues.bigstring, value: "", propertieType: PropertieTypes.description },
                    { id: Utils.getUUID(), name: 'Icon', type: TypeValues.binary, value: "Default", propertieType: PropertieTypes.icon },
                ];

            case ComponentType.localAction:
                return [
                    { id: Utils.getUUID(), name: 'Label', value: name, type: TypeValues.string, propertieType: PropertieTypes.label },
                    { id: Utils.getUUID(), name: 'Description', type: TypeValues.bigstring, value: "", propertieType: PropertieTypes.description },
                    { id: Utils.getUUID(), name: 'Icon', type: TypeValues.binary, value: "Default", propertieType: PropertieTypes.icon },
                ];

            case ComponentType.inputVariable:
                return [
                    { id: Utils.getUUID(), name: 'Label', value: name, type: TypeValues.string, propertieType: PropertieTypes.label },
                    { id: Utils.getUUID(), name: 'Description', type: TypeValues.bigstring, value: "", propertieType: PropertieTypes.description },
                    ...(inARouter
                        ? [{
                            id: Utils.getUUID(), name: 'Parameter in', type: TypeValues.selection, value: ParametersLocation.body, propertieType: PropertieTypes.parametersIn, suggestions: ParametersLocationList.map(value => {
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
                    { id: Utils.getUUID(), name: 'Required', type: TypeValues.boolean, value: true, propertieType: PropertieTypes.required },
                    {
                        id: Utils.getUUID(), name: 'Data type', type: TypeValues.selection, value: DataTypes.string, propertieType: PropertieTypes.dataType, suggestions: DataTypesList.map(value => {
                            return {
                                name: value,
                                label: value,
                                value: value,
                                disabled: false,
                                description: value,
                            }
                        })
                    },
                    { id: Utils.getUUID(), name: 'Default value', type: TypeValues.expression, value: "", propertieType: PropertieTypes.defaultValue },
                ];

            case ComponentType.localVariable:
                return [
                    { id: Utils.getUUID(), name: 'Label', value: name, type: TypeValues.string, propertieType: PropertieTypes.label },
                    { id: Utils.getUUID(), name: 'Description', type: TypeValues.bigstring, value: "", propertieType: PropertieTypes.description },
                    {
                        id: Utils.getUUID(), name: 'Data type', type: TypeValues.selection, value: DataTypes.string, propertieType: PropertieTypes.dataType, suggestions: DataTypesList.map(value => {
                            return {
                                name: value,
                                label: value,
                                value: value,
                                disabled: false,
                                description: value,
                            }
                        })
                    },
                    { id: Utils.getUUID(), name: 'Default value', type: TypeValues.expression, value: "", propertieType: PropertieTypes.defaultValue },
                ];

            case ComponentType.outputVariable:
                return [
                    { id: Utils.getUUID(), name: 'Label', value: name, type: TypeValues.string, propertieType: PropertieTypes.label },
                    { id: Utils.getUUID(), name: 'Description', type: TypeValues.bigstring, value: "", propertieType: PropertieTypes.description },
                    {
                        id: Utils.getUUID(), name: 'Data type', type: TypeValues.selection, value: DataTypes.string, propertieType: PropertieTypes.dataType, suggestions: DataTypesList.map(value => {
                            return {
                                name: value,
                                label: value,
                                value: value,
                                disabled: false,
                                description: value,
                            }
                        })
                    },
                    { id: Utils.getUUID(), name: 'Default value', type: TypeValues.expression, value: "", propertieType: PropertieTypes.defaultValue },
                ];

            default:
                return [
                    { id: Utils.getUUID(), name: 'Label', type: TypeValues.viewOnly, value: '<tipo de item não encontrado>', propertieType: PropertieTypes.label },
                ];
        }
    }

}

export const DefaultPropsHelper = new DefaultPropsService();

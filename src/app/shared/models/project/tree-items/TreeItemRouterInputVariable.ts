import { Utils } from "code-easy-components";
import { observe } from "react-observing";

import { ISuggestion, TypeOfValues } from "./../../../components/external";
import { ParametersLocationList, PropertieTypes } from "./../../../enuns";
import { ITreeItemRouterInputVariable } from "./../../../interfaces";
import { TreeItemInputVariable } from "./TreeItemInputVariable";

/**
 * Represents a router input variable implementation
 */
export class TreeItemRouterInputVariable extends TreeItemInputVariable implements ITreeItemRouterInputVariable {
    public static newVariable(label: string, ascendantId?: string) {
        return new TreeItemRouterInputVariable({
            properties: [
                ...TreeItemInputVariable.newVariable(label, ascendantId).properties.value,
                {
                    value: observe(label),
                    id: observe(Utils.getUUID()),
                    type: observe(TypeOfValues.selection),
                    name: observe(PropertieTypes.parametersIn),
                    propertieType: observe(PropertieTypes.parametersIn),
                    suggestions: observe<ISuggestion<string | number>[]>(ParametersLocationList.map(parameterLocation => ({
                        disabled: observe(false),
                        name: observe(parameterLocation),
                        label: observe(parameterLocation),
                        value: observe(parameterLocation),
                        description: observe(parameterLocation),
                    }))),

                    group: observe(undefined),
                    information: observe(undefined),
                    fileMaxSize: observe(undefined),
                    nameHasError: observe(undefined),
                    valueHasError: observe(undefined),
                    focusOnRender: observe(undefined),
                    nameHasWarning: observe(undefined),
                    valueHasWarning: observe(undefined),
                    nameSuggestions: observe(undefined),
                    editNameDisabled: observe(undefined),
                    onPickerNameClick: observe(undefined),
                    editValueDisabled: observe(undefined),
                    onPickerValueClick: observe(undefined),
                },
            ]
        });
    }
}

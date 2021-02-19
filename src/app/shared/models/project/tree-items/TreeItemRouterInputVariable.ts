import { Utils } from "code-easy-components";
import { observe, transform } from "react-observing";

import { ISuggestion, TypeOfValues } from "./../../../components/external";
import { ParametersLocationList, PropertieTypes } from "./../../../enuns";
import { ITreeItemRouterInputVariable } from "./../../../interfaces";
import { TreeItemInputVariable } from "./TreeItemInputVariable";
import { toPascalCase } from "../../../services";
import { Tab } from "../generic";

/**
 * Represents a router input variable implementation
 */
export class TreeItemRouterInputVariable extends TreeItemInputVariable implements ITreeItemRouterInputVariable {

    public get name() {
        return transform(super.name, value => toPascalCase(value));
    }

    public get label() {
        return transform(super.label, value => toPascalCase(value), value => toPascalCase(value));
    }

    public static newVariable(tabParent: Tab, label: string, ascendantId?: string) {
        return new TreeItemRouterInputVariable(tabParent, {
            properties: [
                ...TreeItemInputVariable.newVariable(tabParent, label, ascendantId).properties.value,
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

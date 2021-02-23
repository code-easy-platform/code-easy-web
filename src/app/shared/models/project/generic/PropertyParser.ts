import { observe } from "react-observing";
import { IProperty } from "../../../components/external";

export abstract class PropertyParser {
    public static jsonToProperty(json: any): IProperty | null {
        return {
            id: observe(json.id),
            name: observe(json.name),
            type: observe(json.type),
            value: observe(json.value),
            group: observe(json.group),
            information: observe(json.information),
            fileMaxSize: observe(json.fileMaxSize),
            nameHasError: observe(json.nameHasError),
            focusOnRender: observe(json.focusOnRender),
            propertieType: observe(json.propertieType),
            valueHasError: observe(json.valueHasError),
            nameHasWarning: observe(json.nameHasWarning),
            valueHasWarning: observe(json.valueHasWarning),
            editNameDisabled: observe(json.editNameDisabled),
            onPickerNameClick: observe(json.onPickerNameClick),
            editValueDisabled: observe(json.editValueDisabled),
            onPickerValueClick: observe(json.onPickerValueClick),
            suggestions: observe(json.suggestions?.map((suggestion: any) => ({
                name: observe(suggestion.name),
                value: observe(suggestion.value),
                label: observe(suggestion.label),
                disabled: observe(suggestion.disabled),
                description: observe(suggestion.description),
            })) || []),
            nameSuggestions: observe(json.nameSuggestions?.map((suggestion: any) => ({
                name: observe(suggestion.name),
                value: observe(suggestion.value),
                label: observe(suggestion.label),
                disabled: observe(suggestion.disabled),
                description: observe(suggestion.description),
            })) || []),
        }
    }
}

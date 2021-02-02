import { Utils } from "code-easy-components";
import { IObservable, observe } from "react-observing";

import { EProjectType, PropertieTypes } from "./../../../enuns";
import { BasicConfigurations } from "./../BasicConfigurations";
import { IProjectConfigurations } from "./../../../interfaces";
import { TypeOfValues } from "./../../../components/external";

export abstract class ProjectConfigurations extends BasicConfigurations<EProjectType> implements IProjectConfigurations {

    public get author(): IObservable<string> {
        let prop = this.properties.value.find(prop => prop.propertieType.value === PropertieTypes.author)?.value;
        if (prop) {
            return prop;
        }

        prop = observe('');

        this.properties.value = [
            ...this.properties.value,
            {
                value: prop,
                id: observe(Utils.getUUID()),
                type: observe(TypeOfValues.hidden),
                name: observe(PropertieTypes.author),
                propertieType: observe(PropertieTypes.author),

                group: observe(undefined),
                suggestions: observe(undefined),
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
            }
        ];

        return prop;
    };

    public get version(): IObservable<string> {
        let prop = this.properties.value.find(prop => prop.propertieType.value === PropertieTypes.version)?.value;
        if (prop) {
            return prop;
        }

        prop = observe('0.0.1');

        this.properties.value = [
            ...this.properties.value,
            {
                value: prop,
                id: observe(Utils.getUUID()),
                type: observe(TypeOfValues.hidden),
                name: observe(PropertieTypes.version),
                propertieType: observe(PropertieTypes.version),

                group: observe(undefined),
                suggestions: observe(undefined),
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
            }
        ];

        return prop;
    };

    public get currentPlatformVersion(): IObservable<string> {
        let prop = this.properties.value.find(prop => prop.propertieType.value === PropertieTypes.currentPlatformVersion)?.value;
        if (prop) {
            return prop;
        }

        prop = observe('');

        this.properties.value = [
            ...this.properties.value,
            {
                value: prop,
                id: observe(Utils.getUUID()),
                type: observe(TypeOfValues.hidden),
                name: observe(PropertieTypes.currentPlatformVersion),
                propertieType: observe(PropertieTypes.currentPlatformVersion),

                group: observe(undefined),
                suggestions: observe(undefined),
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
            }
        ];

        return prop;
    };

    public get createdInPlatformVersion(): IObservable<string> {
        let prop = this.properties.value.find(prop => prop.propertieType.value === PropertieTypes.createdInPlatformVersion)?.value;
        if (prop) {
            return prop;
        }

        prop = observe('');

        this.properties.value = [
            ...this.properties.value,
            {
                value: prop,
                id: observe(Utils.getUUID()),
                type: observe(TypeOfValues.hidden),
                name: observe(PropertieTypes.createdInPlatformVersion),
                propertieType: observe(PropertieTypes.createdInPlatformVersion),

                group: observe(undefined),
                suggestions: observe(undefined),
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
            }
        ];

        return prop;
    };
}

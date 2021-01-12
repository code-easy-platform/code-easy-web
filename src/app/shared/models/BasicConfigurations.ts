import { IObservable, observe, set, transform } from "react-observing";
import { Utils } from "code-easy-components";
import * as yup from 'yup';

import { IFileContent, IProperty, TypeOfValues } from "./../components/external";
import { IBasicConfigurations } from "./../interfaces";
import { AssetsService } from "./../services";
import { PropertieTypes } from "./../enuns";

/**
 * Fields passeds in constructor
 */
interface IConstructor<T> {
    properties: IProperty[];
    id?: string;
    type: T;
}

/**
 * Common implementation fields between the different project structures
 */
export class BasicConfigurations<T> implements IBasicConfigurations<T> {
    private _id: IObservable<string | undefined>;
    public get id(): IObservable<string | undefined> {
        if (!this._id.value) {
            this._id.value = Utils.getUUID();
        }

        return this._id;
    }

    public get name(): IObservable<string> {
        return transform(this.label, value => {
            let name = value.replace(/[^\w\s]/gi, '_');
            name = name.replaceAll(' ', '');
            name = name.toLocaleLowerCase();
            while (name.split('')[0] === '_') {
                let newName = name.split('')
                newName.shift();
                name = newName.join('');
            }
            return name;
        });
    }

    public get label(): IObservable<string> {
        let prop = this._properties.value.find(prop => prop.propertieType.value === PropertieTypes.label)?.value;
        if (prop) {
            return prop;
        }

        prop = observe('');

        this._properties.value = [
            ...this._properties.value,
            {
                value: prop,
                id: observe(Utils.getUUID()),
                type: observe(TypeOfValues.string),
                name: observe(PropertieTypes.label),
                propertieType: observe(PropertieTypes.label),
                nameHasError: transform(this._hasError, values => values.includes(prop?.id || '')),
                valueHasError: transform(this._hasError, values => values.includes(prop?.id || '')),
                nameHasWarning: transform(this._hasWarning, values => values.includes(prop?.id || '')),
                valueHasWarning: transform(this._hasWarning, values => values.includes(prop?.id || '')),

                group: observe(undefined),
                suggestions: observe(undefined),
                information: observe(undefined),
                fileMaxSize: observe(undefined),
                focusOnRender: observe(undefined),
                nameSuggestions: observe(undefined),
                editNameDisabled: observe(undefined),
                onPickerNameClick: observe(undefined),
                editValueDisabled: observe(undefined),
                onPickerValueClick: observe(undefined),
            }
        ];

        return prop;
    }

    public get description(): IObservable<string | undefined> {
        let prop = this._properties.value.find(prop => prop.propertieType.value === PropertieTypes.description)?.value;
        if (prop) {
            return prop;
        }

        prop = observe('');

        this._properties.value = [
            ...this._properties.value,
            {
                value: prop,
                id: observe(Utils.getUUID()),
                type: observe(TypeOfValues.bigstring),
                name: observe(PropertieTypes.description),
                propertieType: observe(PropertieTypes.description),

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
    }

    public get icon(): IObservable<IFileContent | undefined> {
        let prop = this._properties.value.find(prop => prop.propertieType.value === PropertieTypes.icon)?.value;
        if (prop) {
            return prop;
        }

        prop = observe({
            content: AssetsService.getIcon<T>(this.type.value),
            name: 'Default',
            type: 'image',
        });

        this._properties.value = [
            ...this._properties.value,
            {
                value: prop,
                id: observe(Utils.getUUID()),
                editValueDisabled: observe(true),
                type: observe(TypeOfValues.binary),
                name: observe(PropertieTypes.icon),
                propertieType: observe(PropertieTypes.icon),

                group: observe(undefined),
                suggestions: observe(undefined),
                information: observe(undefined),
                fileMaxSize: observe(undefined),
                nameHasError: observe(undefined),
                focusOnRender: observe(undefined),
                valueHasError: observe(undefined),
                nameHasWarning: observe(undefined),
                valueHasWarning: observe(undefined),
                nameSuggestions: observe(undefined),
                editNameDisabled: observe(undefined),
                onPickerNameClick: observe(undefined),
                onPickerValueClick: observe(undefined),
            }
        ];

        return prop;
    }

    private _properties: IObservable<IProperty[]>;
    public get properties(): IObservable<IProperty[]> {
        return this._properties
    };

    private _hasError: IObservable<string[]> = observe([]);
    public get errosIds(): IObservable<string[]> {
        return this._hasError;
    }
    public get hasError(): IObservable<boolean> {
        return transform(this._hasError, value => value.length > 0);
    }

    private _hasWarning: IObservable<string[]> = observe([]);
    public get warningIds(): IObservable<string[]> {
        return this._hasWarning;
    }
    public get hasWarning(): IObservable<boolean> {
        return transform(this._hasWarning, value => value.length > 0);
    }

    private _type: IObservable<T>;
    public get type(): IObservable<T> {
        return this._type;
    }

    public get updatedDate(): IObservable<Date> {
        let prop = this._properties.value.find(prop => prop.propertieType.value === PropertieTypes.updatedDate)?.value;
        if (prop) {
            return prop;
        }

        prop = observe(new Date());

        this._properties.value = [
            ...this._properties.value,
            {
                value: prop,
                id: observe(Utils.getUUID()),
                type: observe(TypeOfValues.viewOnly),
                name: observe(PropertieTypes.updatedDate),
                propertieType: observe(PropertieTypes.updatedDate),

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
    }

    public get createdDate(): IObservable<Date> {
        let prop = this._properties.value.find(prop => prop.propertieType.value === PropertieTypes.createdDate)?.value;
        if (prop) {
            return prop;
        }

        prop = observe(new Date());

        this._properties.value = [
            ...this._properties.value,
            {
                value: prop,
                id: observe(Utils.getUUID()),
                type: observe(TypeOfValues.viewOnly),
                name: observe(PropertieTypes.createdDate),
                propertieType: observe(PropertieTypes.createdDate),

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
    }

    public get isEditing(): IObservable<boolean> {
        let prop = this._properties.value.find(prop => prop.propertieType.value === PropertieTypes.isEditing)?.value;
        if (prop) {
            return prop;
        }

        prop = observe(false);

        this._properties.value = [
            ...this._properties.value,
            {
                value: prop,
                id: observe(Utils.getUUID()),
                type: observe(TypeOfValues.hidden),
                name: observe(PropertieTypes.isEditing),
                propertieType: observe(PropertieTypes.isEditing),

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
    }

    public get isSelected(): IObservable<boolean> {
        let prop = this._properties.value.find(prop => prop.propertieType.value === PropertieTypes.isSelected)?.value;
        if (prop) {
            return prop;
        }

        prop = observe(false);

        this._properties.value = [
            ...this._properties.value,
            {
                value: prop,
                id: observe(Utils.getUUID()),
                type: observe(TypeOfValues.hidden),
                name: observe(PropertieTypes.isSelected),
                propertieType: observe(PropertieTypes.isSelected),

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
    }

    public get ordem(): IObservable<number | undefined> {
        let prop = this._properties.value.find(prop => prop.propertieType.value === PropertieTypes.ordem)?.value;
        if (prop) {
            return prop;
        }

        prop = observe(0);

        this._properties.value = [
            ...this._properties.value,
            {
                value: prop,
                id: observe(Utils.getUUID()),
                type: observe(TypeOfValues.hidden),
                name: observe(PropertieTypes.ordem),
                propertieType: observe(PropertieTypes.ordem),

                group: observe(undefined),
                suggestions: observe(undefined),
                information: observe(undefined),
                fileMaxSize: observe(undefined),
                nameHasError: observe(undefined),
                focusOnRender: observe(undefined),
                valueHasError: observe(undefined),
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
    }

    public get isExpanded(): IObservable<boolean | undefined> {
        let prop = this._properties.value.find(prop => prop.propertieType.value === PropertieTypes.isExpanded)?.value;
        if (prop) {
            return prop;
        }

        prop = observe(false);

        this._properties.value = [
            ...this._properties.value,
            {
                value: prop,
                id: observe(Utils.getUUID()),
                type: observe(TypeOfValues.hidden),
                name: observe(PropertieTypes.isExpanded),
                propertieType: observe(PropertieTypes.isExpanded),

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
    }

    constructor(props: IConstructor<T>) {
        this._type = observe(props.type);
        this._properties = observe(props.properties);
        this._id = props.id ? observe(props.id) : observe(undefined);

        this._validations();
        this._defaultProperties();
    }

    private _defaultProperties() {
        this.properties.value.forEach(propertie => {
            propertie.nameHasError = transform(this._hasError, values => values.includes(propertie.value.id));
            propertie.valueHasError = transform(this._hasError, values => values.includes(propertie.value.id));
            propertie.nameHasWarning = transform(this._hasWarning, values => values.includes(propertie.value.id));
            propertie.valueHasWarning = transform(this._hasWarning, values => values.includes(propertie.value.id));
        });
    }

    private _validations() {
        this._valideLabel();
    }

    private _valideLabel() {
        const labelSchema = yup.string().min(3).max(200).trim();

        labelSchema.validate(this.label.value)
            .then(() => {
                set(this._hasError, oldErros => {
                    if (oldErros.includes(this.label.id)) {
                        return oldErros.filter(oldErros => oldErros !== this.label.id);
                    } else {
                        return oldErros;
                    }
                });
            })
            .catch(() => {
                set(this._hasError, oldErros => {
                    if (!oldErros.includes(this.label.id)) {
                        return [
                            ...oldErros,
                            this.label.id,
                        ];
                    } else {
                        return oldErros;
                    }
                });
            });

        // Subscribe to all changes
        this.label.subscribe(label => {
            labelSchema.validate(label)
                .then(() => {
                    set(this._hasError, oldErros => {
                        if (oldErros.includes(this.label.id)) {
                            return oldErros.filter(oldErros => oldErros !== this.label.id);
                        } else {
                            return oldErros;
                        }
                    });
                })
                .catch(() => {
                    set(this._hasError, oldErros => {
                        if (!oldErros.includes(this.label.id)) {
                            return [
                                ...oldErros,
                                this.label.id,
                            ];
                        } else {
                            return oldErros;
                        }
                    });
                });
        });
    }
}

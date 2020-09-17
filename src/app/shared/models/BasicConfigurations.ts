import { IconError, IconWarning, Utils } from "code-easy-components";

import { IProperty, TypeOfValues } from "./../components/properties-editor";
import { ITreeItem } from "./../components/tree-manager";
import { IBasicConfigurations } from "./../interfaces";
import { PropertieTypes } from "./../enuns";


type OmitInConstructor = 'name' | 'problems';

export class BasicConfigurations<T> implements IBasicConfigurations<T> {

    private _id: string | undefined = undefined;
    public get id(): string | undefined {
        return this._id || Utils.getUUID();
    };
    public set id(uuid: string | undefined) {
        this._id = uuid || Utils.getUUID();
    };

    public get name(): string {
        return Utils.getNormalizedString(this.label);
    };

    public get label(): string {
        return this._properties.find(prop => prop.propertieType === PropertieTypes.label)?.value || '';
    };
    public set label(value: string) {
        let prop = this._properties?.find(prop => prop.propertieType === PropertieTypes.label);
        if (prop) {
            prop.value = value;
        } else {
            this._properties.push({
                value,
                id: Utils.getUUID(),
                focusOnRender: true,
                type: TypeOfValues.string,
                name: PropertieTypes.label,
            });
        }
    };

    public get description(): string {
        return this._properties.find(prop => prop.propertieType === PropertieTypes.description)?.value || '';
    };
    public set description(value: string) {
        let prop = this._properties?.find(prop => prop.propertieType === PropertieTypes.description);
        if (prop) {
            prop.value = value;
        } else {
            this._properties.push({
                value,
                id: Utils.getUUID(),
                name: PropertieTypes.label,
                type: TypeOfValues.bigstring,
            });
        }
    };

    public get problems(): ITreeItem[] {
        let problems: ITreeItem[] = [];
        this.hasWarning = false;
        this.hasError = false;

        const addProblem = (label: string, type: 'warning' | 'error') => {
            problems.push({
                icon: type === 'warning' ? IconWarning : IconError,
                isDisabledSelect: true,
                nodeExpanded: false,
                isSelected: false,
                id: undefined,
                iconSize: 15,
                type: "ITEM",
                label,
            });
        };

        // Valida o label
        const label = this.label;
        if (label === '') {
            addProblem('Field Label cannot be empty', 'error');
            this._properties
                .filter(prop => prop.propertieType === PropertieTypes.label)
                .forEach(prop => { prop.valueHasWarning = false; prop.valueHasError = true });
            this.hasError = true;
        } else if (label.length < 3) {
            addProblem(`Field Label cannot be less than 3 characters in "${label}"`, 'error');
            this._properties
                .filter(prop => prop.propertieType === PropertieTypes.label)
                .forEach(prop => { prop.valueHasWarning = false; prop.valueHasError = true });
            this.hasError = true;
        } else if (label.length > 50) {
            addProblem(`More than 50 characters are not recommended in the item "${label}"`, 'warning');
            this._properties
                .filter(prop => prop.propertieType === PropertieTypes.label)
                .forEach(prop => { prop.valueHasWarning = true; prop.valueHasError = false });
            this.hasWarning = true;
        } else {
            this.properties
                .filter(prop => prop.propertieType === PropertieTypes.label)
                .forEach(prop => { prop.valueHasWarning = false; prop.valueHasError = false });
        }

        return problems;
    }

    private _properties: IProperty[] = [];
    public get properties(): IProperty[] { return this._properties };
    public set properties(props: IProperty[]) {

        // Remove auto focus
        props.forEach(prop => prop.focusOnRender = false);

        this._properties = props;
    }

    public type: T;
    public icon: any;
    public ordem?: number;
    public isExpanded?: boolean;
    public hasError: boolean = false;
    public isEditing: boolean = false;
    public isSelected: boolean = false;
    public hasWarning: boolean = false;
    public updatedDate: Date = new Date();
    public createdDate: Date = new Date();

    constructor(fields: Omit<IBasicConfigurations<T>, OmitInConstructor>) {
        this.type = fields.type;
        this.updatedDate = new Date();
        this.id = fields.id || this.id;
        this.icon = fields.icon || this.icon;
        this.ordem = fields.ordem || this.ordem;
        this.label = fields.label || this.label;
        this.hasError = fields.hasError || this.hasError;
        this.isEditing = fields.isEditing || this.isEditing;
        this.hasWarning = fields.hasWarning || this.hasWarning;
        this.isExpanded = fields.isExpanded || this.isExpanded;
        this.isSelected = fields.isSelected || this.isSelected;
        this.properties = fields.properties || this.properties;
        this.createdDate = fields.createdDate || this.createdDate;
        this.description = fields.description || this.description;
    }
}

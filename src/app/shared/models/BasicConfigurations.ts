import { IconError, IconWarning, Utils } from "code-easy-components";

import { IFileContent, IProperty, TypeOfValues, ITreeItem } from "./../components/external";
import { IBasicConfigurations } from "./../interfaces";
import { AssetsService } from "../services";
import { PropertieTypes } from "./../enuns";


type OmitInConstructor<T> = Omit<IBasicConfigurations<T>, 'name' | 'problems' | 'hasError' | 'hasWarning' | 'addProblem'>;

export class BasicConfigurations<T> implements IBasicConfigurations<T> {

    private _id: string | undefined = undefined;
    public get id(): string | undefined {
        return this._id || Utils.getUUID();
    }
    public set id(uuid: string | undefined) {
        this._id = uuid || Utils.getUUID();
    }

    public get name(): string {
        let name = this.label.replace(/[^\w\s]/gi, '_');
        name = name.replaceAll(' ', '');
        name = name.toLocaleLowerCase();
        while (name.split('')[0] === '_') {
            let newName = name.split('')
            newName.shift();
            name = newName.join('');
        }

        return name;
    }

    public get label(): string {
        return this._properties.find(prop => prop.propertieType === PropertieTypes.label)?.value || '';
    }
    public set label(value: string) {
        value = value.trim();

        if (value.length < 2) return;

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
                propertieType: PropertieTypes.label,
            });
        }
    }

    public get description(): string {
        return this._properties.find(prop => prop.propertieType === PropertieTypes.description)?.value || '';
    }
    public set description(value: string) {
        let prop = this._properties?.find(prop => prop.propertieType === PropertieTypes.description);
        if (prop) {
            prop.value = value;
        } else {
            this._properties.push({
                value,
                id: Utils.getUUID(),
                type: TypeOfValues.bigstring,
                name: PropertieTypes.description,
                propertieType: PropertieTypes.description,
            });
        }
    }

    private _problems: ITreeItem[] = [];
    public get problems(): ITreeItem[] {
        this._problems = [];

        const label = this.label;
        if (label === '') {
            this.addProblem('Field Label cannot be empty', 'error');
            this._properties
                .filter(prop => prop.propertieType === PropertieTypes.label)
                .forEach(prop => { prop.valueHasWarning = false; prop.valueHasError = true });
        } else if (label.length < 3) {
            this.addProblem(`Field Label cannot be less than 3 characters in "${label}"`, 'warning');
            this._properties
                .filter(prop => prop.propertieType === PropertieTypes.label)
                .forEach(prop => { prop.valueHasWarning = true; prop.valueHasError = false });
        } else if (label.length > 50) {
            this.addProblem(`More than 50 characters are not recommended in the item "${label}"`, 'warning');
            this._properties
                .filter(prop => prop.propertieType === PropertieTypes.label)
                .forEach(prop => { prop.valueHasWarning = true; prop.valueHasError = false });
        } else {
            this.properties
                .filter(prop => prop.propertieType === PropertieTypes.label)
                .forEach(prop => { prop.valueHasWarning = false; prop.valueHasError = false });
        }

        return this._problems;
    }

    public addProblem(label: string, type: 'warning' | 'error') {
        this._problems.push({
            icon: type === 'warning' ? IconWarning : IconError,
            isDisabledSelect: true,
            nodeExpanded: false,
            isSelected: false,
            id: undefined,
            iconSize: 15,
            type: "ITEM",
            label,
        });
    }

    public get icon(): IFileContent {
        const icon = this._properties?.find(prop => prop.propertieType === PropertieTypes.icon)?.value;
        if (icon && icon.content) {
            return icon;
        } else {
            return {
                content: AssetsService.getIcon<T>(this.type),
                name: 'Default',
                type: 'image',
            };
        }
    }
    public set icon(value: IFileContent) {
        let prop = this._properties?.find(prop => prop.propertieType === PropertieTypes.icon);
        if (prop) {
            prop.value = value;
        } else {
            this._properties.push({
                id: Utils.getUUID(),
                editValueDisabled: true,
                type: TypeOfValues.binary,
                name: PropertieTypes.icon,
                propertieType: PropertieTypes.icon,
                value: {
                    content: AssetsService.getIcon<T>(this.type),
                    lastModified: new Date().getTime(),
                    name: `Default`,
                    type: 'image'
                },
            });
        }
    }

    private _properties: IProperty[] = [];
    public get properties(): IProperty[] { return this._properties };
    public set properties(props: IProperty[]) {

        // Remove auto focus
        props.forEach(prop => prop.focusOnRender = false);

        this._properties = props;
    }

    public get hasError(): boolean {
        return this.problems.filter(problem => problem.type === 'error').length > 0
    }

    public get hasWarning(): boolean {
        return this.problems.filter(problem => problem.type === 'warning').length > 0
    }

    public type: T;
    public ordem?: number;
    public isExpanded?: boolean;
    public isEditing: boolean = false;
    public isSelected: boolean = false;
    public updatedDate: Date = new Date();
    public createdDate: Date = new Date();

    constructor(fields: OmitInConstructor<T>) {
        this.type = fields.type;
        this.updatedDate = new Date();
        this.id = fields.id || this.id;
        this.ordem = fields.ordem || this.ordem;
        this.label = fields.label || this.label;
        this.isEditing = fields.isEditing || this.isEditing;
        this.isExpanded = fields.isExpanded || this.isExpanded;
        this.isSelected = fields.isSelected || this.isSelected;
        this.properties = fields.properties || this.properties;
        this.createdDate = fields.createdDate || this.createdDate;
        this.description = fields.description || this.description;
    }
}

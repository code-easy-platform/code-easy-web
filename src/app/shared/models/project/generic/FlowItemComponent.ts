import { IObservable, observe, set, transform } from "react-observing";
import { Utils } from "code-easy-components";

import { EFlowItemType, EItemType, IConnection, IFileContent, IProperty, TypeOfValues } from "./../../../components/external";
import { BasicConfigurations } from "../BasicConfigurations";
import { IFlowItemComponent } from "./../../../interfaces";
import { PropertiesEditorStore } from "./../../../stores";
import { PropertieTypes } from "./../../../enuns";
import { openModal } from "./../../../services";

interface INewItemParams {
  top: number;
  id: string;
  left: number;
  name: string;
  ordem: number;
  width: number;
  label: string;
  height: number;
  type: EItemType;
  hasError: boolean;
  updatedDate: Date;
  createdDate: Date;
  isEditing: boolean;
  isExpanded: boolean;
  isDisabled: boolean;
  isSelected: boolean;
  hasWarning: boolean;
  description: string;
  properties: IProperty[];
  isEditingTitle: boolean;
  connections: IConnection[];
  flowItemType: EFlowItemType;
  icon: IFileContent | undefined;
  isEnabledNewConnetion: boolean;
  isAcceptingConnections: boolean;
  isEditableOnDoubleClick: boolean;
}

/**
 * Fields passeds in constructor
 */
interface IConstructor<T> {
  connections?: IConnection[];
  properties: IProperty[];
  id?: string;
  type: T;
}

/**
 * Represents a full FlowItemComponent implementation
 */
export class FlowItemComponent<T extends EItemType = EItemType> extends BasicConfigurations<T> implements IFlowItemComponent<T> {

  public get top(): IObservable<number> {
    let prop = this.properties.value.find(prop => prop.propertieType.value === PropertieTypes.top)?.value;
    if (prop) {
      return prop;
    }

    prop = observe(0);

    this.properties.value = [
      ...this.properties.value,
      {
        value: prop,
        id: observe(Utils.getUUID()),
        name: observe(PropertieTypes.top),
        type: observe(TypeOfValues.hidden),
        propertieType: observe(PropertieTypes.top),

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

  public get left(): IObservable<number> {
    let prop = this.properties.value.find(prop => prop.propertieType.value === PropertieTypes.left)?.value;
    if (prop) {
      return prop;
    }

    prop = observe(0);

    this.properties.value = [
      ...this.properties.value,
      {
        value: prop,
        id: observe(Utils.getUUID()),
        type: observe(TypeOfValues.hidden),
        name: observe(PropertieTypes.left),
        propertieType: observe(PropertieTypes.left),

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

  public get isDisabled(): IObservable<boolean> {
    let prop = this.properties.value.find(prop => prop.propertieType.value === PropertieTypes.isDisabled)?.value;
    if (prop) {
      return prop;
    }

    prop = observe(false);

    this.properties.value = [
      ...this.properties.value,
      {
        value: prop,
        id: observe(Utils.getUUID()),
        type: observe(TypeOfValues.hidden),
        name: observe(PropertieTypes.isDisabled),
        propertieType: observe(PropertieTypes.isDisabled),

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

  public get width(): IObservable<number | undefined> {
    let prop = this.properties.value.find(prop => prop.propertieType.value === PropertieTypes.width)?.value;
    if (prop) {
      return prop;
    }

    prop = observe(40);

    this.properties.value = [
      ...this.properties.value,
      {
        value: prop,
        id: observe(Utils.getUUID()),
        type: observe(TypeOfValues.hidden),
        name: observe(PropertieTypes.width),
        propertieType: observe(PropertieTypes.width),

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

  public get height(): IObservable<number | undefined> {
    let prop = this.properties.value.find(prop => prop.propertieType.value === PropertieTypes.height)?.value;
    if (prop) {
      return prop;
    }

    prop = observe(40);

    this.properties.value = [
      ...this.properties.value,
      {
        value: prop,
        id: observe(Utils.getUUID()),
        type: observe(TypeOfValues.hidden),
        name: observe(PropertieTypes.height),
        propertieType: observe(PropertieTypes.height),

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

  public get flowItemType(): IObservable<EFlowItemType> {
    let prop = this.properties.value.find(prop => prop.propertieType.value === PropertieTypes.flowItemType)?.value;
    if (prop) {
      return prop;
    }

    prop = observe(EFlowItemType.acorn);

    this.properties.value = [
      ...this.properties.value,
      {
        value: prop,
        id: observe(Utils.getUUID()),
        type: observe(TypeOfValues.hidden),
        name: observe(PropertieTypes.flowItemType),
        propertieType: observe(PropertieTypes.flowItemType),

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

  public get isEnabledNewConnetion(): IObservable<boolean | undefined> {
    let prop = this.properties.value.find(prop => prop.propertieType.value === PropertieTypes.isEnabledNewConnetion)?.value;
    if (prop) {
      return prop;
    }

    prop = observe(false);

    this.properties.value = [
      ...this.properties.value,
      {
        value: prop,
        id: observe(Utils.getUUID()),
        type: observe(TypeOfValues.hidden),
        name: observe(PropertieTypes.isEnabledNewConnetion),
        propertieType: observe(PropertieTypes.isEnabledNewConnetion),

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

  public get isEditableOnDoubleClick(): IObservable<boolean | undefined> {
    let prop = this.properties.value.find(prop => prop.propertieType.value === PropertieTypes.isEditableOnDoubleClick)?.value;
    if (prop) {
      return prop;
    }

    prop = observe(false);

    this.properties.value = [
      ...this.properties.value,
      {
        value: prop,
        id: observe(Utils.getUUID()),
        type: observe(TypeOfValues.hidden),
        name: observe(PropertieTypes.isEditableOnDoubleClick),
        propertieType: observe(PropertieTypes.isEditableOnDoubleClick),

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

  public get isAcceptingConnections(): IObservable<boolean | undefined> {
    let prop = this.properties.value.find(prop => prop.propertieType.value === PropertieTypes.isAcceptingConnections)?.value;
    if (prop) {
      return prop;
    }

    prop = observe(false);

    this.properties.value = [
      ...this.properties.value,
      {
        value: prop,
        id: observe(Utils.getUUID()),
        type: observe(TypeOfValues.hidden),
        name: observe(PropertieTypes.isAcceptingConnections),
        propertieType: observe(PropertieTypes.isAcceptingConnections),

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

  public get isEditingTitle(): IObservable<boolean | undefined> {
    let prop = this.properties.value.find(prop => prop.propertieType.value === PropertieTypes.isEditingTitle)?.value;
    if (prop) {
      return prop;
    }

    prop = observe(false);

    this.properties.value = [
      ...this.properties.value,
      {
        value: prop,
        id: observe(Utils.getUUID()),
        type: observe(TypeOfValues.hidden),
        name: observe(PropertieTypes.isEditingTitle),
        propertieType: observe(PropertieTypes.isEditingTitle),

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

  public get isSelected() {
    const handleSelect = (value: boolean): boolean => {
      if (value) {
        set(PropertiesEditorStore, {
          id: this.id,
          name: this.label,
          subname: transform(this.type, value => String(value)),
          properties: transform(this.properties, properties => properties.map(prop => {
            return {
              ...prop,
              onPickerValueClick: observe(() => openModal(prop.id.value || ''))
            };
          }))
        });
      } else if (PropertiesEditorStore.value?.id.value === this.id.value) {
        set(PropertiesEditorStore, undefined);
      }
      return value;
    }

    return transform(super.isSelected, value => value, handleSelect);
  }

  private _connections: IObservable<IConnection[]>;
  public get connections(): IObservable<IConnection[]> {
    return this._connections;
  }

  constructor(props: IConstructor<T>) {
    super(props);

    this._connections = observe(props.connections || []);
  }

  public static defaultProperties(props?: Partial<INewItemParams>): IFlowItemComponent {
    return {
      id: observe(props?.id),
      icon: observe(props?.icon),
      ordem: observe(props?.ordem),
      width: observe(props?.width),
      top: observe(props?.top || 0),
      height: observe(props?.height),
      left: observe(props?.left || 0),
      name: observe(props?.name || ''),
      label: observe(props?.label || ''),
      hasError: observe(props?.hasError),
      isEditing: observe(props?.isEditing),
      hasWarning: observe(props?.hasWarning),
      properties: observe(props?.properties),
      isExpanded: observe(props?.isExpanded),
      createdDate: observe(props?.createdDate),
      description: observe(props?.description),
      updatedDate: observe(props?.updatedDate),
      isDisabled: observe(!!props?.isDisabled),
      isSelected: observe(!!props?.isSelected),
      type: observe(props?.type || EItemType.START),
      connections: observe(props?.connections || []),
      isEditingTitle: observe(props?.isEditingTitle),
      isEnabledNewConnetion: observe(props?.isEnabledNewConnetion),
      isAcceptingConnections: observe(props?.isAcceptingConnections),
      isEditableOnDoubleClick: observe(props?.isEditableOnDoubleClick),
      flowItemType: observe(props?.flowItemType || EFlowItemType.acorn),
    };
  }
}

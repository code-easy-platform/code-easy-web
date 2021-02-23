import React from 'react';
import { useObserver, useObserverValue } from 'react-observing';

import { ExpressionInput } from './../../expression-input/ExpressionInput';
import { IProperty } from './../../../interfaces';
import { useConfigs } from '../../../contexts';

interface IAssignProps extends IProperty<string> { }
export const Assign: React.FC<IAssignProps> = ({ ...props }) => {
    const { inputBorderError, inputBorderWarning, inputBorderDefault, inputTextError, inputTextWarning, inputTextDefault } = useConfigs();

    const onPickerValueClick = useObserverValue(props.onPickerValueClick);
    const onPickerNameClick = useObserverValue(props.onPickerNameClick);
    const editValueDisabled = useObserverValue(props.editValueDisabled);
    const editNameDisabled = useObserverValue(props.editNameDisabled);
    const nameSuggestions = useObserverValue(props.nameSuggestions);
    const valueHasWarning = useObserverValue(props.valueHasWarning);
    const nameHasWarning = useObserverValue(props.nameHasWarning);
    const valueHasError = useObserverValue(props.valueHasError);
    const focusOnRender = useObserverValue(props.focusOnRender);
    const nameHasError = useObserverValue(props.nameHasError);
    const suggestions = useObserverValue(props.suggestions);
    const [value, setValue] = useObserver(props.value);
    const [name, setName] = useObserver(props.name);

    const css_prop_item_input_name: React.CSSProperties = {
        border: nameHasError ? inputBorderError : nameHasWarning ? inputBorderWarning : inputBorderDefault,
        textDecoration: nameHasError ? inputTextError : nameHasWarning ? inputTextWarning : inputTextDefault,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: (
            (
                (!editNameDisabled && !editValueDisabled) ||
                (editNameDisabled && editValueDisabled)
            ) ||
            (!editNameDisabled && editValueDisabled)
        ) ? 0 : undefined,
    }
    const css_prop_item_input_value: React.CSSProperties = {
        textDecoration: valueHasError ? inputTextError : valueHasWarning ? inputTextWarning : inputTextDefault,
        border: valueHasError ? inputBorderError : valueHasWarning ? inputBorderWarning : inputBorderDefault,
        ...((!valueHasError && (!valueHasWarning || nameHasWarning)) ? { borderTop: 0 } : {}),
        borderTopLeftRadius: 0,
        paddingLeft: 30,

        borderTopRightRadius: (
            (
                (!editNameDisabled && !editValueDisabled) ||
                (editNameDisabled && editValueDisabled)
            ) ||
            (editNameDisabled && !editValueDisabled)
        ) ? 0 : undefined,
    }

    return (
        <div className="flex-column padding-s padding-bottom-none">
            <ExpressionInput
                value={name}
                placeholder={'Propertie'}
                autoFocus={focusOnRender}
                disabled={editNameDisabled}
                suggestions={nameSuggestions}
                id={'name_prop_id_' + props.id}
                style={css_prop_item_input_name}
                key={'name_prop_key_' + props.id}
                onPickerClick={onPickerNameClick}
                onChange={e => setName(e.currentTarget.value)}
                onSelectSuggest={option => setName(option.value.value.toString())}
            />
            <div style={{ alignItems: 'center' }}>
                <span
                    children='='
                    onClick={onPickerValueClick}
                    style={{ marginRight: -10, marginLeft: 10, width: 0, zIndex: 1, cursor: 'pointer' }}
                />
                <ExpressionInput
                    value={value}
                    placeholder={'Value'}
                    suggestions={suggestions}
                    disabled={editValueDisabled}
                    id={'value_prop_id_' + props.id}
                    style={css_prop_item_input_value}
                    key={'value_prop_key_' + props.id}
                    onPickerClick={onPickerValueClick}
                    onChange={e => setValue(e.currentTarget.value)}
                    onSelectSuggest={option => setValue(option.value.value.toString())}
                />
            </div>
        </div>
    );

}

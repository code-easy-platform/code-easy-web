import React from 'react';
import { useObserver, useObserverValue } from 'react-observing';

import { IProperty } from '../../../interfaces';
import { useConfigs } from '../../../contexts';

const css_prop_item: React.CSSProperties = {
    justifyContent: 'space-between',
    height: 'min-content',
    alignItems: 'center',
    position: 'relative',
}
interface InputFullBigStringProps extends IProperty<string> { }
export const InputFullBigString: React.FC<InputFullBigStringProps> = ({ ...props }) => {
    const { inputBorderError, inputBorderWarning, inputBorderDefault, inputTextError, inputTextWarning, inputTextDefault } = useConfigs();

    const editValueDisabled = useObserverValue(props.editValueDisabled);
    const valueHasWarning = useObserverValue(props.valueHasWarning);
    const focusOnRender = useObserverValue(props.focusOnRender);
    const valueHasError = useObserverValue(props.valueHasError);
    const [value, setValue] = useObserver(props.value);
    const id = useObserverValue(props.id);

    return (
        <div style={css_prop_item} className="padding-s padding-bottom-none">
            <textarea
                onChange={e => setValue(e.currentTarget.value)}
                className={"full-width background-bars"}
                disabled={editValueDisabled}
                autoFocus={focusOnRender}
                id={'prop_id_' + id}
                autoComplete={"off"}
                value={value}
                style={{
                    textDecoration: valueHasError ? inputTextError : valueHasWarning ? inputTextWarning : inputTextDefault,
                    border: valueHasError ? inputBorderError : valueHasWarning ? inputBorderWarning : inputBorderDefault,
                    resize: 'vertical',
                    height: '100px',
                }}
            />
        </div>
    );
}

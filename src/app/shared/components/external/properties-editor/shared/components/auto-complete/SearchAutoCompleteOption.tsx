import React from 'react';
import { useObserverValue } from 'react-observing';

import { ISuggestion } from '../../interfaces';

interface ISearchAutoCompleteOptionProps extends ISuggestion {
  id: number;
  onSelect: () => void;
}
export const SearchAutoCompleteOption: React.FC<ISearchAutoCompleteOptionProps> = ({ id, onSelect, ...rest }) => {
  const description = useObserverValue(rest.description);
  const disabled = useObserverValue(rest.disabled);
  const label = useObserverValue(rest.label);

  return (
    <li className="option-item">
      <input
        tabIndex={0}
        type={"radio"}
        name={"option"}
        id={String(id)}
        disabled={disabled}
        onKeyDown={e => {
          if (!disabled && (e.keyCode === 13 || e.keyCode === 32)) {
            onSelect();
          }
        }}
      />
      <label
        htmlFor={String(id)}
        title={label + "\n\n" + description}
        className={`flex1 padding-s text-ellipsis${disabled ? ' disabled' : ''}`}
        onMouseDown={disabled ? undefined : e => {
          if (onSelect && !disabled) {
            onSelect();
          }
        }}
      >{label}</label>
    </li>
  );
}
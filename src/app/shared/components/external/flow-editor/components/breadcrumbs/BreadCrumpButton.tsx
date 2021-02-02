import React from 'react';
import { observe, useObserverValue } from 'react-observing';

import { IBreadCrumbButton } from '../../shared/interfaces';

interface IBreadCrumpButtonProps extends IBreadCrumbButton {
  id: number;
  onFocus: (event: React.FocusEvent<HTMLInputElement>) => void;
  onLabelClick: (event: React.MouseEvent<HTMLLabelElement, MouseEvent>) => void;
}
export const BreadCrumpButton: React.FC<IBreadCrumpButtonProps> = ({ label: _label, onClick: _onClick, disabled: _disabled = observe(false), id, onFocus, onLabelClick }) => {
  const disabled = useObserverValue(_disabled);
  const onClick = useObserverValue(_onClick);
  const label = useObserverValue(_label);

  return (
    <li className="breadcrumb-item">
      <input
        tabIndex={0}
        type={"radio"}
        id={String(id)}
        onFocus={onFocus}
        name={"breadcrumb"}
        disabled={disabled}
        onKeyDown={e => {
          if (!disabled && (e.keyCode === 13 || e.keyCode === 32)) {
            onClick(e);
          }
        }}
      />
      <label
        htmlFor={String(id)}
        style={{ cursor: disabled ? 'default' : 'pointer' }}
        onClick={disabled ? undefined : e => {
          onLabelClick(e);
          onClick(e);
        }}
      >{label}</label>
    </li>
  );
}

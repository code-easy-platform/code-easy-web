import React from 'react';
import Switch from 'react-switch';

export const DefaultSwitch = ({ id, checked = false, onChange, hasError = false, desabled = false }: { id?: any, checked: boolean, onChange(value: boolean): void, hasError: boolean, desabled: boolean | undefined }) => {
    return (
        <Switch
            offColor={hasError ? "#960000" : "#2c2c2c"}
            onColor={hasError ? "#960000" : "#2c2c2c"}
            offHandleColor={"#616161"}
            className={"input-border"}
            activeBoxShadow={"unset"}
            onHandleColor={"#d6d6d6"}
            uncheckedIcon={true}
            boxShadow={"unset"}
            onChange={onChange}
            disabled={desabled}
            handleDiameter={20}
            checkedIcon={true}
            autoComplete='off'
            checked={checked}
            height={25}
            width={50}
            id={id}
        />
    );
}

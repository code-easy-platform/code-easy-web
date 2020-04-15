import React from 'react';
import Switch from 'react-switch';

export const DefaultSwitch = ({ id, checked = false, onChange, hasError = false }: { id?: any, checked: boolean, onChange(value: boolean): void, hasError: boolean }) => {
    return (
        <Switch
            activeBoxShadow={"0px 0px 1px 10px rgba(0, 0, 0, 0.2)"}
            boxShadow={"0px 1px 5px rgba(0, 0, 0, 0.6)"}
            offColor={hasError ? "#960000" : "#2c2c2c"}
            onColor={hasError ? "#960000" : "#2c2c2c"}
            offHandleColor={"#616161"}
            onHandleColor={"#d6d6d6"}
            uncheckedIcon={true}
            onChange={onChange}
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

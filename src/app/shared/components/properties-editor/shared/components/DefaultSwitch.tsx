import React from 'react';
import Switch from 'react-switch';

export const DefaultSwitch = ({ id, checked = false, onChange }: { id?: any, checked: boolean, onChange(value: boolean): void }) => {
    return (
        <Switch
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            offHandleColor="#616161"
            onHandleColor="#d6d6d6"
            uncheckedIcon={true}
            onChange={onChange}
            handleDiameter={20}
            checkedIcon={true}
            offColor="#2c2c2c"
            checked={checked}
            onColor="#2c2c2c"
            height={25}
            width={50}
            id={id}
        />
    );
}

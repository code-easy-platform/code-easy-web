import React, { memo } from 'react';

import './Button.css';

interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    icon?: string;
    size?: 'xs' | 's' | 'm' | 'g' | 'xg'
}
export const Button = memo((props: ButtonProps) => {

    return (
        <button {...props} className={`btn background-transparent outline-none btn-${props.size || 'm'}`}>
            {props.icon && <img src={props.icon} className="icon-button" alt={props.icon} />}
            {props.children}
        </button>
    );
});

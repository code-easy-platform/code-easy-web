import React from 'react';
import { Icon } from '../../icon/icon';

export const Variable = (props: any) => {
    const variableName: string = props.variableName;
    const expanded: boolean = props.expanded;
    
    // const variableOnClick = props.onClick;
    /* onClick={variableOnClick} */

    return (
        <div>
            {expanded === false && <Icon iconName="" />}
            {expanded === true && <Icon iconName="" />}
            {variableName}
        </div>
    );
}

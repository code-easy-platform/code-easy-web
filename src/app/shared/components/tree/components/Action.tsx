import React from 'react';
import { Icon } from '../../icon/icon';

export const Action = (props: any) => {
    const actionName: string = props.actionName;
    const expanded: boolean = props.expanded;
    const actionOnClick = props.onClick;
    const actionOnDoubleClick = props.onDoubleClick;

    return(
        <div>
            {expanded === false && <Icon onClick={actionOnClick} onDoubleClick={actionOnDoubleClick} iconName="btn-expand-folder" />}
            {expanded === true && <Icon onClick={actionOnClick} onDoubleClick={actionOnDoubleClick} iconName="btn-collapse-folder" />}
            {actionName}
        </div>
    );
}

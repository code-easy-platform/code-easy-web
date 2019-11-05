import React from 'react';
import { Icon } from '../../icon/icon';

export const Folder = (props: any) => {
    const folderName: string = props.folderName;
    const expanded: boolean = props.expanded;

    return(
        <div>
            {expanded === false && <Icon iconName="btn-expand-folder" />}
            {expanded === true && <Icon iconName="btn-collapse-folder" />}
            {folderName}
        </div>
    );
}

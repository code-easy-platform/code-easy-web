import React from 'react';
import { Icon } from '../../icon/icon';

export const Folder = (props: any) => {
    const folderName: string = props.folderName;
    const expanded: boolean = props.expanded;
    const folderOnClick = props.onClick;

    return(
        <div>
            {expanded === false && <Icon onClick={folderOnClick} iconName="btn-expand-folder" />}
            {expanded === true && <Icon onClick={folderOnClick} iconName="btn-collapse-folder" />}
            {folderName}
        </div>
    );
}

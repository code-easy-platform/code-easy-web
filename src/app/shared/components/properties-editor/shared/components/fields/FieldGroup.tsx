import React, { useState, useCallback } from 'react';
import { IconExpandedFolder, IconCollapsedFolder } from 'code-easy-components';

import { LocalStorageService } from '../../local-storage/LocalStorage';

interface FieldGroupProps {
    group: string;
}
export const FieldGroup: React.FC<FieldGroupProps> = ({ children, group }) => {
    const [isOpen, setIsOpen] = useState(LocalStorageService.getGroupsInOpen(group));

    const handleOnClick = useCallback(() => {
        setIsOpen(!isOpen);
        LocalStorageService.setGroupsInOpen(group, !isOpen);
    }, [isOpen, group]);

    return (
        <div className="flex-column">
            <hr className="hr hr-white margin-top-m " />
            <div
                className="padding-top-m padding-bottom-m padding-horizontal-s flex-space-between"
                style={{ cursor: 'pointer' }}
                onClick={handleOnClick}
            >
                {group.toUpperCase()}
                {isOpen
                    ? <img src={IconCollapsedFolder} alt="icon" />
                    : <img src={IconExpandedFolder} alt="icon" />
            }
            </div>
            {isOpen && <div className="flex-column fade-in">
                {children}
            </div>}
        </div>
    );
}

import React from 'react';
import './icon.css';

/**
 * @param icon Icone a ser exibido.
 * @param show Mostra ou não o icone.
 * @param onClick Uma função como callBack.
 * @param iconName Nome do icone a ser exibido.
 * @param onDoubleClick Uma função como callBack.
 */
interface IconProps {
    icon: any;
    show: boolean;
    iconName: string;
    onClick?(e: React.MouseEvent<HTMLImageElement, MouseEvent>): void;
    onDoubleClick?(e: React.MouseEvent<HTMLImageElement, MouseEvent>): void;
}
export const Icon: React.FC<IconProps> = ({ onClick, onDoubleClick, icon, iconName, show }) => (
    (show !== undefined)
        ? (show !== false)
            ? <img
                width={15}
                src={icon}
                height={15}
                className="margin-xs"
                onClick={onClick}
                alt={"TreeItem" + iconName}
                onDoubleClick={onDoubleClick}
            />
            : <></>
        : <></>
);

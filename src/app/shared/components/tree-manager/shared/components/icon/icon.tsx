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
    iconSize?: number;
    iconName: string;
    onClick?(e: React.MouseEvent<HTMLImageElement, MouseEvent>): void;
    onDoubleClick?(e: React.MouseEvent<HTMLImageElement, MouseEvent>): void;
}
export const Icon: React.FC<IconProps> = ({ onClick, onDoubleClick, icon, iconName, show, iconSize = 25 }) => {

    if (show === undefined) return null;
    if (show === false) return null;

    return (
        <img
            src={icon}
            width={iconSize}
            height={iconSize}
            onClick={onClick}
            alt={"TreeItem" + iconName}
            onDoubleClick={onDoubleClick}
            style={{ margin: 4, marginRight: 10 }}
        />
    );
}
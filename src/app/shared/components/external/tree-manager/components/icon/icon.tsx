import React, { memo, useCallback } from 'react';
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
export const Icon: React.FC<IconProps> = memo(({ onClick, onDoubleClick, icon, iconName, show, iconSize = 25 }) => {

    const handleOnClick = useCallback((e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        e.stopPropagation();
        e.preventDefault();

        onClick && onClick(e);
    }, [onClick]);

    const handleOnDoubleClick = useCallback((e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        e.stopPropagation();
        e.preventDefault();

        onDoubleClick && onDoubleClick(e);
    }, [onDoubleClick]);

    if (show === undefined) return null;
    if (show === false) return null;

    return (
        <img
            alt=""
            src={icon}
            width={iconSize}
            height={iconSize}
            onMouseDown={handleOnClick}
            onDoubleClick={handleOnDoubleClick}
            style={{ marginRight: 4, marginLeft: 4 }}
        />
    );
});

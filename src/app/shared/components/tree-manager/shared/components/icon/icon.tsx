import React from 'react';
import './icon.css';

/**
 * @param icon Icone a ser exibido.
 * @param show Mostra ou não o icone.
 * @param onClick Uma função como callBack.
 * @param iconName Nome do icone a ser exibido.
 * @param onDoubleClick Uma função como callBack.
 */
export const Icon = (props: any) => (
    props.show !== undefined && props.show === false
        ? <></>
        : <div
            onClick={props.onClick}
            onDoubleClick={props.onDoubleClick}
            className={"default " + props.iconName}
            style={{ backgroundImage: `url('${props.icon}')` }}
        />
);

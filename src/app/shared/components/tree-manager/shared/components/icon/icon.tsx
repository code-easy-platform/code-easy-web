import React from 'react';
import './icon.scss';

/**
 * @param onClick Uma função como callBack.
 * @param onDoubleClick Uma função como callBack.
 * @param iconName Nome do icone a ser exibido.
 */
export const Icon = (props: any) => <div onClick={props.onClick} onDoubleClick={props.onDoubleClick} className={"default " + props.iconName} ></div>;

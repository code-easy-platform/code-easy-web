import React from 'react';
import './icon.scss';

export const Icon = (props: any) => <div onClick={props.onClick} onDoubleClick={props.onDoubleClick} className={"default " + props.iconName} ></div>;

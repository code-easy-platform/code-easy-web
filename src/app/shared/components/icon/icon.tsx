import React from 'react';
import './icon.scss';

export const Icon = (props: any) => <div onClick={props.onClick} className={"default " + props.iconName} ></div>;

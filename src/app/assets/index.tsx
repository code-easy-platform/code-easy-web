import React from 'react';

import BackgroundEmptyImg from './Background-empty.png';
import BackgroundEmptyLeftImg from './Background-empty-left.png';

export const BackgroundEmpty: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = (props) => <img alt="Background" src={BackgroundEmptyImg} {...props} />;
export const BackgroundEmptyLeft: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = (props) => <img alt="Background" src={BackgroundEmptyLeftImg} {...props} />;

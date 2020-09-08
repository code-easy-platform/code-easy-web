import React from 'react';

import BackgroundEmptyLeftToTopImg from './Background-empty-left-to-top.png';
import BackgroundEmptyLeftImg from './Background-empty-left.png';
import BackgroundEmptyImg from './Background-empty.png';

export const BackgroundEmpty: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = (props) => <img alt="Background" src={BackgroundEmptyImg} {...props} />;
export const BackgroundEmptyLeft: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = (props) => <img alt="Background" src={BackgroundEmptyLeftImg} {...props} />;
export const BackgroundEmptyLeftToTop: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = (props) => <img alt="Background" src={BackgroundEmptyLeftToTopImg} {...props} />;

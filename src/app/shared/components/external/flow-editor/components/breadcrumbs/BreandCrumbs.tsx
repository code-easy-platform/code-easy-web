import React, { memo, useRef, useEffect } from 'react';

import { IBreadCrumbButton } from '../../shared/interfaces';
import { BreadCrumpButton } from './BreadCrumpButton';
import './BreandCrumbs.css';

interface BreandCrumbsProps {
    breadcrumbs?: IBreadCrumbButton[];
    backgroundColor?: string;
    elevationColor?: string;
    useElevation?: boolean;
    borderColor?: string;
    textColor?: string;
}
const BreandCrumbs: React.FC<BreandCrumbsProps> = ({ breadcrumbs = [], backgroundColor, textColor, borderColor, useElevation = false, elevationColor = 'black' }) => {
    const ulRef = useRef<any>(null);
    useEffect(() => {
        if (ulRef.current) {
            ulRef.current.scrollTo(10000, 0);
        }
    }, []);

    if (breadcrumbs.length === 0) return null;

    return (
        <ul
            ref={ulRef}
            className="breadcrumb"
            style={{
                backgroundColor,
                color: textColor, borderColor,
                boxShadow: useElevation ? `5px 0px 6px 0px ${elevationColor}` : 'unset',
            }}>
            {breadcrumbs.map((breadcrumb, index) => {
                return (
                    <BreadCrumpButton
                        id={index}
                        key={index}
                        label={breadcrumb.label}
                        onClick={breadcrumb.onClick}
                        disabled={breadcrumb.disabled}
                        onFocus={e => ulRef.current.scrollTo(e.currentTarget.offsetLeft - 100, 0)}
                        onLabelClick={e => ulRef.current.scrollTo(e.currentTarget.offsetLeft - 100, 0)}
                    />
                );
            })}
        </ul>
    );
};

export default memo(BreandCrumbs);

import React, { memo, useRef, useEffect } from 'react';

import { IBreadCrumbButton } from '../../shared/interfaces';
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
            {breadcrumbs.map(({ label, onClick, disabled }, index) => {
                return (
                    <li key={index} className="breadcrumb-item">
                        <input
                            tabIndex={0}
                            type={"radio"}
                            id={String(index)}
                            name={"breadcrumb"}
                            disabled={disabled}
                            onFocus={e => ulRef.current.scrollTo(e.currentTarget.offsetLeft - 100, 0)}
                            onKeyDown={e => {
                                if (!disabled && (e.keyCode === 13 || e.keyCode === 32)) {
                                    onClick(e);
                                }
                            }}
                        />
                        <label
                            htmlFor={String(index)}
                            onClick={disabled ? undefined : e => {
                                ulRef.current.scrollTo(e.currentTarget.offsetLeft - 100, 0);
                                onClick(e);
                            }}
                        >{label}</label>
                    </li>
                );
            })}
        </ul>
    );
};

export default memo(BreandCrumbs);

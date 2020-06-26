import React, { Fragment } from 'react';

import { IBreadCampButton } from '../../shared/Interfaces';
import './BreandCamps.css';

interface BreandCampsProps {
    breadcrumbs?: IBreadCampButton[];
}
export const BreandCamps: React.FC<BreandCampsProps> = ({ breadcrumbs = [] }) => {

    if (breadcrumbs.length === 0) return <></>;

    return (
        <div className="background-panels breadcrump-base absolute padding-xs padding-right-m text-ellipsis" >
            {breadcrumbs.map(({ label, onClick, disabled }, index) => {
                return (
                    <Fragment key={index}>
                        <button key={index} disabled={disabled} className="breadcrump-button" onClick={!disabled ? onClick : undefined} children={label} />
                        {((index + 1) !== breadcrumbs.length ? '/' : '')}
                    </Fragment>
                );
            })}
        </div>
    );
}

import React from 'react';

export const BreandCamps = ({ breadcrumbsPath }: any) => {
    const display = (breadcrumbsPath !== undefined && breadcrumbsPath !== '');

    return (
        display
            ? <div style={{ position: 'absolute', backgroundColor: '#3c3c3c54', padding: 4, paddingRight: 10, borderBottomRightRadius: 2 }}>{breadcrumbsPath}</div>
            : <></>
    );
}

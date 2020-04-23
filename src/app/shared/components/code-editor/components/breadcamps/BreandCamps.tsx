import React from 'react';

export const BreandCamps = ({ breadcrumbsPath }: any) => {
    const display = (breadcrumbsPath !== undefined && breadcrumbsPath !== '');

    return (
        display
            ? <div
                style={{
                    zIndex: 1,
                    padding: 4,
                    paddingRight: 10,
                    position: 'absolute',
                    borderBottomRightRadius: 2,
                    backgroundColor: 'var(--main-background-panels)',
                }}
            >
                {breadcrumbsPath}
            </div>
            : <></>
    );
}

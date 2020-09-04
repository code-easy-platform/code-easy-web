import React from 'react';

interface IdeVersionPros {
    prefix?: string;
}
export const IdeVersion: React.FC<IdeVersionPros> = ({ prefix }) => {
    return (
        <>
            {prefix ? prefix : ""}
            {process.env.REACT_APP_VERSION}
        </>
    );
}

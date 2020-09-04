import React from 'react';

interface IHeaderProps {
    title: string;
    subtitle?: string;
    titleFontSize?: string;
    backgroundColor?: string;
    subtitleFontSize?: string;
}
export const Header: React.FC<IHeaderProps> = ({ title, subtitle, subtitleFontSize, titleFontSize, backgroundColor }) => {

    return (
        <div className="padding-m padding-left-s flex-column" style={{ backgroundColor, fontSize: titleFontSize }}>
            <div className="text-ellipsis" title={title}>{title}</div>
            {subtitle && <div title={subtitle} className="margin-top-s text-ellipsis" style={{ fontSize: subtitleFontSize }}>{subtitle}</div>}
        </div>
    );
} 

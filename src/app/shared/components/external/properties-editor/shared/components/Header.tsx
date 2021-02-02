import React from 'react';
import { IObservable, useObserverValue } from 'react-observing';

interface IHeaderProps {
    titleFontSize?: string;
    backgroundColor?: string;
    subtitleFontSize?: string;
    title: IObservable<string | undefined>;
    subtitle: IObservable<string | undefined>;
}
export const Header: React.FC<IHeaderProps> = ({ subtitleFontSize, titleFontSize, backgroundColor, ...props }) => {
    const subtitle = useObserverValue(props.subtitle);
    const title = useObserverValue(props.title);

    if (!(title !== "" || (subtitle && subtitle !== ""))) return null;

    return (
        <div className="padding-m padding-left-s flex-column" style={{ backgroundColor, fontSize: titleFontSize }}>
            <div className="text-ellipsis" title={title}>{title}</div>
            {subtitle && <div title={subtitle} className="margin-top-s text-ellipsis" style={{ fontSize: subtitleFontSize }}>{subtitle}</div>}
        </div>
    );
} 

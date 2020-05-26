import React, { useState } from 'react';

interface TooltipProps {
    elementRef: React.MutableRefObject<any>;
    description?: string;
}
export const Tooltip: React.FC<TooltipProps> = ({ description, elementRef }) => {
    const [visible, setVisible] = useState(false);

    if (elementRef.current) {
        elementRef.current.onmouseenter = () => {
            setVisible(true);
        }
        elementRef.current.onpointerleave = () => {
            setVisible(false);
        }
    }

    if (!visible) return <></>

    return (
        <div style={{ transform: 'translateY(70%)', zIndex: 5000, minWidth: 100, maxWidth: 250 }} className="absolute padding-s background-info box-shadow-small flex-column border-radius">
            {description}
        </div>
    );
}

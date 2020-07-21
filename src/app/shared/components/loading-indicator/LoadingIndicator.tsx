import React from 'react';

import './LoadingIndicator.css';

interface LoadingIndicatorProps {
    color?: string;
    size?: number;
}
export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ color = "#3498db", size = 12 }) => {
    return <div className="loader" style={{ borderTopColor: color, height: size, width: size }} />;
}

export const CenterLoadingIndicator = () => <div className="flex1 flex-content-center flex-items-center" children={<LoadingIndicator size={32} />} />;

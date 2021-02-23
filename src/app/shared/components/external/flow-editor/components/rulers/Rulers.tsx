import React, { memo } from 'react';

interface RulersProps {
    strokeColor?: string;
    rulers: number[];
}
export const Rulers: React.FC<RulersProps> = memo(({ rulers, strokeColor = 'gray' }) => {
    return (
        <>
            {rulers.map((ruler, index) => (
                <line
                    y1={0}
                    y2="100%"
                    key={index}
                    x1={ruler * 8}
                    x2={ruler * 8}
                    style={{ stroke: strokeColor, strokeWidth: 0.5 }}
                />
            ))}
        </>
    );
});

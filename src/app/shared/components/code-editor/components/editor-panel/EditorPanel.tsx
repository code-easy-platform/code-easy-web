import React from 'react';

export const EditorPanel = React.forwardRef((props: React.SVGProps<SVGSVGElement>, ref: any) => (
    <svg {...props}
        ref={ref}
        tabIndex={0}
        style={{
            outline: 'none',
            minWidth: '100%',
            minHeight: '100%',
        }}
    />
));

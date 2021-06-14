import { memo, useCallback } from "react";
import { VscChevronDown, VscChevronRight } from "react-icons/vsc";

interface ExpandCollapseProps {
    allowToggle?: boolean;
    isExpanded?: boolean;
    onClick?: () => void;
    display?: boolean;
}
export const ExpandCollapse: React.FC<ExpandCollapseProps> = memo(({ isExpanded = false, display = true, allowToggle = true, onClick }) => {

    const handleClick: React.MouseEventHandler<SVGElement> = useCallback(e => {
        e.stopPropagation();
        e.preventDefault();

        (onClick && allowToggle) && onClick();
    }, [allowToggle, onClick]);

    if (!display) return (
        <div style={{ width: 16, minWidth: 16, marginRight: 4, marginLeft: 4 }} />
    );

    if (isExpanded) return (
        <VscChevronDown
            size={16}
            tabIndex={-1}
            onClick={handleClick}
            onMouseDown={e => e.stopPropagation()}
            opacity={!allowToggle ? 0.5 : undefined}
            style={{ width: 16, minWidth: 16, marginRight: 4, marginLeft: 4, outline: 'none' }}
        />
    );

    return (
        <VscChevronRight
            size={16}
            tabIndex={-1}
            onClick={handleClick}
            onMouseDown={e => e.stopPropagation()}
            opacity={!allowToggle ? 0.5 : undefined}
            style={{ width: 16, marginRight: 4, marginLeft: 4, outline: 'none' }}
        />
    );
});

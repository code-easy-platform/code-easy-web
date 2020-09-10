export interface OpenWindow {
    id: string;
    title: string;
    hasError?: boolean;
    className?: string;
    useClose?: boolean;
    description?: string;
    hasWarning?: boolean;
    isSelected?: boolean;
}

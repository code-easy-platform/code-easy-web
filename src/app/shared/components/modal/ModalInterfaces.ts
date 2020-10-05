export interface ModalElement {
    setPosition(top: number, left: number): void;
    position: { top: number, left: number };
    toggleMaximize(): void;
    isMaximized: boolean;
    recenter(): void;
    isOpen: boolean;
    height: number;
    close(): void;
    focus(): void;
    width: number;
    open(): void;
}

export interface ModalProps {
    closeWithBackdropClick?: boolean;
    allowBackdropClick?: boolean;
    children: React.ReactNode;
    allowMaximize?: boolean;
    initialHeight?: number;
    isResizable?: boolean;
    initialWidth?: number;
    isDraggable?: boolean;
    isFocused?: boolean;
    onMaximize?(): void;
    onMinimize?(): void;
    maxHeight?: number;
    maxWidth?: number;
    onClose?(): void;
    onFocus?(): void;
    onBlur?(): void;
    isOpen: boolean;
    title?: string;
}

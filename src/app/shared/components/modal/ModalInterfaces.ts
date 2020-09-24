export interface ModalElement {
    setPosition(top: number, left: number): void;
    position: { top: number, left: number };
    toggleMaximize(): void;
    isMaximized: boolean;
    isOpen: boolean;
    close(): void;
    focus(): void;
    open(): void;
}

export interface ModalProps {
    closeWithBackdropClick?: boolean;
    allowBackdropClick?: boolean;
    children: React.ReactNode;
    initialHeight?: number;
    initialWidth?: number;
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

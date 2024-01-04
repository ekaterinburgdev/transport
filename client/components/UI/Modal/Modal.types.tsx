export type ModalProps = {
    title?: string,
    align?: 'top' | 'center',
    maxWidth?: number,
    onClose?: () => void;
    children: React.ReactNode;
};

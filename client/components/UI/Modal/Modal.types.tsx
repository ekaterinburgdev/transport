export type ModalProps = {
    title?: string,
    alignCenter?: boolean,
    maxWidth?: number,
    onClose?: () => void;
    children: React.ReactNode;
};

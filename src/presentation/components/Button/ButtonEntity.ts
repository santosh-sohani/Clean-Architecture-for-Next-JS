export interface ButtonEntity {
    label: string;
}

export interface ButtonProps {
    config: ButtonEntity;
    onClick: () => void;
}

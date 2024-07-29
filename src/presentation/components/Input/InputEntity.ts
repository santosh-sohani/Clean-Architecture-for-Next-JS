export interface InputEntity {
  type: string;
  placeholder: string;
  label: string;
  value?: string;
}

export interface InputProps {
  config: InputEntity;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}



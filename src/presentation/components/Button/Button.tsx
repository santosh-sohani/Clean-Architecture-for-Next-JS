import React from 'react';
import { ButtonStyle } from './ButtonStyle';
import { ButtonProps } from './ButtonEntity';

export const Button: React.FC<ButtonProps> = ({ config, onClick }) => {
  return (
    <button className={ButtonStyle.primary} onClick={onClick}>
        {config.label}
    </button>
  );
};

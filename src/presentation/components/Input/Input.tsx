import React from 'react'
import { InputProps } from './InputEntity'
import { InputStyle } from './InputStyle'

const Input: React.FC<InputProps> = ({ config, onChange }) => {
  return (
    <input
      className={InputStyle.primary}
      type={config.type}
      placeholder={config.placeholder}
      value={config.value}
      onChange={onChange}
    />
  )
}

export default Input

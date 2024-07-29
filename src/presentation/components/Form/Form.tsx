import React,{useState} from 'react'
import { formConfig } from './FormEntity'
import { FormProps } from './FormEntity'
import Input from '../Input/Input'
import { Button } from '../Button/Button'
import { FormStyle } from './FormStyle'

const Form: React.FC<FormProps> = ({config}) => {
  return (
    <div className={FormStyle.primary}>
        {
            config.inputs.map((input, key) => {
                return (
                    <div key={key}>
                      <Input config={input} />
                    </div>
                )
            })
        }
        <Button config={config.submitButton} onClick={() => console.log("clicked")}/>
    </div>
  )
}

export default Form
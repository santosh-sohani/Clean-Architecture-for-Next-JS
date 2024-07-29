import { ButtonEntity } from "../Button/ButtonEntity";
import { InputEntity } from "../Input/InputEntity";

export interface FormEntity {
    inputs: InputEntity[], 
    submitButton: ButtonEntity, 
}

export interface FormProps {
    config: FormEntity;
}



export const formConfig: FormEntity = {
    inputs: [
        {
            type: "text",
            placeholder: "Enter your name",
            label: "Name",
            
        },
        {
            type: "email",
            placeholder: "Enter your email",
            label: "Email",
        },
        {
            type: "password",
            placeholder: "Enter your password",
            label: "Password",
        },
    ],
    submitButton: {
        label: "Submit"
    },
}
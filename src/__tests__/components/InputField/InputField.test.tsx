import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'

import InputField from '@/presentation/components/InputField/InputField'

describe("Input Field Testing",()=>{
    test("Input Field rendering",()=>{
        render(<InputField />)
        const inputField = screen.getByRole('textbox')
        expect(inputField).toBeInTheDocument()
    })

    test("Input Field content testing",()=>{
        render(<InputField />)
        const inputField = screen.getByRole('textbox')
        expect(inputField).toHaveAttribute('placeholder','Enter Username')
        expect(inputField).toHaveValue('')
        expect(inputField).toHaveAttribute('type','text')
    })

    test("Input Field onChange testing",()=>{
        render(<InputField />)
        const inputField = screen.getByRole('textbox')
        fireEvent.change(inputField,{target:{value:'John'}})
        expect(inputField).toHaveValue('John')
    })
})
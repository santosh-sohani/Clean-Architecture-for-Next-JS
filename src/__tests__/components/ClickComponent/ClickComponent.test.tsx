import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'

import ClickComponent from '@/presentation/components/ClickComponent/ClickComponent'

describe("Click Component Testing",()=>{
    test("Click component rendering",()=>{
        render(<ClickComponent />)
        const button = screen.getByRole('button')
        expect(button).toBeInTheDocument()
    })
    test("Click component content testing",()=>{
        render(<ClickComponent />)
        const button = screen.getByText('Click')
        expect(button).toBeInTheDocument()
    })
    test("Click component click testing",()=>{
        render(<ClickComponent />)
        expect(screen.getByText(0)).toBeInTheDocument()
    })

    test("Click component click testing",()=>{
        render(<ClickComponent />)
        const button = screen.getByRole('button')
        fireEvent.click(button)
        expect(screen.getByText(1)).toBeInTheDocument()
    })
})
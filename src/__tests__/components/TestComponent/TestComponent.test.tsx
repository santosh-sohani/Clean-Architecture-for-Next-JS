import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import TestComponent from '@/presentation/components/TestComponent/TestComponent'
 
describe('TestComponent', () => {
  it('renders a heading', () => {
    render(<TestComponent />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
  })

  it('Contains Text Hello World', () => {
    render(<TestComponent />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent('Hello World')
  })

  it('Contains Text Paragarph For Testing Component', () => {
    render(<TestComponent />)
    const paragraph = screen.getByText('Paragarph For Testing Component')
    expect(paragraph).toBeInTheDocument()
  })
  
})
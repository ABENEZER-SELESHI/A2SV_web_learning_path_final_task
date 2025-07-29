// app/(components)/__tests__/JobCardButton.test.tsx
import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import JobCardButton from '../JobCardButton'

afterEach(() => {
  cleanup()
})

describe('JobCardButton', () => {
  it('renders with correct content and style', () => {
    render(<JobCardButton style="inPerson" content="In Person" />)
    const button = screen.getByRole('button', { name: /in person/i })
    expect(button).toBeInTheDocument()
  })
})

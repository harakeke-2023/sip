import React from 'react'
import { render, screen } from '@testing-library/react'
import List from './List'


test('renders a list of items', () => {
  render(<List />)
  const listElement = screen.getByText(/list/i)
  expect(listElement).toBeInTheDocument()
})













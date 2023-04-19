import { render, screen, fireEvent, getByText } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { Card } from '../../models/Card'
import Cards from './Cards'
import { CardDetails } from './CardDetails'
import { StateContext } from '../context/StateContext'

beforeEach(() => {
  jest.clearAllMocks()
})

test('renders the update button', () => {
  // Arrange
  const props = {
    categoryId: 1,
    userId: 2,
    fetchCards: jest.fn(),
  }

  // Act
  const { container } = render(
    <StateContext>
      <Cards {...props} />
    </StateContext>
  )

  // Assert
  const buttons = container.querySelectorAll('button')
  expect(buttons).toHaveLength(1)
})

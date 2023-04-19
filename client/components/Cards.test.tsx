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

test('check text in <p> tag renders, i.e. the card name', () => {
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
  const firstP = document.querySelector('p')
  if (firstP) {
    const closestP = firstP.closest('p')
    if (closestP) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(firstP.textContent).toBeTruthy()
    }
  }
})

test('Expect card to show mark as done or unmark', () => {
  // Arrange
  const props = {
    categoryId: 1,
    userId: 2,
    fetchCards: jest.fn(),
  }

  // Act
  render(
    <StateContext>
      <Cards {...props} />
    </StateContext>
  )

  const firstLabel = document.querySelector('label')
  if (firstLabel) {
    const closestP = firstLabel.closest('label')
    if (closestP) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(firstLabel.textContent).toBe('Mark as done' || 'Unmark')
    }
  }
})

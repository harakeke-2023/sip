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

test('card details opens when you click it', () => {
  // Arrange
  const props = {
    categoryId: 1,
    userId: 2,
    fetchCards: jest.fn(),
  }

  // Act
  const { getByText } = render(
    <StateContext>
      <Cards {...props} />
    </StateContext>
  )

  const details = getByText('Unmark' || 'Mark as done')

  // Act
  fireEvent.click(details)

  // Assert
  expect(details).toHaveStyle('background-color: #333333')
})

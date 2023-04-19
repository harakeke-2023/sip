import { render } from '@testing-library/react'
import Cards from './Cards'
import { StateContext } from '../context/StateContext'

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

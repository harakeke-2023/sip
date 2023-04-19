import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { Card } from '../../models/Card'
import { CardDetails } from './CardDetails'
import { StateContext } from '../context/StateContext'

test('card details opens when you click it', () => {
  // Arrange
  const card: Card = {
    id: 1,
    category_id: 1,
    user_id: 1,
    name: 'Save one hundred dollars every week',
    description: 'Make sure to keep it in savings account',
    date_created: 1660694092000,
    period: 604800000,
    location: 'Everywhere',
    completed: true,
    total_count: 0,
    comp_count: 20,
  }

  const props = { card: card }

  const { getByText, queryByText } = render(
    <StateContext>
      <CardDetails {...props} />
    </StateContext>
  )

  const details = getByText('Details' || 'Hide details')

  // Act
  fireEvent.click(details)

  // Assert
  expect(getByText(/Description/i)).toBeInTheDocument()
})

import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import MapPage from './MapPage'
import { StateContext } from '../context/StateContext'
import '@testing-library/jest-dom/extend-expect'

describe('MapPage', () => {
  it('renders without crashing', () => {
    render(
      <StateContext>
        <MapPage />
      </StateContext>
    )
  })

  it('does not display markers when there are no cards', () => {
    const { container } = render(
      <StateContext>
        <MapPage />
      </StateContext>
    )
    expect(container.querySelector('.map-pin')).not.toBeInTheDocument()
  })
})

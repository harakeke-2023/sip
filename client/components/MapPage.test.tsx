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

  it('displays map with markers when there are cards', async () => {
    const { container } = render(
      <StateContext>
        <MapPage />
      </StateContext>
    )

    await waitFor(() => {
      const map = screen.getByRole('presentation');
      expect(map).toBeInTheDocument();
    }, { timeout: 5000 });

    // Check that there are markers on the map
    const markers = screen.getAllByRole('img');
    expect(markers).toHaveLength(2);
  });
  

  it('does not display markers when there are no cards', () => {
    const { container } = render(
      <StateContext>
        <MapPage />
      </StateContext>
    )
    expect(container.querySelector('.map-pin')).not.toBeInTheDocument()
  })
})

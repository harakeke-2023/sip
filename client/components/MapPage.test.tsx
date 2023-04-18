import { render } from '@testing-library/react';
import MapPage from './MapPage';

test('renders the map with default center and zoom level', () => {
  const { container } = render(<MapPage />);
  const map = container.querySelector('.google-map-react');
  expect(map).toBeInTheDocument();
  expect(map.getAttribute('style')).toContain('height: 100vh');
  expect(map.getAttribute('style')).toContain('width: 100vw');
  expect(map.getAttribute('data-props')).toContain(JSON.stringify({ defaultCenter: { lat: -36.857703, lng: 174.761052 }, defaultZoom: 13 }));
});

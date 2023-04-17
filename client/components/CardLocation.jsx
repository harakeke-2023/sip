import React, { useState } from 'react'
import {
  GoogleMapsProvider,
  useGoogleMap,
} from '@ubilabs/google-maps-react-hooks'

const mapOptions = {
  zoom: 12,
  center: {
    lat: 43.68,
    lng: -79.43,
  },
}

const CardLocation = () => {
  const [mapContainer, setMapContainer] = useState(null)

  return (
    <GoogleMapsProvider
      googleMapsAPIKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
      options={mapOptions }
      mapContainer={mapContainer}
    >
      <div ref={(node) => setMapContainer(node)} style={{ height: '100vh' }} />
    </GoogleMapsProvider>
  )
}

export default CardLocation

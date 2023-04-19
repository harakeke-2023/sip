import React, { useState, useEffect } from 'react'
import GoogleMapReact from 'google-map-react'
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete'
import { getAddressFromCoordinates } from '../apis/map'

const AnyReactComponent = ({ text }) => <div></div>

const CardLocation = ({ address, setAddress, existingAddress }) => {
  const [center, setCenter] = useState({ lat: -36.857703, lng: 174.761052 })
  const [marker, setMarker] = useState(null)
  const [searchValue, setSearchValue] = useState('')
  const [searchSuggestions, setSearchSuggestions] = useState([])

  const {
    ready,
    value,
    suggestions: { data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete()

  useEffect(() => {
    if (marker) {
      console.log(marker)
      // Do something with the marker
      console.log(center)
    }
  }, [marker, center])

  useEffect(() => {
    if (value) {
      setSearchValue(value)
    }
  }, [value])

  useEffect(() => {
    console.log(address)
  }, [address])

  const handleApiLoaded = (map, maps) => {
    // Set the center of the map
    setCenter({ lat: map.center.lat(), lng: map.center.lng() })

    // Create a marker on the map
    const newMarker = new maps.Marker({
      position: { lat: map.center.lat(), lng: map.center.lng() },
      map,
      title: '',
    })

    // Update the state with the marker
    setMarker(newMarker)
  }

  const handleSearchChange = (e) => {
    // Update the search value state
    setValue(e.target.value)

    // If the search value is empty, clear the search suggestions
    if (e.target.value === '') {
      setSearchSuggestions([])
      return
    }

    // Get search suggestions from the Google Places API
    if (ready) {
      setSearchSuggestions(data)
    }
  }

  const handleSuggestionClick = async (suggestion) => {
    // Get the latitude and longitude of the selected suggestion
    const geocodeResults = await getGeocode({ address: suggestion.description })
    const { lat, lng } = await getLatLng(geocodeResults[0])

    // Set the center of the map to the selected suggestion
    setCenter({ lat, lng })

    // Set the marker at the selected suggestion
    marker.setPosition({ lat, lng })

    // Update the search value with the selected suggestion
    setSearchValue(suggestion.description)

    // Clear the search suggestions
    setSearchSuggestions([])

    getAddressFromCoordinates({ lat, lng }).then((res) =>
      setAddress(res.split(','))
    )
  }

  return (
    <div className="relative" style={{ height: '100%', width: '100%' }}>
      <div className="absolute top-0 left-0 z-10">
        <input
          className=" appearance-none block w-7/2 bg-perano-50 text-gray-700 rounded py-3 px-4 mt-3 ml-3 leading-tight focus:outline-none focus:bg-white"
          id="map"
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={handleSearchChange}
        />
        {searchSuggestions.map((suggestion) => (
          <div
            className=" text-left bg-slate-300"
            key={suggestion.place_id}
            onClick={() => handleSuggestionClick(suggestion)}
          >
            {suggestion.description}
          </div>
        ))}
      </div>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={center}
        defaultZoom={13}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        onClick={(e) => {
          // Set the center of the map to the selected suggestion
          setCenter({ lat: e.lat, lng: e.lng })
          // Set the marker at the selected suggestion
          marker.setPosition({ lat: e.lat, lng: e.lng })
          getAddressFromCoordinates({ lat: e.lat, lng: e.lng }).then((res) =>
            setAddress(() => res.split(','))
          )
        }}
      >
        {marker && (
          <AnyReactComponent
            lat={marker.position.lat()}
            lng={marker.position.lng()}
            text="My Marker"
          />
        )}
      </GoogleMapReact>
    </div>
  )
}

export default CardLocation

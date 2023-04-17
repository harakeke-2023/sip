import React, { useState, useEffect } from 'react'
import GoogleMapReact from 'google-map-react'
import { getCardsbyUserId } from '../apis/cards'
import { useStateContext } from '../context/StateContext'
import { searchByAddress } from '../apis/map'

const AnyReactComponent = ({ card }) => (
  <div className="py-6 px-6 bg-white  border-2 border-orange-300">
    <h2 className="font-bold text-2xl">{card.name}</h2>
  </div>
)

const MapPage = () => {
  const [center, setCenter] = useState({ lat: -36.857703, lng: 174.761052 })
  const [allCards, setAllCards] = useState([])
  const [markers, setMarkers] = useState([])
  const { userDetail } = useStateContext()

  useEffect(() => {
    if (userDetail.id) {
      getCardsbyUserId(userDetail.id).then((res) => setAllCards(res))
    }
  }, [userDetail])

  useEffect(() => {
    console.log(allCards)
  }, [allCards])

  useEffect(() => {
    if (allCards.length) {
      Promise.all(allCards.map((card) => searchByAddress(card.location))).then(
        (coords) => {
          setMarkers(
            coords.map((coord, i) => (
              <AnyReactComponent
                key={i}
                lat={coord.lat}
                lng={coord.lng}
                card={allCards[i]}
              />
            ))
          )
        }
      )
    }
  }, [allCards])

  return (
    <div className="relative" style={{ height: '100vh', width: '100vw' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={center}
        defaultZoom={13}
      >
        {/* {allCards.length &&
          allCards.map( async (card, i) => {
            if (!card.location) {
              return null
            }
            const coords = await searchByAddress(card.location)
            console.log(coords)
            return (
              <AnyReactComponent
                key={i}
                lat={coords.lat}
                lng={coords.lng}
                text="My Marker"
              />
            )
          })} */}
        {markers}
      </GoogleMapReact>
    </div>
  )
}

export default MapPage

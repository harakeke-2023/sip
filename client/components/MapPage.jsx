import React, { useState, useEffect } from 'react'
import GoogleMapReact from 'google-map-react'
import { getCardsbyUserId } from '../apis/cards'
import { useStateContext } from '../context/StateContext'
import { searchByAddress } from '../apis/map'

const AnyReactComponent = ({ card }) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      {open ? (
        <div
          className="rounded-xl  py-4 px-2"
          style={{
            border: '2px solid rgba(251, 146, 60)',
            width: 'fit-content',
            backgroundColor: 'rgba(255, 255, 255, 0.4)',
          }}
        >
          <div className="mt-4 mb-4 px-4">
            <h2 className="font-bold" style={{ fontSize: '2.8rem' }}>
              {card.name}
            </h2>

            <p className="mt-4" style={{ fontSize: '1.4rem' }}>
              {card.location}
            </p>
            <button onClick={() => setOpen((prev) => !prev)}>Close</button>
          </div>
        </div>
      ) : (
        <div onClick={() => setOpen((prev) => !prev)}>
          <i
            className="fa-sharp fa-solid fa-location-dot"
            style={{ fontSize: '2.4rem' }}
          ></i>
        </div>
      )}
    </>
  )
}

// const MarkersComponent = () => {
//   return (

//   )
// }

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

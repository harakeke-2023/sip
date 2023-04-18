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
          className="rounded-xl py-4 px-2"
          style={{
            border: '2px solid rgba(251, 146, 60)',
            width: 'fit-content',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.2)',
            borderRadius: '10px',
            transform: 'translateY(-100%)',
          }}
        >
          <div className="mt-4 mb-4 px-4">
            <h2 className="font-bold text-2xl" style={{ color: '#4B5563' }}>
              {card.name}
            </h2>

            <p className="mt-2 text-gray-500 text-sm">{card.location}</p>

            <button
              onClick={() => setOpen((prev) => !prev)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded"
              style={{
                transition: 'all 0.2s ease-in-out',
              }}
            >
              Close
            </button>
          </div>
        </div>
      ) : (
        <div onClick={() => setOpen((prev) => !prev)}>
          <i
            style={{ transform: 'translateY(-100%)', fontSize: '2.4rem' }}
            className="fa-sharp fa-solid fa-location-dot"
          ></i>
        </div>
      )}
    </>
  )
}

const MapPage = () => {
  const [center, setCenter] = useState({ lat: -36.857703, lng: 174.761052 })
  const [allCards, setAllCards] = useState([])
  const [markers, setMarkers] = useState([])
  const { userDetail, search } = useStateContext()

  useEffect(() => {
    if (userDetail.id) {
      getCardsbyUserId(userDetail.id)
        .then((res) => setAllCards(res))
        .catch((error) => console.log(error))
    }
  }, [userDetail])

  useEffect(() => {
    console.log(allCards)
  }, [allCards])

  useEffect(() => {
    if (allCards.length) {
      Promise.all(allCards.map((card) => searchByAddress(card.location)))
        .then((coords) => {
          console.log(coords)
          if (search.length) {
            setMarkers(
              coords.map(
                (coord, i) =>
                  allCards[i].name.toLowerCase().includes(search.toLowerCase()) && (
                    <AnyReactComponent
                      key={i}
                      lat={coord.lat}
                      lng={coord.lng}
                      card={allCards[i]}
                    />
                  )
              )
            )
          } else {
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
        })
        .catch((error) => console.log(error))
    }
  }, [allCards, search])

  return (
    <div className="relative" style={{ height: '100vh', width: '100vw' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={center}
        defaultZoom={13}
      >
        {markers}
      </GoogleMapReact>
    </div>
  )
}

export default MapPage

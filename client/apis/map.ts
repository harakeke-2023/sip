import request from 'superagent'

interface Coords {
  lat: number
  lng: number
}

export const getAddressFromCoordinates = async (coords: Coords) => {
  try {
    const { lat, lng } = coords
    const response = await request.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
    )

    return response.body.results[0].formatted_address
  } catch (error) {
    console.log(error)
  }
}

export const searchByAddress = async (address: string) => {
  try {
    const response = await request.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
    )
    const { lat, lng } = response.body.results[0].geometry.location
    return { lat, lng }
  } catch (error) {
    console.log(error)
  }
}

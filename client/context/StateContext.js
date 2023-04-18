import { createContext, useContext, useState, useReducer } from 'react'

const UserContext = createContext()

export const StateContext = ({ children }) => {
  const [userDetail, setUserDetail] = useState({})
  const [mapAPI, setMapAPI] = useState('')
  const [globalCards, setGlobalCards] = useState([])

  return (
    <UserContext.Provider
      value={{
        userDetail,
        setUserDetail,
        globalCards,
        setGlobalCards,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useStateContext = () => useContext(UserContext)

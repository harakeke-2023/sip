import { createContext, useContext, useState } from 'react'

const UserContext = createContext()

export const StateContext = ({ children }) => {
  const [userDetail, setUserDetail] = useState({})
  const [mapAPI, setMapAPI] = useState("")
  
  return (
    <UserContext.Provider
      value={{
        userDetail,
        setUserDetail,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useStateContext = () => useContext(UserContext)

import { createContext, useContext, useState, useReducer } from 'react'

const UserContext = createContext()

// const initialState = {
//   categories: [], // initial state for categories
//   // other state properties
// }

// function reducer(state, action) {
//   const { cardId, oldCategoryId, newCategoryId } = action.payload
//   switch (action.type) {
//     case 'MOVE_CARD':
//       // handle the move card action
//       // ...
//       // return {
//       //   ...state,
//       //   categories: state.categories.filter((c) => c.id !== action.payload),
//       // }
//       break
//     default:
//       return state
//   }
// }

export const StateContext = ({ children }) => {
  const [userDetail, setUserDetail] = useState({})
  const [mapAPI, setMapAPI] = useState('')
  // const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <UserContext.Provider
      value={{
        userDetail,
        setUserDetail,
        // state,
        // dispatch,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useStateContext = () => useContext(UserContext)

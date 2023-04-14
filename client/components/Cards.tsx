import { useEffect } from 'react'
import { getCards } from '../apis/cards'
import { useStateContext } from '../context/StateContext'

const Cards = () => {
  const { userDetail } = useStateContext()

  useEffect(() => {
    if (userDetail.id) {
      getCards(userDetail.id)
        .then((res) => {
          console.log(res)
          return res
        })
        .catch((err) => console.log(err))
    }
  }, [userDetail])

  return <div>cards</div>
}

export default Cards

import { useEffect, useState } from 'react'
import { getCards } from '../apis/cards'
import { useStateContext } from '../context/StateContext'
import { Ripple, Input, initTE } from 'tw-elements'

import { Card } from '../../models/Card'

interface Props {
  categoryId: number
}

const Cards = (props: Props) => {
  const { userDetail } = useStateContext()
  const [cards, setCards] = useState([])

  async function fetchCards(userId: number) {
    try {
      const res = await getCards(userId)
      setCards(() => res)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (userDetail.id) {
      fetchCards(props.categoryId)
    }
  }, [userDetail])


  // const categoryCards = cards.filter(
  //   (card: Card) => card.category_id === categoryId
  // )

  function getDate(dateCreated: number, period: number) {
    // const currentDate = new Date().getTime()
    const goalDateEpoch = dateCreated + period
    const goalDate = new Date(goalDateEpoch).toLocaleString('en-GB', {
      timeZone: 'Pacific/Auckland',
    })
    return goalDate
  }

  return (
    <div className="flex flex-row">
      {cards.map((card: Card) => (
        <div
          key={card.id}
          className="bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 block max-w-md  p-6 "
        >
          <p>{card.name}</p>
          <p>Description: {card.description}</p>
          <p>End date: {getDate(card.date_created, card.period)}</p>
          <p>Location: {card.location}</p>
        </div>
      ))}
    </div>
  )
}

export default Cards

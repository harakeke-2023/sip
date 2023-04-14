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

  console.log(cards)

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
    <div>
      {cards.map((card: Card) => (
        <div
          key={card.id}
          className="block max-w-md rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700"
        >
          <p>{card.name}</p>
          <p>Description: {card.description}</p>
          <p>End date: {getDate(card.period)}</p>
          <p>Location: {card.location}</p>
        </div>
      ))}
    </div>
  )
}

export default Cards

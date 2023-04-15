import { useEffect, useState } from 'react'
import { getCards, updateCard } from '../apis/cards'
import { useStateContext } from '../context/StateContext'
import { Ripple, Input, initTE } from 'tw-elements'

import { Card } from '../../models/Card'
import GetTimeLeft from './GetDate'

interface Props {
  categoryId: number
}

const Cards = (props: Props) => {
  const { userDetail } = useStateContext()
  const [cards, setCards] = useState([] as Card[])

  async function fetchCards(userId: number) {
    try {
      const res = await getCards(userId)
      console.log(res)
      setCards(() => [...res])
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

  async function handleComplete(e: any, card: Card) {
    console.log(e.target.checked)
    await updateCard({ ...card, completed: e.target.checked })
    await fetchCards(props.categoryId)
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

          <GetTimeLeft
            card={card}
            dateCreated={card.date_created}
            period={card.period}
          />
          <input
            onChange={(e) => handleComplete(e, card)}
            checked={card.completed}
            type="checkbox"
            id={String(card.id)}
            name="complete"
          />
          <label htmlFor={String(card.id)}>Completed</label>
          <p>Location: {card.location}</p>
        </div>
      ))}
    </div>
  )
}

export default Cards

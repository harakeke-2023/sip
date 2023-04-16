import { CardDetails } from './CardDetails'
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
      setCards(() => [...res])
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (props.categoryId) {
      fetchCards(props.categoryId)
    }
  }, [props.categoryId])

  async function handleComplete(e: any, card: Card) {
    await handleCardUpdate({ ...card, completed: e.target.checked })
    await fetchCards(props.categoryId)
    console.log('card', card.completed)
  }

  async function handleCardUpdate(updatedCard: Card) {
    await updateCard(updatedCard)
    fetchCards(props.categoryId)
    console.log('updated card', updatedCard.completed)
  }

  return (
    <div className="flex flex-row leading-relaxed">
      {cards.map((card: Card) => (
        <div
          key={card.id}
          className="border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 block max-w-md  p-6 "
          style={{ background: card.completed ? 'darkgray' : 'white' }}
        >
          <strong>
            <p
              className="mb-2"
              style={{ fontSize: '1.2rem', fontWeight: 'bold' }}
            >
              {card.name}
            </p>
          </strong>

          <CardDetails card={card} />
          <br></br>
          <input
            className="bg-black"
            style={{ display: 'none' }}
            onChange={(e) => handleComplete(e, card)}
            checked={card.completed}
            type="checkbox"
            id={String(card.id)}
            name="complete"
          />
          <label
            className={
              'cursor-pointer opacity-90 dark:active:shadow-[0_8px_9px_-4px_rgba(51, 51, 51, 0.2),0_4px_18px_0_rgba(51, 51, 51,0.1)]] inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#8c8c8c] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(51, 51, 51,0.3),0_4px_18px_0_rgba(51, 51, 51, 0.2)]  focus:shadow-[0_8px_9px_-4px_rgba(51, 51, 51,0.3),0_4px_18px_0_rgba(51, 51, 51, 0.2)] focus:outline-none focus:ring-0active:shadow-[0_8px_9px_-4px_rgba(51, 51, 51,0.3),0_4px_18px_0_rgba(51, 51, 51, 0.2)] dark:shadow-[0_4px_9px_-4px_rgba(51, 51, 51,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(51, 51, 51, 0.2),0_4px_18px_0_rgba(51, 51, 51,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(51, 51, 51, 0.2),0_4px_18px_0_rgba(51, 51, 51,0.1)]'
            }
            style={{ background: card.completed ? '#333333' : '#48BB78' }}
            htmlFor={String(card.id)}
          >
            {card.completed ? 'Unmark' : 'Mark as done'}
          </label>
          <br></br>
          <GetTimeLeft
            card={card}
            dateCreated={card.date_created}
            period={card.period}
            handleCardUpdate={handleCardUpdate}
          />
        </div>
      ))}
    </div>
  )
}

export default Cards

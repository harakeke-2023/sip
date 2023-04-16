import { useEffect, useState } from 'react'
import { getCards, updateCard } from '../apis/cards'
import { useStateContext } from '../context/StateContext'

import { Card, CardData } from '../../models/Card'
import GetTimeLeft from './GetDate'
import CardCopy from './CardCopy'

interface Props {
  categoryId: number
}

const Cards = (props: Props) => {
  const { userDetail } = useStateContext()
  const [cards, setCards] = useState([] as Card[])
  const [showCardPopup, setShowCardPopup] = useState(false)
  const [existingCard, setExistingCard] = useState({
    category_id: 0,
    user_id: 0,
    name: '',
    description: '',
    date_created: 0,
    period: 0,
    location: '',
    completed: false,
    total_count: 0,
    comp_count: 0,
  } as Card | CardData)

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
    if (props.categoryId) {
      fetchCards(props.categoryId)
    }
  }, [props.categoryId])

  async function handleComplete(e: any, card: Card) {
    await handleCardUpdate({ ...card, completed: e.target.checked })
    await fetchCards(props.categoryId)
  }

  async function handleCardUpdate(updatedCard: Card) {
    await updateCard(updatedCard)
    fetchCards(props.categoryId)
  }

  return (
    <div className="flex flex-row">
      {showCardPopup && (
        <div
          onClick={(e: any) => {
            if (e.target.tagName === 'DIV') {
              setShowCardPopup((prev) => !prev)
            }
          }}
          className="flex justify-center items-center fixed top-0 left-0 z-10 h-screen w-screen text-center "
          style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
        >
          <CardCopy existingCard={existingCard} />
        </div>
      )}
      {cards.map((card: Card) => (
        <div
          key={card.id}
          className="bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 block max-w-md  p-6 "
          onClick={() => {
            setExistingCard({
              ...card,
            })
            setShowCardPopup((prev) => !prev)
          }}
        >
          <p>{card.name}</p>
          <p>Description: {card.description}</p>

          <GetTimeLeft
            card={card}
            dateCreated={card.date_created}
            period={card.period}
            handleCardUpdate={handleCardUpdate}
          />
          <input
            onChange={(e) => handleComplete(e, card)}
            checked={card.completed}
            type="checkbox"
            id={String(card.id)}
            name="complete"
            style={{ display: 'none' }}
          />
          <label
            className={`${card.completed ? 'text-lime-500' : 'text-red-600'}`}
            htmlFor={String(card.id)}
          >
            {card.completed ? 'Completed' : 'Incomplete'}
          </label>
          <p>Location: {card.location}</p>
        </div>
      ))}
      <div
        onClick={() => {
          setExistingCard({
            category_id: props.categoryId,
            user_id: userDetail.id,
            name: '',
            description: '',
            date_created: new Date().valueOf(),
            period: 0,
            location: '',
            completed: false,
            total_count: 0,
            comp_count: 0,
          })
          setShowCardPopup((prev) => !prev)
        }}
        className=" p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 self-center"
      >
        +
      </div>
    </div>
  )
}

export default Cards

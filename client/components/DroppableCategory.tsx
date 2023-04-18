import { useContext } from 'react'
import { useEffect, useState } from 'react'
import { useDrop } from 'react-dnd'
import { useStateContext } from '../context/StateContext'
import { MoveCardAction } from '../context/MoveCardAction'
import { Card } from '../../models/Card'
import { getCards, updateCard } from '../apis/cards'
// import { StateContext, ActionType } from './StateContext'

interface DroppableCategoryProps {
  id: number
  children: React.ReactNode
  fetchCards: (categoryId: number, setState: (prev: any) => void) => void
}

const DroppableCategory: React.FC<DroppableCategoryProps> = (props:DroppableCategoryProps) => {
  const { userDetail } = useStateContext()
  const { dispatch } = useStateContext()
  const { setGlobalCards } = useStateContext()

  // async function fetchCards(userId: number) {
  //   try {
  //     const res = await getCards(userId)
  //     setGlobalCards(() => [...res])
  //     console.log('hi')
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'card',
    drop: (item: { id: number; category_id: number }, monitor) => {
      updateCard({ id: item.id, category_id: props.id } as Card)
      props.fetchCards(userDetail.id, setGlobalCards)
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }))

  return (
    <div ref={drop} style={{ opacity: isOver ? 0.5 : 1 }}>
      {props.children}
    </div>
  )
}

export default DroppableCategory

import { useContext } from 'react'
import { useDrop } from 'react-dnd'
import { useStateContext } from '../context/StateContext'
import { MoveCardAction } from '../context/MoveCardAction'
import { Card } from '../../models/Card'
import { updateCard } from '../apis/cards'
// import { StateContext, ActionType } from './StateContext'

interface DroppableCategoryProps {
  id: number
  children: React.ReactNode
}

const DroppableCategory: React.FC<DroppableCategoryProps> = ({
  id,
  children,
}) => {
  const { dispatch } = useStateContext()
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'card',
    drop: (item: { id: number; category_id: number }, monitor) => {
      // Move the card to the new category
      // const action: MoveCardAction = {
      //   type: 'MOVE_CARD',
      //   payload: {
      //     cardId: item.id,
      //     oldCategoryId: item.category_id,
      //     newCategoryId: id,
      //   },
      // }

      // dispatch(action)
      updateCard({ id: item.id, category_id: id } as Card)

      // // Save the updated data to the database
      // // (replace this with your actual API call)
      // saveDataToDatabase()
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }))

  return (
    <div ref={drop} style={{ backgroundColor: isOver ? 'lightblue' : 'white' }}>
      {children}
    </div>
  )
}

export default DroppableCategory

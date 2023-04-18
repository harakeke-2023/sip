import React from 'react'
import { useDrag } from 'react-dnd'

interface DraggableCardProps {
  id: number
  categoryId: number
  children: React.ReactNode
}

const DraggableCard: React.FC<DraggableCardProps> = ({
  id,
  categoryId,
  children,
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'card',
    item: { id, categoryId },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {children}
    </div>
  )
}

export default DraggableCard

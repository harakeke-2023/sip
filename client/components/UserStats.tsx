import React, { useEffect, useState } from 'react'
import { Card } from '../../models/Card'
import { getCards, getCardsbyUserId } from '../apis/cards'
import CompletedTasksBarChart from './Chart'
import { useStateContext } from '../context/StateContext'
import { findCategories } from '../apis/list'
import { Category } from '../../models/Category'

const UserStats = () => {
  const [cards, setCards] = useState([] as Card[])
  const { userDetail } = useStateContext()
  const [categories, setCategories]: any[] = useState([])
  const [cardsByCategory, setCardsByCategory] = useState({})

  async function fetchCategories(userId: number) {
    try {
      const res = await findCategories(userId)
      setCategories(() => [...res])
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchCategories(userDetail.id)
    getCardsbyUserId(userDetail.id).then((res) => setCards(() => res)).catch
  }, [])

  return (
    <div className="flex flex-wrap w-screen p-4 bg-gray-100 flex-col">
      {' '}
      {categories.map((category: Card, i: number) => {
        let totalComp = 0
        let totalCount = 0

        cards.forEach((card) => {
          if (card.category_id === category.id) {
            totalComp += card.comp_count
            totalCount += card.total_count
          }
        })
        return (
          <>
            <div className="flex flex-col items-center mb-4 w-full" key={i}>
              <h2 className="text-lg font-semibold">{category.name}</h2>
              <CompletedTasksBarChart
                completedTasks={totalComp}
                totalTasks={totalCount}
              />
            </div>
            <h2></h2>
          </>
        )
      })}
    </div>
  )
}
export default UserStats

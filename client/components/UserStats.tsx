import React, { useEffect, useState } from 'react'
import { Card } from '../../models/Card'
import { getCardsbyUserId } from '../apis/cards'
import CompletedTasksBarChart from './Chart'
import { useStateContext } from '../context/StateContext'
import { findCategories } from '../apis/list'


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

  useEffect(() => {
    console.log(categories)
  }, [categories])


  const arr: string[] = []

  const wordsToSentence = (words: string[]) => {
    if (words.length === 0) {
      return ''
    } else if (words.length === 1) {
      return words[0]
    } else if (words.length === 2) {
      return words.join(' and ')
    } else {
      const lastWord = words.pop()
      const sentence = words.join(', ') + ', and ' + lastWord
      return sentence
    }
  }

  return (
    <div className="flex flex-wrap w-screen p-4 bg-gray-100 flex-col">

      {categories.map((category: Card, i: number) => {
        let totalComp = 0
        let totalCount = 0

        cards.forEach((card) => {
          if (card.category_id === category.id) {
            totalComp += card.comp_count
            totalCount += card.total_count
          }
        })
        if (totalCount > 0) {
          return (
            <div className="flex flex-col items-center mb-4 w-full" key={i}>
              <h2 className="text-lg font-semibold">{category.name}</h2>
              <CompletedTasksBarChart
                completedTasks={totalComp}
                totalTasks={totalCount}
              />
            </div>
          )
        } else {
          arr.push(category.name)
          return null
        }
      })}
      No data yet for {wordsToSentence(arr)}.
    </div>
  )
}
export default UserStats

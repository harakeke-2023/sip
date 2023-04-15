import React, { useEffect, useState } from 'react'
import { Card } from '../../models/Card'
import { updateCard } from '../apis/cards'

function GetTimeLeft({
  dateCreated,
  period,
  card,
}: {
  dateCreated: number
  period: number
  card: Card
}) {
  function calculateNextDate(
    currentDate: number,
    startDate: number,
    period: number
  ) {
    const timeDiff = currentDate - startDate
    const numPeriods = Math.floor(timeDiff / period)

    if (numPeriods === 0) {
      return startDate + period
    } else {
      return startDate + numPeriods * period + period
    }
  }

  const [timeLeft, setTimeLeft] = useState('')
  useEffect(() => {
    // let goalDateEpoch = dateCreated + period
    setInterval(() => {
      const currentDate = Math.floor(Date.now())
      const goalDateEpoch = calculateNextDate(currentDate, dateCreated, period)
      const timeLeft = goalDateEpoch - currentDate
      if (card.id === 13) {
        console.log(card.id, card.completed)
      }

      if (timeLeft <= 1000) {
        updateCard({
          ...card,
          total_count: Math.floor(
            (Math.floor(Date.now()) - dateCreated) / period
          ),
        })
        console.log('Hit 0!!!!')
        if (card.completed) {
          // console.log('and completed')
          console.log(card)
          updateCard({
            ...card,
            completed: false,
            comp_count: card.comp_count + 1,
          })
        }
      }

      // console.log('date created', dateCreated)
      // console.log('period', period)
      // console.log('current date', currentDate)

      // console.log('time left', timeLeft)

      // calculate the hours, minutes, and seconds in the elapsed time
      const days = Math.floor(timeLeft / (24 * 60 * 60 * 1000))
      const hours = Math.floor(
        (timeLeft % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
      )
      const minutes = Math.floor((timeLeft % (60 * 60 * 1000)) / (60 * 1000))
      const seconds = Math.floor((timeLeft % (60 * 1000)) / 1000)

      // format the elapsed time as a string
      let formattedElapsedTime = ''
      if (days > 0) {
        formattedElapsedTime += `${days} day${days > 1 ? 's' : ''}, `
      }
      if (hours > 0) {
        formattedElapsedTime += `${hours} hour${hours > 1 ? 's' : ''}, `
      }
      if (minutes > 0) {
        formattedElapsedTime += `${minutes} minute${minutes > 1 ? 's' : ''}, `
      }
      formattedElapsedTime += `${seconds} second${seconds > 1 ? 's' : ''}`

      setTimeLeft(String(formattedElapsedTime))
    }, 1000)
  }, [])

  return (
    <p>
      Time left: <strong>{timeLeft}</strong>
    </p>
  )
}

export default GetTimeLeft

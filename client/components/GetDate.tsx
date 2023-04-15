import React, { useEffect, useState } from 'react'
import { Card } from '../../models/Card'
import { getCard, updateCard } from '../apis/cards'

function GetTimeLeft({
  dateCreated,
  period,
  card,
  handleCardUpdate,
}: {
  dateCreated: number
  period: number
  card: Card
  handleCardUpdate: (updatedCard: Card) => void
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

      if (timeLeft <= 1000) {
        getCard(card.id)
          .then((res) => {
            const card = res[0]
            handleCardUpdate({
              ...card,
              total_count: Math.floor(
                (Math.floor(Date.now()) - dateCreated) / period
              ),
              comp_count: card.completed
                ? card.comp_count + 1
                : card.comp_count,
              completed: card.completed ? false : card.completed,
            })
          })
          .catch((err) => console.log(err))
      }

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

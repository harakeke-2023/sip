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
    handleCardUpdate({
      ...card,
      total_count: Math.floor((Math.floor(Date.now()) - dateCreated) / period),
    })
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
    <div className="flex justify-center">
      {card.completed ? null : (
        <div
          className=" rounded p-1  inline-flex text-white text-xs"
          style={{
            background:
              !timeLeft.includes('hour') && !timeLeft.includes('hours')
                ? 'red'
                : 'darkorange',
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-clock"
            viewBox="0 0 16 16"
          >
            {' '}
            <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />{' '}
            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />{' '}
          </svg>
          &#160;&#160;
          <p className="w-full">{timeLeft}</p>
        </div>
      )}
    </div>
  )
}

export default GetTimeLeft

import React, { useEffect, useState } from 'react'

function GetTimeLeft({
  dateCreated,
  period,
}: {
  dateCreated: number
  period: number
}) {
  const [timeLeft, setTimeLeft] = useState('')
  useEffect(() => {
    setInterval(() => {
      const goalDateEpoch = dateCreated + period / 1000

      const currentDate = Math.floor(Date.now() / 1000)
      const timeLeft = goalDateEpoch - currentDate

      // calculate the hours, minutes, and seconds in the elapsed time
      const days = Math.floor(timeLeft / (24 * 3600))
      const hours = Math.floor((timeLeft % (24 * 3600)) / 3600)
      const minutes = Math.floor((timeLeft % 3600) / 60)
      const seconds = timeLeft % 60

      // format the elapsed time as a string
      let formattedElapsedTime = ''
      if (days > 0) {
        formattedElapsedTime += `${days} day${days > 1 ? 's' : ''}, `
      }
      formattedElapsedTime += `${hours} hour${hours > 1 ? 's' : ''}, `
      formattedElapsedTime += `${minutes} minute${minutes > 1 ? 's' : ''}, `
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

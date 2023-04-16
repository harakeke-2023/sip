import { useState } from 'react'
import { Card } from '../../models/Card'

export function CardDetails({card}: {card:Card}) {
  const [showDetails, setShowDetails] = useState(false)
  return (
    <>
      {showDetails && (
        <>
          <p>
            <strong>Description:</strong> {card.description}
          </p>

          <p className="mb-4">
            <strong>Location:</strong> {card.location}
          </p>
        </>
      )}
      <span
        className={`inline-block mb-4 ${
          showDetails ? 'text-gray-500' : 'text-gray-500'
        } cursor-pointer`}
        onClick={() => setShowDetails(!showDetails)}
      >
        {showDetails ? (
          <>
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-arrow-bar-up"
                viewBox="0 0 16 16"
              >
                {' '}
                <path
                  fillRule="evenodd"
                  d="M8 10a.5.5 0 0 0 .5-.5V3.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 3.707V9.5a.5.5 0 0 0 .5.5zm-7 2.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5z"
                />{' '}
              </svg>
              <div>Hide details</div>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-arrow-bar-right"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M1 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM8 6a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L7.5 12.293V6.5A.5.5 0 0 1 8 6z"
                />
              </svg>
              <div>Details</div>
            </div>
          </>
        )}
      </span>
    </>
  )
}

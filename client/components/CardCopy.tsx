import React, { useEffect, useState } from 'react'
import { Card, CardData } from '../../models/Card'
import { deleteCard } from '../apis/cardpopup'
import { addNewCard, updateCard } from '../apis/cards'

interface Props {
  existingCard: Card | CardData
  id: number
}

const CardCopy = (props: Props) => {
  const [form, setForm] = useState({
    category_id: props.id,
    user_id: 0,
    name: '',
    description: '',
    date_created: new Date().valueOf(),
    period: 0,
    location: '',
    completed: false,
    total_count: 0,
    comp_count: 0,
  } as Card | CardData)
  const [isCustom, setIsCustom] = useState(false)
  const [customPeriod, setCustomPeriod] = useState({
    hours: 0,
    minutes: 0,
  })
  const [isNew, setIsNew] = useState(false)
  const [id, setId] = useState(0)

  useEffect(() => {
    setForm({ ...props.existingCard })
  }, [])

  useEffect(() => {
    console.log(form)
  }, [form])

  useEffect(() => {
    if (props.existingCard.name) {
      setIsNew(false)
    } else {
      setIsNew(true)
    }
  }, [])

  const handleSubmit = (e: any) => {
    if (e.target.value === 'Create') {
      addNewCard({
        ...form,
        date_created: new Date().valueOf(),
        period: form.period
          ? form.period
          : 1000 * 60 * customPeriod.minutes +
            1000 * 60 * 60 * customPeriod.hours,
      })
        .then((res: any) => console.log('FrontEnd Res', res))
        .catch((err) => console.log(err))
    } else if (e.target.value === 'Update') {
      // handleEditCategory()
      updateCard(form)
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
    }
  }

  const handleDelete = (id: number) => {
    deleteCard(id)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  }

  return (
    <div className="bg-white rounded-lg">
      <h1 className="text-2xl font-bold mt-8  mb-6">Card Detail</h1>
      <form className="w-full max-w-lg bg-white py-16 px-16 rounded-lg">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="title"
              type="text"
              placeholder="Title...."
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            {/* <p className="text-red-500 text-xs italic">
              Please fill out this field.
            </p> */}
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="location"
            >
              Location
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="location"
              type="text"
              required
              placeholder="Location...."
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="description"
              rows={6}
              placeholder="Description......"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
            <p className="text-gray-600 text-xs italic">
              Make it as long and as crazy as you'd like
            </p>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-state"
            >
              Period
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
                required
                onChange={(e) => {
                  setForm({ ...form, period: Number(e.target.value) })
                  if (Number(e.target.value) === 0) {
                    setIsCustom(true)
                  } else {
                    setIsCustom(false)
                  }
                }}
              >
                <option value={86400000}>Daily</option>
                <option value={604800000}>Weekly</option>
                <option value={1209600000}>Fortnightly</option>
                <option value={0}>Custom</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          {isCustom && (
            <>
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="hours"
                >
                  Hours
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="hours"
                  type="number"
                  placeholder="hours..."
                  value={customPeriod.hours}
                  onChange={(e) => {
                    setCustomPeriod({
                      ...customPeriod,
                      hours: Number(e.target.value),
                    })
                  }}
                />
              </div>
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="minutes"
                >
                  Minutes
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="minutes"
                  type="number"
                  placeholder="Minutes..."
                  value={customPeriod.minutes}
                  onChange={(e) => {
                    setCustomPeriod({
                      ...customPeriod,
                      minutes: Number(e.target.value),
                    })
                  }}
                />
              </div>
            </>
          )}
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="opacity-90 dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]] inline-block w-full rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          data-te-ripple-init=""
          data-te-ripple-color="light"
          value={isNew ? 'Create' : 'Update'}
        >
          {isNew ? 'Create' : 'Update'}
        </button>
        {!isNew && (
          <button
            type="submit"
            className="opacity-90 bg-red-500 hover:bg-red-600 dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]] inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            data-te-ripple-init=""
            data-te-ripple-color="light"
            onClick={() => handleDelete(form.id)}
          >
            Delete
          </button>
        )}
      </form>
    </div>
  )
}

export default CardCopy

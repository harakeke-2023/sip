import React, { useEffect, useState } from 'react'
import { Card, CardData } from '../../models/Card'
import { deleteCard } from '../apis/cardpopup'
import { addNewCard, updateCard } from '../apis/cards'
import CardLocation from './CardLocation'

interface Props {
  existingCard: Card | CardData
  userId: number
}

const CardCopy = (props: Props) => {
  const [form, setForm] = useState({
    ...props.existingCard,
  } as Card | CardData)
  const [isCustom, setIsCustom] = useState(false)
  const [customPeriod, setCustomPeriod] = useState({
    hours: 0,
    minutes: 0,
  })
  const [isNew, setIsNew] = useState(false)
  const [address, setAddress] = useState([])

  const isCard = (card: Card | CardData): card is Card => {
    return 'id' in card
  }

  useEffect(() => {
    // setForm({ ...props.existingCard })
    setForm((prev) => ({ ...props.existingCard }))
    console.log('check form', form)
    console.log(props.existingCard)
  }, [props.existingCard])

  useEffect(() => {
    if (props.existingCard.name) {
      setIsNew(false)
    } else {
      setIsNew(true)
    }
  }, [])

  useEffect(() => {
    if (address.length >= 2) {
      setForm({ ...form, location: `${address[0]}, ${address[1]}` })
    } else {
      // setForm({ ...form, location: '' })
    }
  }, [address])

  const handleSubmit = (e: any) => {
    if (form.name && form.location) {
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
  }

  const handleDelete = (id: number) => {
    deleteCard(id)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  }

  return (
    <div className=" bg-perano-100   rounded-lg w-4/5">
      <h1 className="text-2xl bg-font-bold mt-2 mb-2 sm:mt-8  sm:mb-6">
        {isNew ? 'Add Card' : 'Edit Card'}
      </h1>
      <div className="flex flex-col sm:flex-row overflow-auto h-4/5 ">
        <form className=" bg-perano-100 sm:h-auto max-h-1/2 sm:min-w-3/5 w-full max-w-lg py-4 px-4 sm:py-16 sm:px-16 rounded-lg">

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-1 mb-2 sm:px-3 sm:mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-black text-xs font-bold mb-2"
                htmlFor="title"
              >
                Title
              </label>
              <input
                className="bg-perano-50 appearance-none block w-full bg-gray-200 text-gray-800 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="title"
                type="text"
                placeholder="Title..."
                required
                value={form.name}
                onChange={(e) => {
                  if (e.target.value.length <= 25) {
                    setForm({ ...form, name: e.target.value })
                  } else {
                    alert('Title should be less than 20 characters')
                  }
                }}

              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-black text-xs font-bold mb-2"
                htmlFor="location"
              >
                Location
              </label>
              <input
                className="bg-perano-50 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="location"
                type="text"
                required
                disabled
                placeholder="Find the location from Map ..."
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-black text-xs font-bold mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                className="bg-perano-50 appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="description"
                rows={window.innerWidth < 700 ? 4 : 6}
                placeholder="Description..."
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
              <p className="text-gray-600 text-xs italic ">
                Make it as long and as crazy as you`d like
              </p>
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-2 justify-center ">
            <div className="w-full md:w-1/3 px-3 mb-6  md:mb-0">
              <label
                className="block uppercase tracking-wide text-black text-xs font-bold mb-2"
                htmlFor="grid-state"
              >
                Period
              </label>
              <div className="relative">
                <select
                  className="bg-perano-50 justify-self-center block appearance-none w-full  text-gray-800 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white"
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
          </div>
          {isCustom && (
            <div className="flex justify-center mb-3 mt-5">
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0 ">
                <label
                  className="block uppercase tracking-wide text-black text-xs font-bold mb-2"
                  htmlFor="hours"
                >
                  Hours
                </label>
                <input
                  className="bg-perano-50 appearance-none block w-full bg-gray-200 text-gray-700  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
              <span className=" font-bold self-end mb-3">:</span>

              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-black text-xs font-bold mb-2"
                  htmlFor="minutes"
                >
                  Minutes
                </label>
                <input
                  className="bg-perano-50 appearance-none block w-full bg-gray-200 text-gray-700  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
            </div>
          )}
          <button
            type="submit"
            onClick={handleSubmit}
            className="mt-3 opacity-85 dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]] inline-block w-full rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            data-te-ripple-init=""
            data-te-ripple-color="light"
            value={isNew ? 'Create' : 'Update'}
          >
            {isNew ? 'Create' : 'Update'}
          </button>
          {!isNew && (
            <button
              type="submit"
              className="mt-2 opacity-85 bg-red-500 hover:bg-red-600 dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]] inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              data-te-ripple-init=""
              data-te-ripple-color="light"
              onClick={() => {
                if (isCard(form)) {
                  handleDelete(form.id)
                }
                // handleDelete(form.id)
              }}
            >
              Delete
            </button>
          )}
        </form>
        <div className="sm:w-2/5 w-full  sm:h-auto h-64 grow">
          <CardLocation
            existingAddress={form.location}
            address={address}
            setAddress={setAddress}
          />
        </div>
      </div>
    </div>
  )
}

export default CardCopy

import { Category } from '../../models/Category'
import { useStateContext } from '../context/StateContext'
import { addCard, editCard, deleteCard } from '../apis/cardpopup'
import React, { useEffect, useState } from 'react'
import { Ripple, Input, initTE } from 'tw-elements'
import Datetime from 'react-datetime'

interface Props {
  // isOpen: boolean
  // onClose: () => void
  existingCard: Category
  id: number
}

interface PopupData {
  title: string
  content: string
}

const CardPopup = (props: Props) => {
  const { userDetail } = useStateContext()
  const [form, setForm] = useState({
    id: 0,
    category_id: 0,
    user_id: 0,
    name: '',
    description: '',
    date_created: 0, // new Date().valueOf()
    period: 0,
    location: '',
    completed: false,
    total_count: 0,
    comp_count: 0,
  })
  const [isNew, setIsNew] = useState(true)

  useEffect(() => {
    initTE({ Ripple, Input })
    if (props.existingCard.name) {
      setForm({
        ...form,
        name: props.existingCard.name,
        description: props.existingCard.description,
      })
      // setName(props.existingCard.name)
      // setMessage(props.existingCard.description)
      setIsNew(false)
    }
  }, [])

  // useEffect(() => {
  //   if (props.isOpen) {
  //     fetch('/api/popup-data')
  //       .then((response) => response.json())
  //       .then((data) => setPopupData(data))
  //       .catch((error) => console.error(error))
  //   }
  // }, [props.isOpen])

  const handleAddCard = () => {
    addCard({
      id: 1,
      category_id: 2,
      user_id: 3,
      name: 'My new card',
      description: 'This is a new card',
      date_created: Date.now(),
      period: 30,
      location: 'My location',
      completed: false,
      total_count: 10,
      comp_count: 0,
    })
  }

  const handleDeleteCard = () => {
    // deleteCard({
    //   id: 123,
    //   category_id: 456,
    //   user_id: 789,
    //   name: 'Sample Card',
    //   description: 'This is a sample card.',
    //   date_created: 1642160400,
    //   period: 30,
    //   location: 'Sample Location',
    //   completed: false,
    //   total_count: 10,
    //   comp_count: 2,
    // })
  }

  const handleEditCard = () => {
    editCard({
      id: 123,
      category_id: 456,
      user_id: 789,
      name: 'Sample Card',
      description: 'This is a sample card.',
      date_created: 1642160400,
      period: 30,
      location: 'Sample Location',
      completed: false,
      total_count: 10,
      comp_count: 2,
    })
  }

  return (
    <div className="max-w-lg flex flex-wrap ml-2 -mx-1 mb-6 w-full px-3 uppercase tracking-wide text-gray-700 text-xs font-bold">
      <div className=" rounded-lg overflow-hidden border border-l border-r border-gray-400 flex justify-evenly p-8">
        <div className="">
          <h2 className="heading-secondary u-margin-bottom-small ">
            {isNew ? 'Add Card' : 'Edit Card'}
          </h2>

          <form className="form">
            {/* CARD NAME */}

            <div className="flex items-center justify-between space-x-2">
              <div className="form__group">
                <label htmlFor="name" className="form__label">
                  Card Name
                </label>
                <input
                  type="text"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  placeholder="Supermarket List"
                  id="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              {/* LOCATION */}
              <div className="form__group">
                <label htmlFor="date" className="form__label">
                  Location
                </label>
                <input
                  type="text"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  placeholder="Auckalnd"
                  id="location"
                  value={form.location}
                  onChange={(e) =>
                    setForm({ ...form, location: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            {/* CARD DESCRIPTION */}
            <div className="form__group">
              <label htmlFor="message" className="form__label">
                Description
              </label>
              <textarea
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                placeholder="Milk, cheese, bread, eggs, etc."
                id="message"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                required
              />
            </div>

            {/* PERIOD DAYS */}
            <div className="relative">
              <label htmlFor="period" className="form__label">
                Period
              </label>
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                placeholder="Period"
                id="grid-state"
                name="period"
                value={form.period}
                onChange={(e) =>
                  setForm({ ...form, period: Number(e.target.value) })
                }
              >
                <option value="0">Daily</option>
                <option value="1">Weekly</option>
                <option value="2">Monthly</option>
                <option value="4">Custom </option>
              </select>
            </div>
            {/* PEDRIOD HOURS */}
            {form.period === 4 && (
              <div className="flex items-center justify-between space-x-2 mt-6">
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  name="hours"
                  type="number"
                  placeholder="Hours"
                  // inputProps={{ className: 'form__input' }}
                  // value={e.target.value}
                  onChange={(event) => {
                    console.log(form.date_created)
                    setForm({
                      ...form,
                      date_created:
                        form.date_created +
                        new Date(event.target.value).valueOf(),
                    })
                  }}
                />
                <label htmlFor="custom-date" className="align-center">
                  :
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  name="min"
                  type="number"
                  placeholder="Min"
                  // inputProps={{ className: 'form__input' }}
                  // value={e.target.value}
                  onChange={(event) => {
                    console.log(form.date_created)
                    setForm({
                      ...form,
                      date_created:
                        form.date_created +
                        new Date(event.target.value).valueOf(),
                    })
                  }}
                />
              </div>
            )}

            {/* Button */}
            <div className="space-x-2 mt-3 ">
              <button
                className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow "
                onClick={isNew ? handleAddCard : handleEditCard}
              >
                {isNew ? 'Add Card' : 'Edit Card'}
              </button>
              <button
                className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                onClick={handleDeleteCard}
              >
                Delete Card
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CardPopup

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
    <div className="popup">
      <div className="popup__content">
        <div className="popup__left">
          <h2 className="heading-secondary u-margin-bottom-small">
            {isNew ? 'Add Card' : 'Edit Card'}
          </h2>
          <form className="form">
            <div className="form__group">
              <input
                type="text"
                className="form__input"
                placeholder="Card Name"
                id="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
              <label htmlFor="name" className="form__label">
                Card Name
              </label>
            </div>
            <div className="form__group">
              <textarea
                className="form__input"
                placeholder="Card Description"
                id="message"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                required
              />
              <label htmlFor="message" className="form__label">
                Card Description
              </label>
            </div>

            <div className="form__group">
              <input
                type="text"
                className="form__input"
                placeholder="Card Location"
                id="location"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                required
              />
              <label htmlFor="location" className="form__label">
                Card Location
              </label>
            </div>
            <div>
              <label htmlFor="period" className="form__label">
                Card Period
              </label>
              <select
                name="period"
                id="period"
                className="form__input"
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

            {form.period === 4 && (
              <div>
                <label htmlFor="custom-date" className="form__label">
                  Hours
                </label>
                <input
                  name="hours"
                  type="number"
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
                <label htmlFor="custom-date" className="form__label">
                  Minutes
                </label>
                <input
                  name="min"
                  type="number"
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

            <div className="form__group">
              <button
                className="btn btn--green"
                onClick={isNew ? handleAddCard : handleEditCard}
              >
                {isNew ? 'Add Card' : 'Edit Card'}
              </button>
              <button className="btn btn--red" onClick={handleDeleteCard}>
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

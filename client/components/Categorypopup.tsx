import React, { useState, useEffect } from 'react'
import { Ripple, Input, initTE } from 'tw-elements'
import { editCategory, addCategory } from '../apis/category'
import { useStateContext } from '../context/StateContext'
import { Category } from '../../models/Category'

interface Props {
  //   isOpen: boolean
  //   onClose: () => void
  existingCategory: Category
  id: number
}

interface PopupData {
  title: string
  content: string
}

const CategoryPopup = (props: Props) => {
  const { userDetail } = useStateContext()

  const [popupData, setPopupData] = useState<PopupData>({
    title: '',
    content: '',
  })
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [isNew, setIsNew] = useState(true)

  useEffect(() => {
    initTE({ Ripple, Input })
    if (props.existingCategory.name) {
      setName(props.existingCategory.name)
      setMessage(props.existingCategory.description)
      setIsNew(false)
    }
  }, [])

  // useEffect(() => {
  //   // if (isOpen) {
  //   //   fetch('/api/popup-data')
  //   //     .then((response) => response.json())
  //   //     .then((data) => setPopupData(data))
  //   //     .catch((error) => console.error(error))
  //   // }
  // }, [isOpen])

  const handleAddCategory = () => {
    addCategory({ user_id: userDetail.id, name: name, description: message })
  }

  // const handleDeleteCategory = () => {
  //   deleteCategory({ name, message })
  // }

  const handleEditCategory = () => {
    editCategory({
      id: props.id,
      user_id: userDetail.id,
      name: name,
      description: message,
    })
  }

  const handleSubmit = (e: any) => {
    console.log(e.target.value)
    if (e.target.value === 'Create') {
      handleAddCategory()
    } else if (e.target.value === 'Update') {
      handleEditCategory()
    }
    // submit form logic here

    // handleDeleteCategory();
  }

  return (
    <div className="block max-w-md rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
      <form>
        {/*Name input*/}
        <div className="relative mb-6" data-te-input-wrapper-init="">
          <input
            type="text"
            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
            id="exampleInput7"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label
            htmlFor="exampleInput7"
            className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
          >
            Name
          </label>
        </div>

        {/*Message textarea*/}
        <div className="relative mb-6" data-te-input-wrapper-init="">
          <textarea
            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100  dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
            id="exampleFormControlTextarea13"
            rows={3}
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <label
            htmlFor="exampleFormControlTextarea13"
            className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary "
          >
            Message
          </label>
        </div>

        {/*Submit button*/}
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
        <button
          type="submit"
          className="opacity-90 bg-red-500 hover:bg-red-600 dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]] inline-block w-full rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          data-te-ripple-init=""
          data-te-ripple-color="light"
        >
          Delete
        </button>
      </form>
    </div>
  )
}

export default CategoryPopup

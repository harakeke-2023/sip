import React, { useState, useEffect } from 'react'
import { Ripple, Input, initTE } from 'tw-elements'
import { editCategory, addCategory, deleteCategory } from '../apis/category'
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

  const handleAddCategory = () => {
    addCategory({ user_id: userDetail.id, name: name, description: message })
  }

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
  }

  const handleDelete = (id: number) => {
    deleteCategory(id)
  }

  return (
    <div className="bg-perano-100 rounded-lg">
      <h1 className="text-2xl font-bold mt-8  mb-6">
        {isNew ? 'ADD CATEGORY' : 'Edit Card'}
      </h1>
      <form className="w-full max-w-lg bg-perano-100 py-16 px-16 rounded-lg">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-black text-xs font-bold mb-2"
              htmlFor="title"
            >
              Name
            </label>
            <input
              type="text"
              className="appearance-none block w-full bg-perano-50 text-black rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-600"
              id="exampleInput7"
              placeholder="Name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              className="appearance-none block w-full bg-perano-50 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-600"
              id="exampleFormControlTextarea13"
              rows={3}
              placeholder="Description..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <p className="text-gray-600 text-xs italic ">
              Give me a description
            </p>
          </div>
        </div>
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
        <button
          type="submit"
          onClick={() =>handleDelete(props.id)}
          className="mt-2 opacity-85 bg-red-500 hover:bg-red-600 dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]] inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
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

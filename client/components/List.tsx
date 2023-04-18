import React, { useEffect, useState } from 'react'
import { Category } from '../../models/Category'
import { findCategories } from '../apis/list'
import { useStateContext } from '../context/StateContext'
import Categorypopup from './Categorypopup'
import Cards from './Cards'

import { FaPlus } from 'react-icons/fa'

const List = () => {
  const { userDetail } = useStateContext()
  const [categories, setCategories]: any[] = useState([])
  const [showPopup, setShowPopup] = useState(false)
  const [existingData, setExistingData] = useState({
    id: 0,
    user_id: 0,
    name: '',
    description: '',
  })

  useEffect(() => {
    if (userDetail.id) {
      findCategories(userDetail.id)
        .then((res) => {
          console.log(res)
          setCategories([...res])
          return res
        })
        .catch((err) => console.log(err))
    }
  }, [userDetail])

  const handleCreateCategory = () => {
    setShowPopup((prev) => !prev)
  }

  return (
    <div>
      {showPopup && (
        <div
          onClick={(e: any) => {
            if (e.target.tagName === 'DIV') {
              setShowPopup((prev) => !prev)
            }
          }}
          className="flex justify-center items-center fixed top-0 left-0 z-10 h-screen w-screen text-center "
          style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
        >
          <Categorypopup id={existingData.id} existingCategory={existingData} />
        </div>
      )}

      {/* {showCardPopup && (
        <div
          onClick={(e: any) => {
            if (e.target.tagName === 'DIV') {
              setShowCardPopup((prev) => !prev)
            }
          }}
          className="flex justify-center items-center fixed top-0 left-0 z-10 h-screen w-screen text-center "
          style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
        >
          <Cardpopup existingCard={existingCard} id={existingCard.id} />
        </div>
      )} */}

      <ul className="flex flex-wrap ">
        {categories.length &&
          categories.map((category: Category, i: number) => (
            <li
              key={i}
              className="flex bg-white dark:bg-gray-800 rounded-lg shadow-md w-full mb-1 mx-1"
            >
              <div
                onClick={() => {
                  setShowPopup((prev) => !prev)
                  setExistingData({ ...category })
                }}
                className="flex flex-col mr-1 justify-center text-left cursor-pointer w-64 h-65 overflow-auto flex-shrink-0 min-w-0 p-6 bg-blue-50 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                <div>
                  <h5 className="text-3xl font-bold text-blue-500 dark:text-blue-300 category_underline">
                    {category.name}
                  </h5>
                </div>
                <div>
                  <p className="mt-2 text-lg text-gray-700 dark:text-gray-400">
                    {category.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-nowrap items-start w-full h-65 overflow-hidden p-6 bg-blue-50 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <div className="flex flex-row flex-nowrap overflow-x-auto -webkit-overflow-scrolling: touch;">
                  <Cards
                    key={i}
                    userId={userDetail.id}
                    categoryId={category.id}
                  />
                </div>
              </div>
            </li>
          ))}
        <button>
          <li className="flex w-full">
            <div
              onClick={() => {
                setExistingData({
                  id: 0,
                  user_id: 0,
                  name: '',
                  description: '',
                })
                handleCreateCategory()
              }}
              className="fixed right-12 bottom-24  text-white px-6 py-6 pt-5 w-auto bg-red-600 rounded-full hover:bg-red-400 active:shadow-lg mouse shadow transition ease-in duration-150 focus:outline-none"
            >
              {/* This is Icon + */}
              <svg
                viewBox="0 0 20 20"
                enableBackground="new 0 0 20 20"
                className="w-6 h-6 inline-block"
              >
                <path
                  fill="#FFFFFF"
                  d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601
                                    C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399
                                    C15.952,9,16,9.447,16,10z"
                />
              </svg>
            </div>
          </li>
        </button>
      </ul>
    </div>
  )
}

export default List

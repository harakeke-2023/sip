import React, { useEffect, useState } from 'react'
import { Category } from '../../models/Category'
import { findCategories } from '../apis/list'
import { useStateContext } from '../context/StateContext'
import Categorypopup from './Categorypopup'
import Cards from './Cards'
import Cardpopup from './Cardpopup'
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
  const [showCardPopup, setShowCardPopup] = useState(false)
  const [existingCard, setExistingCard] = useState({
    id: 0,
    category_id: 0,
    user_id: 0,
    name: '',
    description: '',
    date_created: 0,
    period: 0,
    location: '',
    completed: false,
    total_count: 0,
    comp_count: 0,
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
      {showCardPopup && (
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
      )}
      <ul className="flex flex-wrap ">
        {categories.length &&
          categories.map((category: Category, i: number) => (
            <li
              key={i}
              className="flex bg-white dark:bg-gray-800 rounded-lg shadow-md w-full "
            >
              <div
                onClick={() => {
                  setShowPopup((prev) => !prev)
                  setExistingData({ ...category })
                }}
                className="w-64 h-65 overflow-auto flex-shrink-0 min-w-0 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                <h5 className="mb-2 text-3xl font-bold text-blue-500 dark:text-blue-300 ">
                  {category.name}
                </h5>
                <p className="mt-1 text-lg text-gray-700 dark:text-gray-400">
                  {category.description}
                </p>
              </div>
              <div className="flex flex-nowrap items-start w-full h-65 overflow-hidden p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <div className="flex flex-row flex-nowrap overflow-x-auto -webkit-overflow-scrolling: touch;">
                  <Cards key={i} categoryId={category.id} />
                  <button
                    onClick={() => {
                      setShowCardPopup((prev) => !prev)
                    }}
                    className=" bg-gray-600  hover:bg-gray-400 text-white font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out"
                  >
                    <FaPlus size={16} />
                  </button>
                </div>
              </div>
            </li>
          ))}
        <li className="flex w-full">
          <div className="w-64 h-65 overflow-auto flex-shrink-0 min-w-0 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5
              onClick={() => {
                setExistingData({
                  id: 0,
                  user_id: 0,
                  name: '',
                  description: '',
                })
                handleCreateCategory()
              }}
              className="mb-2 text-lg font-normal tracking-tight text-gray-900 dark:text-white"
            >
              Create Category
            </h5>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default List

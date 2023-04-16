import React, { useEffect, useState } from 'react'
import { Category } from '../../models/Category'
import { findCategories } from '../apis/list'
import { useStateContext } from '../context/StateContext'
import Categorypopup from './Categorypopup'
import Cards from './Cards'

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
      <ul>
        {categories.length &&
          categories.map((category: Category, i: number) => (
            <li key={i} className="flex">
              <div
                onClick={() => {
                  setShowPopup((prev) => !prev)
                  setExistingData({ ...category })
                }}
                className=" max-w-4 block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {category.name}
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  {category.description}
                </p>
              </div>
              <div className=" flex p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <Cards key={i} categoryId={category.id} />
              </div>
            </li>
          ))}
        <li>
          <a
            href="#"
            className="block max-w-sm p-6 bg-white  rounded-lg   dark:bg-gray-800 dark:border-gray-700 "
          >
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
              Create Category +
            </h5>
          </a>
        </li>
      </ul>
    </div>
  )
}

export default List

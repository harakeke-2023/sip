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
  const [existingData, setExistingData] = useState({})

  useEffect(() => {
    if (userDetail.id) {
      findCategories(userDetail.id).then((res) => {
        console.log(res)
        setCategories([...res])
        return res
      })
    }
  }, [userDetail])

  const handleCreateCategory = () => {
    setShowPopup(prev => !prev)
  }

  return (
    <div>
      {showPopup && (
        <div>
          <Categorypopup exsitingCategory={existingData} />
        </div>
      )}
      <table className="table-auto flex flex-raw">
        <thead>
          <tr className="flex flex-col">
            {categories.length &&
              categories.map((category: Category, i: number) => (
                <th key={i}>
                  <a
                    href="#"
                    className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                  >
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {category.name}
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                      {category.description}
                    </p>
                  </a>
                </th>
              ))}
            <th>
              <a
                href="#"
                className="block max-w-sm p-6 bg-white  rounded-lg   dark:bg-gray-800 dark:border-gray-700 "
              >
                <h5 onClick={handleCreateCategory} className="mb-2 text-lg font-normal tracking-tight text-gray-900 dark:text-white">
                  Create Category +
                </h5>
              </a>
            </th>
          </tr>
        </thead>
        <tbody>
         {categories.length && (
          categories.map((category: Category, i: number) => (
            <tr key={i}>
            <td>
              <Cards categoryId={category.id} />
            </td>
          </tr>
          ))
         )}
        </tbody>
      </table>
    </div>
  )
}

export default List

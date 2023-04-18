import React, { useEffect, useState, Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { useAuth0 } from '@auth0/auth0-react'
import { IfAuthenticated, IfNotAuthenticated } from '../config/Authenticated'
import { addUser, findUser } from '../apis/users'
import { Link, useNavigate } from 'react-router-dom'
import { useStateContext } from '../context/StateContext'

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}
function Navbar() {
  const { logout, loginWithRedirect, user } = useAuth0()

  const { userDetail, setUserDetail } = useStateContext()

  const navigator = useNavigate()
  useEffect(() => {
    if (user?.email) {
      findUser(user?.email).then((res) => {
        if (res.length) {
          setUserDetail(res[0])
        } else {
          addUser({
            name: user?.name,
            username: user?.nickname,
            email: user?.email,
          }).then((res) => {
            setUserDetail(res[0])
          })
        }
        if (window.location.pathname === '/') {
          console.log(window.location.pathname)
          navigator('/list')
        }
      })

    }
  }, [user])

  const handleSignOut = () => {
    logout()
  }

  const handleSignIn = () => {
    loginWithRedirect()
  }

  return (
    <>
      <nav>
        <div className="top-5 mb-2 mt-2 max-w-screen flex items-center justify-between mx-auto p-4">
          <a href="/" className="flex items-center">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-15 mr-3"
              alt="Flowbite Logo"
            />
            <span className="text-2xl font-semibold whitespace-nowrap dark:text-white">
              S.I.P™
            </span>
          </a>

          <div className="relative inline-block text-left">
            <div className="max-h-10">
              <IfNotAuthenticated>
                <button
                  onClick={handleSignIn}
                  className=" bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  Log In
                </button>
              </IfNotAuthenticated>

              <IfAuthenticated>
                {/* <div>
                  <button
                    onClick={handleMenu}
                    className="rounded-full w-10 overflow-hidden"
                  >
                    <img className="w-full" src={user?.picture} />
                  </button>
                  <button
                    onClick={handleSignOut}
                    className=" bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                  >
                    Log Out
                  </button> 
                  {user && <p>Signed in as: {user?.name}</p>}
                </div> */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={user?.picture}
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <span className="bg-sky-100 block px-4 py-2 text-sm text-sky-600">
                            Hello{' '}
                            {user?.given_name ||
                              user?.middle_name ||
                              user?.name}
                            !
                          </span>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/list"
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700'
                            )}
                          >
                            Cards List
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/chart"
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700'
                            )}
                          >
                            User Detail
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            className={` w-full ${classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700'
                            )}`}
                            onClick={handleSignOut}
                            to="/"
                          >
                            Sign out
                          </Link>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </IfAuthenticated>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar

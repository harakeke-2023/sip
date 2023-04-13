import React, { useEffect, useState } from 'react'

import { useAuth0 } from '@auth0/auth0-react'
import { IfAuthenticated, IfNotAuthenticated } from '../config/Authenticated'

function Navbar() {
  const { logout, loginWithRedirect, user } = useAuth0()
  useEffect(() => {
    console.log(user)
  }, [user])
  useEffect(() => {
    console.log(user)
  }, [])
  const handleSignOut = () => {
    console.log('sign out')
    logout()
  }

  const handleSignIn = () => {
    console.log('sign in')
    loginWithRedirect()
  }
  return (
    <>
      <nav className="m-4">
        <div className="max-w-screen flex items-center justify-between mx-auto p-4">
          <a href="#" className="flex items-center">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-15 mr-3"
              alt="Flowbite Logo"
            />
            <span className="text-2xl font-semibold whitespace-nowrap dark:text-white">
              S.I.P™
            </span>
          </a>

          <button
            data-collapse-toggle="navbar-multi-level"
            type="button"
            className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-multi-level"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <div className="relative inline-block text-left">
            <div>
              <IfNotAuthenticated>
                <button
                  onClick={handleSignIn}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  Log In
                </button>
              </IfNotAuthenticated>

              <IfAuthenticated>
                <div>
                  <button
                    onClick={handleSignOut}
                    className=" bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                  >
                    Log Out
                  </button>

                  <img className=" rounded-full  w-14" src={user?.picture} />

                  {user && <p>Signed in as: {user?.name}</p>}
                </div>
              </IfAuthenticated>
            </div>

          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar

import React from 'react'

function Navbar() {
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

          <div className="ml-auto">
            <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
              Log In
            </button>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar

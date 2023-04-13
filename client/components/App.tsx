import { useEffect } from 'react'
import Landing from './Landing'
import Login from './Login'
import { Routes, Route } from 'react-router-dom'
import Signup from './Signup'
import Navbar from './Navbar'

function App() {
  return (
    <>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </>
  )
}

export default App

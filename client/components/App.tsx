import Landing from './Landing'
import { Routes, Route } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import List from './List'
import Chart from './Chart'
import UserStats from './UserStats'
import Location from './CardLocation'

function App() {
  
  return (
    <>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/list" element={<List />} />
          <Route path="/chart" element={<UserStats />} />
          <Route path="/location" element={<Location />} />
        </Routes>
        <Footer />
      </div>
    </>
  )
}

export default App

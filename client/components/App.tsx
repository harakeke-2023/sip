import Landing from './Landing'
import { Routes, Route } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import List from './List'
import UserStats from './UserStats'
import MapPage from './MapPage'

function App() {
  return (
    <>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/list" element={<List />} />
          <Route path="/chart" element={<UserStats />} />
          <Route path="/location" element={<MapPage />} />
        </Routes>
        <Footer />
      </div>
    </>
  )
}

export default App

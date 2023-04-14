import Landing from './Landing'
import { Routes, Route } from 'react-router-dom'
import Navbar from './Navbar'
// import Footer from './Footer'
import Popup from './Categorypopup'
import Footer from './Footer'

function App() {
  return (
    <>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/category" element={<Popup />} />
        </Routes>
        <Footer/>
      </div>
    </>
  )
}

export default App

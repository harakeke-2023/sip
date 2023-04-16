import Landing from './Landing'
import { Routes, Route } from 'react-router-dom'
import Navbar from './Navbar'
// import Footer from './Footer'
import CategoryPopup from './Categorypopup'
import Footer from './Footer'
import List from './List'

function App() {
  return (
    <>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/list" element={<List />} />
          {/* <Route path="/category" element={<CategoryPopup />} /> */}
        </Routes>
        <Footer/>
      </div>
    </>
  )
}

export default App

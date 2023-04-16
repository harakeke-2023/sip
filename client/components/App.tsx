import Landing from './Landing'
import { Routes, Route } from 'react-router-dom'
import Navbar from './Navbar'
// import Footer from './Footer'
import CategoryPopup from './Categorypopup'
import Footer from './Footer'

import Cards from './Cards'

import List from './List'
import CardPopup from './Cardpopup'

function App() {
  return (
    <>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/cards"
            element={
              <CardPopup
                existingCard={{
                  id: 0,
                  category_id: 0,
                  user_id: 0,
                  name: '',
                  description: '',
                  date_created: 0, // new Date().valueOf()
                  period: 0,
                  location: '',
                  completed: false,
                  total_count: 0,
                  comp_count: 0,
                }}
              />
            }
          />

          <Route path="/list" element={<List />} />
          {/* <Route
            path="/category"
            element={
              <CategoryPopup
                id={1}
                existingCategory={{
                  user_id: 1,
                  name: 'hello',
                  description: 'world',
                  id: 1,
                }}
              />
            }
          /> */}
        </Routes>
        <Footer />
      </div>
    </>
  )
}

export default App

import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Routes, Route } from 'react-router-dom'

import Landing from './Landing'
import Navbar from './Navbar'
import Footer from './Footer'
import List from './List'
import UserStats from './UserStats'
import MapPage from './MapPage'

function App() {
  return (
    <>
      <DndProvider backend={HTML5Backend}>
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
      </DndProvider>
    </>
  )
}

export default App

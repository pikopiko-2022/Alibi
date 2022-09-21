import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Create from './Create'
import HomePage from './HomePage'

function App() {
  return (
    <div className="app">
      <h1>ALIBI</h1>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </div>
  )
}

export default App

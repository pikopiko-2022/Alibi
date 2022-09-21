import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Create from './Create'

import { fetchFruits } from '../actions'

function App() {
  const fruits = useSelector((state) => state.fruits)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchFruits())
  }, [])

  return (
    <>
      <div className="app">
        <h1>Fullstack Boilerplate - with Fruits!</h1>
        <ul>
          {fruits.map((fruit) => (
            <li key={fruit}>{fruit}</li>
          ))}
        </ul>
        <Create />
      </div>
    </>
  )
}

export default App

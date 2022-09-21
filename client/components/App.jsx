import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

//-----import actions-----
// import { fetchFruits } from '../actions'

function App() {
  //----- useSelector getting state
  // const fruits = useSelector((state) => state.fruits)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch() //actions()
  }, [])

  return (
    <>
      <div className="app">
        <h1>Alibi</h1>
      </div>
    </>
  )
}

export default App

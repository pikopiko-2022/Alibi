
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Nav from './Nav'

//-----import actions-----
// import { fetchFruits } from '../actions'

function App() {
  //----- useSelector getting state
  // const fruits = useSelector((state) => state.fruits)

  // const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(//actions())
  // }, [])

  //if not authenticated take to Signup/login page
  //if authenticated take to registration page
  //if registered take to Home page

  return (
    <>
      <div className="app">
        <h1>Alibi</h1>
        <Nav />

      </div>
    </>
  )
}

export default App

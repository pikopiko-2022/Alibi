<<<<<<< HEAD
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Nav from './Nav'
// import ListUsers from './Users'
import Register from './Registration'
import { useCacheUser } from '../auth0-utils'
import { updateLoggedInUser, clearLoggedInUser } from '../actions/loggedInUser'
import { useAuth0 } from '@auth0/auth0-react'

import { getUser } from '../apis/authentication'
import { useNavigate } from 'react-router-dom'

//-----import actions-----
// import { fetchFruits } from '../actions'

function App() {
  useCacheUser()
  //----- useSelector getting state
  // const fruits = useSelector((state) => state.fruits)

  const dispatch = useDispatch()
  const { isAuthenticated, getAccessTokenSilently } = useAuth0()
  // useEffect(() => {
  //   dispatch(//actions())
  // }, [])
  const navigate = useNavigate()
  //if not authenticated take to Signup/login page
  //if authenticated take to registration page
  //if registered take to Home page

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(clearLoggedInUser())
    } else {
      getAccessTokenSilently()
        .then((token) => {
          // console.log(token)
          return getUser(token)
        })
        .then((userInDb) => {
          userInDb
            ? dispatch(updateLoggedInUser(userInDb))
            : navigate('/register')
        })
        .catch((err) => console.error(err))
    }
  }, [isAuthenticated])

  return (
    <>
      <div className="app">
        <h1>Alibi</h1>
        <Nav />
        {/* <ListUsers /> */}
        <Register />
      </div>
    </>
=======
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
>>>>>>> 4e922c964baf22a5cb67eac6fa6721e9dff05d9f
  )
}

export default App

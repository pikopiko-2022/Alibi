import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Nav from './Nav'
// import ListUsers from './Users'
import Register from './Registration'
import { useCacheUser } from '../auth0-utils'
import { updateLoggedInUser, clearLoggedInUser } from '../actions/loggedInUser'
import { useAuth0 } from '@auth0/auth0-react'

import { getUser } from '../apis/authentication'
import { useNavigate, Routes, Route } from 'react-router-dom'
import HomePage from './HomePage'
import Create from './Create'
import { sendMessage, getRandomNumber } from '../apis/messagesApi'

function App() {
  useCacheUser()

  const dispatch = useDispatch()
  const { isAuthenticated, getAccessTokenSilently } = useAuth0()

  const navigate = useNavigate()

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

  useEffect(() => {
    setTimeout(sendMessage, getRandomNumber(500, 5000))
  }, [])

  return (
    <>
      <div className="app">
        <h1>Alibi</h1>
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<Create />} />
        </Routes>

        {/* <ListUsers /> */}
        <Register />
      </div>
    </>
  )
}
export default App

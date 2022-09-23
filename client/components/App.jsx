import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Nav from './Nav'
import Register from './Registration'
import { useCacheUser } from '../auth0-utils'
import { updateLoggedInUser, clearLoggedInUser } from '../actions/user'
import { useAuth0 } from '@auth0/auth0-react'

import { getUser } from '../apis/authentication'
import { useNavigate, Routes, Route } from 'react-router-dom'
import HomePage from './HomePage'
import Create from './Create'
import { sendMessage, getRandomNumber } from '../apis/messagesApi'

function App() {
  useCacheUser()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuthenticated, getAccessTokenSilently } = useAuth0()
  const token = useSelector((state) => state?.user?.token)

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(clearLoggedInUser())
    } else {
      getAccessTokenSilently()
        .then((token) => getUser(token))
        .then((userInDb) => {
          userInDb
            ? dispatch(updateLoggedInUser(userInDb))
            : navigate('/register')
        })
        .catch((err) => console.error(err))
    }
  }, [isAuthenticated])

  useEffect(() => {
    token &&
      setTimeout(() => {
        console.log('Calling setTimeOut')
        sendMessage(token)
      }, getRandomNumber(500, 5000))
  }, [token])

  return (
    <>
      <div className="app">
        <h1>Alibi</h1>
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<Create />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </>
  )
}
export default App

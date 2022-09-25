import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
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
import { sendMessage, getRandomNumber } from '../apis/messages'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'

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
        <img
          src="https://static.miraheze.org/closinglogosgroupwiki/a/ab/Alibi14.jpeg"
          alt="logo"
        />
        <h1>Alibi</h1>
        <br></br>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <IfAuthenticated>
                  <Register />
                  <HomePage />
                </IfAuthenticated>
                <IfNotAuthenticated>
                  <Nav />
                </IfNotAuthenticated>
              </>
            }
          />
          <Route path="/create" element={<Create />} />
        </Routes>
      </div>
    </>
  )
}
export default App

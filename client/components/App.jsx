import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, Routes, Route } from 'react-router-dom'

import { useAuth0 } from '@auth0/auth0-react'
import { useCacheUser } from '../auth0-utils'

import Nav from './Nav'
import Create from './Create'
import HomePage from './HomePage'
import Register from './Registration'

import { updateLoggedInUser, clearLoggedInUser } from '../actions/loggedInUser'
import { getUser } from '../apis/authentication'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'

function App() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0()

  useCacheUser()
  const navigate = useNavigate()
  const dispatch = useDispatch()

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

  return (
    <>
      <div className="app">
        <h1>Alibi</h1>
        <IfAuthenticated>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<Create />} />
          </Routes>
          <Register />
        </IfAuthenticated>
        <IfNotAuthenticated>
          <Nav />
        </IfNotAuthenticated>
      </div>
    </>
  )
}
export default App

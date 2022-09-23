import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Nav from './Nav'
import Register from './Registration'
import { useCacheUser } from '../auth0-utils'
import { updateLoggedInUser, clearLoggedInUser } from '../actions/user'
import { useAuth0 } from '@auth0/auth0-react'

import { getUser } from '../apis/authentication'
import { useNavigate, Routes, Route } from 'react-router-dom'
import HomePage from './HomePage'
import Create from './Create'

function App() {
  useCacheUser()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuthenticated, getAccessTokenSilently } = useAuth0()

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

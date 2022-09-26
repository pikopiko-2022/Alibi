import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, Routes, Route } from 'react-router-dom'

import { useAuth0 } from '@auth0/auth0-react'
import { useCacheUser } from '../auth0-utils'

import Nav from './Nav'
import Complaint from './Complaint'
import HomePage from './HomePage'
import Register from './Registration'

import { updateLoggedInUser, clearLoggedInUser } from '../actions/user'
import { getUser } from '../apis/userApi'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'
import alibiLogo from '../../server/public/assets/Alibi-Logo.png'

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
        <img src={alibiLogo} alt="logo" />
        <h1>Alibi</h1>
        <Nav />
        <IfAuthenticated>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<Complaint />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </IfAuthenticated>
      </div>
    </>
  )
}
export default App

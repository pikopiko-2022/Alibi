import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Routes, Route } from 'react-router-dom'

import { useAuth0 } from '@auth0/auth0-react'
import { useCacheUser } from '../auth0-utils'
import Nav from './Nav'
import Complaint from './complaints/Complaint'
import HomePage from './HomePage'
import Register from './Registration'
import Waiting from './Waiting'
import TheEnd from './theend/TheEnd'
import ErrorPage from './ErrorPage'

import { fetchMessages } from '../actions/messages'
import { fetchQuestions } from '../actions/questions'
import { fetchLifeG } from '../actions/lifeG'
import { fetchIssues } from '../actions/issues'

import { updateLoggedInUser, clearLoggedInUser } from '../actions/user'
import { getUser } from '../apis/userApi'
import { IfAuthenticated, IfNotAuthenticated } from './widgets/Authenticated'
import SignIn from './SignIn'

function App() {
  useCacheUser()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuthenticated, getAccessTokenSilently } = useAuth0()
  const user = useSelector((state) => state.user)
  const token = useSelector((state) => state.user?.token)

  useEffect(() => {
    if (token) {
      dispatch(fetchIssues())
      dispatch(fetchMessages(token))
      dispatch(fetchQuestions(token))
      dispatch(fetchLifeG(token))
    }
  }, [token])

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
        <IfAuthenticated>
          {user?.id && <Nav />}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/complaint" element={<Complaint />} />
            <Route path="/register" element={<Register />} />
            <Route path="/waiting" element={<Waiting />} />
            <Route path="/theend" element={<TheEnd />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </IfAuthenticated>
        <IfNotAuthenticated>
          <SignIn />
        </IfNotAuthenticated>
      </div>
    </>
  )
}
export default App

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Routes, Route } from 'react-router-dom'
import React, { useEffect } from 'react'

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
import { IfAuthenticated } from './widgets/Authenticated'
import WorstFlatmate from './theend/WorstFlatmate'
import FlatFun from './theend/FlatFun'
import MostComplaints from './theend/MostComplaints'

function App() {
  useCacheUser()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuthenticated, getAccessTokenSilently } = useAuth0()
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
        {/* <img
          src="https://static.miraheze.org/closinglogosgroupwiki/a/ab/Alibi14.jpeg"
          alt="logo"
        /> */}
        <Nav />
        <IfAuthenticated>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/complaint" element={<Complaint />} />
            <Route path="/register" element={<Register />} />
            <Route path="/waiting" element={<Waiting />} />
            <Route path="/theend" element={<TheEnd />} />
            <Route path="/worstflatmate" element={<WorstFlatmate />} />
            <Route path="/flatfun" element={<FlatFun />} />
            <Route path="/mostcomplaints" element={<MostComplaints />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </IfAuthenticated>
      </div>
    </>
  )
}
export default App

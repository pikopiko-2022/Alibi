import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchIssues } from '../actions/issues'
import DisplayUser from './user/DisplayUser'
import Messages from './messages/Messages'
import Flatmates from './flatmates/Flatmates'
import styles from './HomePage.module.scss'
import { fetchMessages } from '../actions/messages'
import { fetchQuestions } from '../actions/questions'
import { fetchLifeG } from '../actions/lifeG'

const HomePage = () => {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.user?.token)
  useEffect(() => {
    if (token) {
      dispatch(fetchIssues())
      dispatch(fetchMessages(token))
      dispatch(fetchQuestions(token))
      dispatch(fetchLifeG(token))
    }
  }, [token])
  return (
    <div className={styles.layout}>
      <DisplayUser />
      <Messages />
      <Flatmates />
    </div>
  )
}

export default HomePage

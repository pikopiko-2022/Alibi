import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchIssues } from '../actions/issues'
import DisplayUser from './user/DisplayUser'
import Messages from './messages/Messages'
import Flatmates from './flatmates/Flatmates'
import styles from './HomePage.module.scss'

const HomePage = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchIssues())
  }, [])
  return (
    <div className={styles.layout}>
      <DisplayUser />
      <Messages />
      <Flatmates />
    </div>
  )
}

export default HomePage

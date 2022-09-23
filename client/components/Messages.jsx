import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from './Messages.module.scss'

const Messages = () => {
  const dispatch = useDispatch()
  const messages = useSelector((state) => state.messages)
  const token = useSelector((state) => state.user?.token)
  useEffect(() => {
    dispatch(fetchMessages(token))
  })
  return <div className={styles.container}>Messages</div>
}

export default Messages

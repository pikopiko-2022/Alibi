import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchMessages } from '../actions/messages'
import styles from './Messages.module.scss'

const Messages = () => {
  const dispatch = useDispatch()
  const messages = useSelector((state) => state.messages)
  const token = useSelector((state) => state.user?.token)
  useEffect(() => {
    dispatch(fetchMessages(token))
  })
  console.log(messages)
  return (
    <div className={styles.container}>
      <div>Messages</div>
      {messages?.map((message) => (
        <div key={message.id}>{message.question_id}</div>
      ))}
    </div>
  )
}

export default Messages

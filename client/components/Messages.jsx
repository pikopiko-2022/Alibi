import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchMessages } from '../actions/messages'
import Question from './Question'
import LifeGuidance from './LifeGuidance'
import styles from './Messages.module.scss'

const Messages = () => {
  const dispatch = useDispatch()
  const messages = useSelector((state) => state.messages)
  const token = useSelector((state) => state.user?.token)
  useEffect(() => {
    token && dispatch(fetchMessages(token))
  }, [token])
  console.log(messages)
  return (
    <div className={styles.messagesContainer}>
      <div className={styles.messagesTitle}>Messages</div>
      {messages?.map((message) =>
        message.question_id ? (
          <Question question={message} />
        ) : (
          <LifeGuidance lifeGuidance={message} />
        )
      )}
    </div>
  )
}

export default Messages

import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchMessages, addMessage } from '../actions/messages'
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

  const testSendMessage = () => {
    dispatch(addMessage(token))
  }

  return (
    <div className={styles.messagesContainer}>
      <div className={styles.messagesTitle}>Messages</div>
      <button onClick={testSendMessage}>Test Send Message</button>
      {messages?.map((message) =>
        message.question_id ? (
          <Question key={message.id} question={message} />
        ) : (
          <LifeGuidance key={message.id} lifeGuidance={message} />
        )
      )}
    </div>
  )
}

export default Messages
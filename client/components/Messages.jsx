import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchMessages, addMessage } from '../actions/messages'
import { fetchQuestions } from '../actions/questions'
import { fetchLifeG } from '../actions/lifeG'
import Question from './Question'
import LifeGuidance from './LifeGuidance'
import styles from './Messages.module.scss'

const Messages = () => {
  const dispatch = useDispatch()
  const messages = useSelector((state) => state.messages)
  const token = useSelector((state) => state.user?.token)

  useEffect(() => {
    if (token) {
      dispatch(fetchMessages(token))
      dispatch(fetchQuestions(token))
      dispatch(fetchLifeG(token))
    }
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
          <Question key={message.id} message={message} />
        ) : (
          <LifeGuidance key={message.id} message={message} />
        )
      )}
    </div>
  )
}

export default Messages

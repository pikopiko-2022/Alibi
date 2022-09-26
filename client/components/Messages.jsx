import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchMessages, addMessage } from '../actions/messages'
import { fetchQuestions } from '../actions/questions'
import { fetchLifeG } from '../actions/lifeG'
import Question from './Question'
import LifeGuidance from './LifeGuidance'
import Message from './Message'
import styles from './Messages.module.scss'
import SendMessage from './SendMessage'
// eslint-disable-next-line import/no-named-as-default
import io from 'socket.io-client'

const Messages = () => {
  const socket = io()
  const dispatch = useDispatch()
  const messages = useSelector((state) => state.messages)
  const token = useSelector((state) => state.user?.token)
  const userId = useSelector((state) => state.user?.id)

  useEffect(() => {
    if (token) {
      dispatch(fetchMessages(token))
      dispatch(fetchQuestions(token))
      dispatch(fetchLifeG(token))
    }
    socket.on('update messages', () => {
      dispatch(fetchMessages(token))
    })
  }, [token])

  const testSendMessage = () => {
    dispatch(addMessage(userId, token))
  }

  return (
    <div className={styles.messagesContainer}>
      <div>
        <div className={styles.messagesTitle}>Messages</div>
        <button onClick={testSendMessage}>Test Send Message</button>
      </div>
      <div className={styles.messagesScrollContainer}>
        {messages?.map((message) =>
          message.question_id ? (
            <Question key={message.id} message={message} />
          ) : message.life_guidance_id ? (
            <LifeGuidance key={message.id} message={message} />
          ) : (
            <Message key={message.id} message={message} />
          )
        )}
      </div>
      <SendMessage />
    </div>
  )
}

export default Messages

import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchMessages, addMessage } from '../../actions/messages'
import Question from './Question'
import LifeGuidance from './LifeGuidance'
import Message from './Message'
import styles from './Messages.module.scss'
import appStyles from '../App.module.scss'
import SendMessage from './SendMessage'
// eslint-disable-next-line import/no-named-as-default
import io from 'socket.io-client'

const Messages = () => {
  const dispatch = useDispatch()
  const messages = useSelector((state) => state.messages)
  const token = useSelector((state) => state.user?.token)
  const userId = useSelector((state) => state.user?.id)

  useEffect(() => {
    const socket = io()
    socket.on('update messages', () => {
      dispatch(fetchMessages(token))
    })
    return () => socket.disconnect()
  }, [token])

  const sendQuestionToUser = () => {
    dispatch(addMessage(userId, token))
  }

  useEffect(() => {
    const messageScrollContainer = document.getElementById('messages')
    if (messageScrollContainer) {
      messageScrollContainer.scrollTop = messageScrollContainer?.scrollHeight
    }
  }, [messages?.length])

  return (
    <div className={styles.messagesContainer}>
      <div>
        <div className={styles.messagesTitle}>Messages</div>
        <button onClick={sendQuestionToUser} className={appStyles.actionButton}>
          Ask Me Anything
        </button>
      </div>
      <div className={styles.messagesScrollContainer} role="log" id="messages">
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

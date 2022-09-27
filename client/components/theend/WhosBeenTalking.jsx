import React, { useState, useEffect } from 'react'
import Message from '../messages/Message'
import { getWhosBeenTalking } from '../../apis/messagesApi'
import styles from './TheEnd.module.scss'
import { useSelector } from 'react-redux'

const WhosBeenTalking = () => {
  const [messages, setMessages] = useState([])
  const token = useSelector((state) => state.user?.token)
  useEffect(() => {
    getWhosBeenTalking(token)
      .then((messages) => {
        setMessages(messages)
      })
      .catch((err) => console.error(err.message))
  }, [])
  return (
    <div className={styles.slideContainer} style={{ backgroundColor: 'green' }}>
      <div className={styles.slideTitle}>{`WHO'S BEEN TALKING ABOUT YOU?`}</div>
      <div className={styles.slideTitle}>
        What were the other flatmates saying behind your back?
      </div>
      {messages?.map((message) => (
        <Message key={message?.id} message={message} />
      ))}
    </div>
  )
}

export default WhosBeenTalking

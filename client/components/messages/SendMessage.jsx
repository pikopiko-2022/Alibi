import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addCustomMessage } from '../../actions/messages'
import styles from './SendMessage.module.scss'

const SendMessage = () => {
  const dispatch = useDispatch()
  const flatmates = useSelector((state) => state.flatmates)
  const user = useSelector((state) => state.user)
  const token = useSelector((state) => state.user?.token)
  const [message, setMessage] = useState('')
  const [recipient, setRecipient] = useState('')
  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(
      addCustomMessage(
        {
          message,
          sender_id: user.id,
          recipient_id: recipient === '' ? null : recipient,
        },
        token
      )
    )
    setMessage('')
  }
  return (
    <form onSubmit={handleSubmit} className={styles.sendMessageContainer}>
      <select value={recipient} onChange={(e) => setRecipient(e.target.value)}>
        <option value={''}>Everyone</option>
        {flatmates?.map((flatmate) => (
          <option key={flatmate.id} value={flatmate.id}>
            {flatmate.name}
          </option>
        ))}
      </select>
      <input
        className={styles.messageInput}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className={styles.sendButton}>{`>`}</button>
    </form>
  )
}

export default SendMessage

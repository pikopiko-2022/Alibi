import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addCustomMessage } from '../../actions/messages'
import styles from './SendMessage.module.scss'

const SendMessage = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const flatmates = useSelector((state) => state.flatmates)
  const token = useSelector((state) => state.user?.token)
  const [recipient, setRecipient] = useState('')
  const [message, setMessage] = useState('')

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
      <select
        className={styles.sendMessageSelect}
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      >
        <option value={''}>Everyone</option>
        {flatmates?.map((flatmate) => (
          <option key={flatmate.id} value={flatmate.id}>
            {flatmate.name}
          </option>
        ))}
      </select>
      <input
        className={styles.sendMessageInput}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={'Type a message...'}
      />
      <button
        className={styles.sendButton}
        disabled={message === ''}
      >{`>`}</button>
    </form>
  )
}

export default SendMessage

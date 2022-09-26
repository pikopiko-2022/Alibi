import React from 'react'
import styles from './Message.module.scss'

const MessageDate = ({ message }) => {
  const date = new Date(message?.date_sent)
  const dateString = date.toLocaleDateString('en-NZ', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: 'numeric',
    second: 'numeric',
  })
  return <div className={styles.messageDate}>{dateString}</div>
}

export default MessageDate

import React from 'react'
import { useSelector } from 'react-redux'
import styles from './Message.module.scss'
import MessageDate from './MessageDate'

const Message = ({ message }) => {
  const userId = useSelector((state) => state.user?.id)
  const flatmates = useSelector((state) => state.flatmates)
  const isMine = message.sender_id === userId
  const recipient =
    message.recipient_id === userId
      ? 'You'
      : flatmates?.find((flatmate) => message.recipient_id === flatmate.id)
          ?.name || 'Everyone'
  const sender = flatmates?.find(
    (flatmate) => message.sender_id === flatmate.id
  )?.name
  return (
    <div
      className={isMine ? styles.myMessageContainer : styles.messageContainer}
    >
      <MessageDate message={message} />
      {!isMine && <div className={styles.messageSender}>{`${sender}`}</div>}
      <div className={styles.messageDetails}>{`Sent to ${recipient}`}</div>
      <div>{message.message}</div>
    </div>
  )
}

export default Message

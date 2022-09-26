import React from 'react'
import { useSelector } from 'react-redux'
import styles from './Message.module.scss'

const Message = ({ message }) => {
  const userId = useSelector((state) => state.user?.id)
  const flatmates = useSelector((state) => state.flatmates)
  const isMine = message.sender_id === userId
  const recipient =
    flatmates?.find((flatmate) => message.recipient_id === flatmate.id)?.name ||
    'Everyone'
  return (
    <div
      className={isMine ? styles.myMessageContainer : styles.messageContainer}
    >
      <div className={styles.messageDetails}>{`Sent to ${recipient}`}</div>
      <div>{message.message}</div>
    </div>
  )
}

export default Message

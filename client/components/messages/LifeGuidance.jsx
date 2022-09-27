import React from 'react'
import styles from './Message.module.scss'
import { useSelector } from 'react-redux'
import MessageDate from './MessageDate'

function LifeGuidance({ message }) {
  const lifeGuidances = useSelector((state) => state.lifeG)
  const lifeGuidance = lifeGuidances?.find(
    (lifeGuidance) => lifeGuidance.id === message.life_guidance_id
  )
  return (
    <div className={styles.messageContainer}>
      <MessageDate message={message} />
      <div className={styles.messageMessage}>{lifeGuidance?.message}</div>
      <a
        href={lifeGuidance.url}
        target="_blank"
        rel="noreferrer"
        className={styles.messageUrl}
      >
        Learn More!
      </a>
    </div>
  )
}

export default LifeGuidance

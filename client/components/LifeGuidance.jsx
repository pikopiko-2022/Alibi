import React from 'react'
import styles from './Message.module.scss'
import { useSelector } from 'react-redux'

function LifeGuidance({ message }) {
  const lifeGuidances = useSelector((state) => state.lifeG)
  const lifeGuidance = lifeGuidances?.find(
    (lifeGuidance) => lifeGuidance.id === message.life_guidance_id
  )
  return (
    <div className={styles.messageContainer}>
      <div className={styles.messageMessage}>{lifeGuidance.message}</div>
      <a href={lifeGuidance.url} className={styles.messageUrl}>
        Learn More!
      </a>
    </div>
  )
}

export default LifeGuidance

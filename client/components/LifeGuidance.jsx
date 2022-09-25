import React from 'react'
import styles from './LifeGuidance.module.scss'
import { useSelector } from 'react-redux'

function LifeGuidance({ message }) {
  const lifeGuidances = useSelector((state) => state.lifeG)
  const lifeGuidance = lifeGuidances?.find(
    (lifeGuidance) => lifeGuidance.id === message.life_guidance_id
  )
  return (
    <div className={styles.lifeGuidanceContainer}>
      <div className={styles.lifeGuidanceMessage}>{lifeGuidance.message}</div>
      <a href={lifeGuidance.url} className={styles.lifeGuidanceUrl}>
        Learn More!
      </a>
    </div>
  )
}

export default LifeGuidance

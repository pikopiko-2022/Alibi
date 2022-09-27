import React from 'react'
import styles from './Minigame.module.scss'

const Timer = ({ time }) => {
  return (
    <div className={styles.timeContainer}>
      <div className={styles.timeText}>{time}</div>
    </div>
  )
}

export default Timer

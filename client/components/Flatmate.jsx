import React from 'react'
import styles from './Flatmate.module.scss'

const Flatmate = ({ flatmate }) => {
  return (
    <div className={styles.flatmateContainer}>
      <img className={styles.flatmateImage} src={flatmate.img_url} alt="user" />
      <div className={styles.flatmateDetailsContainer}>
        <div className={styles.flatmateName}>{flatmate.name}</div>
        <div className={styles.flatmateDescription}>{flatmate.description}</div>
      </div>
    </div>
  )
}

export default Flatmate

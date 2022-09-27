import React from 'react'
import Avatar from '../widgets/Avatar'
import styles from './Flatmate.module.scss'

const Flatmate = ({ flatmate }) => {
  return (
    <div className={styles.flatmateContainer}>
      <Avatar seedData={flatmate.img_seed} size={200} />
      <div className={styles.flatmateDetailsContainer}>
        <div className={styles.flatmateName}>{flatmate.name}</div>
        <div className={styles.flatmateDescription}>{flatmate.description}</div>
        <div className={styles.flatmateRating}>{flatmate.rating}</div>
        <div className={styles.flatmateEnoug}>{flatmate.had_enough}</div>
      </div>
    </div>
  )
}

export default Flatmate

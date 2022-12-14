import React from 'react'
import Avatar from '../widgets/Avatar'
import styles from './Flatmate.module.scss'

const Flatmate = ({ flatmate }) => {
  return (
    <div className={styles.flatmateContainer}>
      <div className={styles.flatmateAvatar}>
        <Avatar seedData={flatmate.img_seed} size={150} />
      </div>
      <div className={styles.flatmateDetailsContainer}>
        <div className={styles.flatmateName}>{flatmate.name}</div>
        <div className={styles.flatmateDescription}>{flatmate.description}</div>
        {flatmate.had_enough ? (
          <div
            className={styles.flatmateEnough}
          >{`This flatmate has left the flat!`}</div>
        ) : (
          <div />
        )}
      </div>
    </div>
  )
}

export default Flatmate

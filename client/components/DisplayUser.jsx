import React from 'react'
import styles from './DisplayUser.module.scss'
import { useSelector } from 'react-redux'
import Rating from './Rating'

const DisplayUser = () => {
  const user = useSelector((state) => state.user)
  return (
    <div className={styles.container}>
      <div className={styles.profileImageContainer}>
        <img
          src={user?.img_url}
          alt="Profile"
          className={styles.profileImage}
        />
      </div>
      <div className={styles.profileName}>{user?.name}</div>
      <div className={styles.profileDescription}>{user?.description}</div>
      <div className={styles.profileRatingContainer}>
        <Rating rating={user?.rating} total={5} />
      </div>
      <div className={styles.flatContainer}>
        <div className={styles.flatName}>{user?.flatName}</div>
        <div className={styles.flatAddress}>{user?.flatAddress}</div>
      </div>
    </div>
  )
}

export default DisplayUser

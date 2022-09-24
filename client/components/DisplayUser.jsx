import React from 'react'
import styles from './DisplayUser.module.scss'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

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
      <div className={styles.profileRatingContainer}>{user.rating}</div>
      <div className={styles.flatContainer}>
        <div className={styles.flatName}>{user?.flatName}</div>
        <div className={styles.flatAddress}>{user?.flatAddress}</div>
      </div>
      <Link to="/create">
        <button>Add Complaint</button>
      </Link>
    </div>
  )
}

export default DisplayUser

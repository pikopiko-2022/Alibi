import React from 'react'
import styles from './DisplayUser.module.scss'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Avatar from '../widgets/Avatar'
import LoadingSpinner from '../widgets/LoadingSpinner'

const DisplayUser = () => {
  const user = useSelector((state) => state.user)

  return (
    <div className={styles.displayUserContainer}>
      {user?.img_url ? (
        <>
          <div className={styles.profileImageContainer}>
            <Avatar seedData={user.img_url} size={300} />
          </div>
          <div className={styles.profileName}>{user?.name}</div>
          <div className={styles.profileDescription}>{user?.description}</div>
          <div className={styles.profileRatingContainer}>{user?.rating}</div>
          <Link to="/complaint">
            <button>Add Complaint</button>
          </Link>
        </>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  )
}

export default DisplayUser

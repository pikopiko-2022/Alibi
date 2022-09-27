import React from 'react'
import styles from './DisplayUser.module.scss'
import { useSelector } from 'react-redux'
import Avatar from '../widgets/Avatar'
import LoadingSpinner from '../widgets/LoadingSpinner'

const DisplayUser = () => {
  const user = useSelector((state) => state.user)
  console.log(user)

  return (
    <div className={styles.displayUserContainer}>
      {user?.img_seed ? (
        <>
          <div className={styles.profileImageContainer}>
            <Avatar seedData={user.img_seed} size={300} />
          </div>
          <div className={styles.profileName}>{user?.name}</div>
          <div className={styles.profileDescription}>{user?.description}</div>
          <div className={styles.profileRatingContainer}>{user?.rating}</div>
        </>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  )
}

export default DisplayUser

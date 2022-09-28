import React from 'react'
import { useSelector } from 'react-redux'
import Avatar from '../widgets/Avatar'
import LoadingSpinner from '../widgets/LoadingSpinner'
import styles from './DisplayUser.module.scss'

const DisplayUser = () => {
  const user = useSelector((state) => state.user)

  return (
    <div className={styles.displayUserContainer}>
      {user?.img_seed ? (
        <>
          <div className={styles.profileImageContainer}>
            <Avatar seedData={user.img_seed} size={200} />
          </div>
          <div className={styles.profileName}>{user?.name}</div>
          <div className={styles.profileDescription}>{user?.description}</div>
        </>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  )
}

export default DisplayUser

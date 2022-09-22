import React, { useEffect } from 'react'
import styles from './DisplayUser.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUser } from '../actions/users'
import Rating from './Rating'

const DisplayUser = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.users.user)
  useEffect(() => {
    dispatch(fetchUser())
  }, [])
  console.log(user)
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
    </div>
  )
}

export default DisplayUser

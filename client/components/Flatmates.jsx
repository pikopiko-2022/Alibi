import React, { useEffect } from 'react'
import Flatmate from './Flatmate'
import styles from './Flatmates.module.scss'
import io from 'socket.io-client'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUsers } from '../actions/users'

const socket = io()

function Flatmates() {
  const dispatch = useDispatch()
  const flatmates = useSelector((state) => state.users)
  const token = useSelector((state) => state.user?.token)
  useEffect(() => {
    dispatch(fetchUsers(token))
  }, [])

  socket.on('users updated', () => dispatch(fetchUsers()))

  return (
    <div className={styles.flatmatesContainer}>
      {flatmates
        .sort((a, b) => b.rating - a.rating)
        .map((flatmate) => (
          <Flatmate key={flatmate.id} flatmate={flatmate} />
        ))}
    </div>
  )
}

export default Flatmates

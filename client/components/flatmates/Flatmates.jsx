// eslint-disable-next-line import/no-named-as-default
import io from 'socket.io-client'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Flat from './Flat'
import Flatmate from './Flatmate'
import { fetchFlatmates } from '../../actions/flatmates'
import styles from './Flatmates.module.scss'

function Flatmates() {
  const socket = io()
  const dispatch = useDispatch()
  const token = useSelector((state) => state.user?.token)
  const flatmates = useSelector((state) => state.flatmates)

  useEffect(() => {
    dispatch(fetchFlatmates(token))
    socket.on('users updated', () => {
      dispatch(fetchFlatmates(token))
    })
  }, [])

  return (
    <div className={styles.flatmatesContainer}>
      <Flat />
      <div className={styles.flatmatesScrollContainer}>
        {flatmates
          ?.sort((a, b) => b.rating - a.rating)
          ?.map((flatmate) => (
            <Flatmate key={flatmate.id} flatmate={flatmate} />
          ))}
      </div>
    </div>
  )
}

export default Flatmates

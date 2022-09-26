import React, { useEffect } from 'react'
import Flatmate from './Flatmate'
import Flat from './Flat'
import styles from './Flatmates.module.scss'
// eslint-disable-next-line import/no-named-as-default
import io from 'socket.io-client'
import { useSelector, useDispatch } from 'react-redux'
import { fetchFlatmates } from '../actions/flatmates'

function Flatmates() {
  const socket = io()
  const dispatch = useDispatch()
  const flatmates = useSelector((state) => state.flatmates)

  const token = useSelector((state) => state.user?.token)
  useEffect(() => {
    dispatch(fetchFlatmates(token))
    socket.on('users updated', () => {
      dispatch(fetchFlatmates(token))
    })
  }, [])

  return (
    <div className={styles.flatmatesContainer}>
      <Flat />
      {flatmates
        ?.sort((a, b) => b.rating - a.rating)
        ?.map((flatmate) => (
          <Flatmate key={flatmate.id} flatmate={flatmate} />
        ))}
    </div>
  )
}

export default Flatmates

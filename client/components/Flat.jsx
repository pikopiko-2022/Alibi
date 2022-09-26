import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFlat } from '../actions/flat'
import LoadingSpinner from './LoadingSpinner'
import styles from './Flat.module.scss'

const Flat = () => {
  const flat = useSelector((state) => state.flat)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchFlat())
  }, [])

  return flat ? (
    <div className={styles.flatContainer}>
      <div className={styles.flatName}>{flat?.name}</div>
      <div className={styles.flatAddress}>{flat?.address}</div>
    </div>
  ) : (
    <LoadingSpinner />
  )
}

export default Flat

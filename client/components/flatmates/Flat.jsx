import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import LoadingSpinner from '../widgets/LoadingSpinner'

import { fetchFlat } from '../../actions/flat'

import styles from './Flat.module.scss'

const Flat = () => {
  const dispatch = useDispatch()
  const flat = useSelector((state) => state.flat)

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

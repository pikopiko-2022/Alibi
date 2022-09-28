import React, { useEffect, useState } from 'react'
import { fetchFlatmates } from '../../actions/flatmates'
import { useSelector, useDispatch } from 'react-redux'
import Avatar from '../widgets/Avatar'
import styles from './TheEnd.module.scss'

const FlatFun = () => {
  const dispatch = useDispatch()
  const flatmates = useSelector((state) => state.flatmates)
  const token = useSelector((state) => state.user?.token)
  const [randomMate, updateRandomMate] = useState({})

  useEffect(() => {
    dispatch(fetchFlatmates(token))
    updateRandomMate(flatmates[Math.floor(Math.random() * flatmates.length)])
  }, [])

  return (
    <div
      className={styles.slideContainer}
      style={{ backgroundColor: '#3B1A8C' }}
    >
      <blockquote>
        <h1 style={{ color: 'white' }}>Flatting is Fun!</h1>
        <cite style={{ color: 'white' }}>-{randomMate.name}</cite>
      </blockquote>
      <div>
        <Avatar seedData={randomMate.img_seed} size={300} />
      </div>
    </div>
  )
}

export default FlatFun

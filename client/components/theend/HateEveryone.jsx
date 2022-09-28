import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Avatar from '../widgets/Avatar'
import styles from './TheEnd.module.scss'
import { fetchFlatmates } from '../../actions/flatmates'

const HateEveryone = () => {
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
      style={{ backgroundColor: '#FFB84C' }}
    >
      <blockquote>
        <h1 style={{ color: 'white', margin: '30px' }}>I Hate Everyone!</h1>
        <cite style={{ color: 'white', margin: '30px' }}>
          -{randomMate.name}
        </cite>
      </blockquote>
      <div>
        <Avatar seedData={randomMate.img_seed} size={300} />
      </div>
    </div>
  )
}

export default HateEveryone

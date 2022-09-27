import React, { useEffect, useState } from 'react'
import { fetchFlatmates } from '../../actions/flatmates'
import { useSelector, useDispatch } from 'react-redux'
import Avatar from '../widgets/Avatar'

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
    <div>
      <blockquote>
        <h1>Who Drank the Last Of My Milk?</h1>
        <cite>-{randomMate.name}</cite>
      </blockquote>
      <div>
        <Avatar seedData={randomMate.img_seed} size={300} />
      </div>
    </div>
  )
}

export default FlatFun

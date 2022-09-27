import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchFlatmates } from '../actions/flatmates'
// eslint-disable-next-line import/no-named-as-default
import io from 'socket.io-client'
import Minigame from './minigame/Minigame'

const Waiting = () => {
  const flatmates = useSelector((state) => state.flatmates)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const socket = io()

  useEffect(() => {
    socket.on('users updated', () => dispatch(fetchFlatmates()))
  }, [])

  const nuclear = () => {
    let count = 0
    flatmates.forEach((element) => {
      if (element.had_enough == false) {
        count++
      }
    })

    if (count == 0) {
      return true
    } else return false
  }

  useEffect(() => {
    if (nuclear()) {
      navigate('/theend')
    } else return null
  }, [flatmates])

  //timeout for manually testing theend slideshow
  // setTimeout(() => navigate('/theend'), 2000)

  return (
    <>
      <div>Your Flatmates Still Like You.......</div>
      <div>Please Wait</div>
      <Minigame />
    </>
  )
}

export default Waiting

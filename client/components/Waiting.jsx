import { useNavigate } from 'react-router-dom'
import React, { useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Minigame from './minigame/Minigame'

import { fetchFlatmates } from '../actions/flatmates'

// eslint-disable-next-line import/no-named-as-default
import io from 'socket.io-client'

const Waiting = () => {
  const socket = io()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const flatmates = useSelector((state) => state.flatmates)
  const gameMusic = useMemo(() => new Audio('/assets/game-music.mp3'), [])

  useEffect(() => {
    socket.on('users updated', () => dispatch(fetchFlatmates()))
  }, [])

  useEffect(() => {
    gameMusic.volume = 0.1
    gameMusic.loop = true
    gameMusic.play()
    return () => {
      gameMusic.pause()
      gameMusic.src = ''
    }
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
  // setTimeout(() => navigate('/theend'), 5000)

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <h2>Your Flatmates Still Like You.......</h2>
        <h3>Please Wait</h3>
      </div>
      <Minigame />
    </>
  )
}

export default Waiting

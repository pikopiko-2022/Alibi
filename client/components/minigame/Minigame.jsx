import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
// eslint-disable-next-line import/no-named-as-default
import io from 'socket.io-client'
import { getRandomNumber } from '../../apis/messagesApi'
import styles from './Minigame.module.scss'
import Player from './Player'
import Timer from './Timer'

const Minigame = () => {
  const height = 600
  const width = 600
  const user = useSelector((state) => state.user)
  const [players, setPlayers] = useState({})
  const [player, setPlayer] = useState({
    top: height / 2,
    left: width / 2,
    debt: getRandomNumber(-8000, -500),
    ...user,
  })
  const [time, setTime] = useState(0)
  const [moving, setMoving] = useState(null)
  const speed = 5

  let socket = useRef(null)

  useEffect(() => {
    socket.current = io()
    socket.current.emit('new player', { player })
    socket.current.on('update player', ({ player }) => {
      setPlayers({ ...players, [`${player.id}`]: player })
    })
    socket.current.on('new player arrived', () =>
      socket.current.emit('update player', { player })
    )
    console.log(player)
    return () => socket.current.disconnect()
  }, [])

  useEffect(() => {
    socket.current.emit('update player', { player })
  }, [player.top, player.left])

  const handleKeyDown = (e) => {
    if (['ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowUp'].includes(e.key)) {
      e.preventDefault()
      if (e.key === 'ArrowDown') setMoving('down')
      else if (e.key === 'ArrowLeft') setMoving('left')
      else if (e.key === 'ArrowRight') setMoving('right')
      else if (e.key === 'ArrowUp') setMoving('up')
    }
  }

  const handleKeyUp = () => {
    setMoving(null)
  }

  const handleMove = () => {
    if (moving === 'down') {
      setPlayer((player) => ({
        ...player,
        top: player.top > height ? 0 : player.top + speed,
      }))
    } else if (moving === 'up') {
      setPlayer((player) => ({
        ...player,
        top: player.top < 0 ? height : player.top - speed,
      }))
    } else if (moving === 'right') {
      setPlayer((player) => ({
        ...player,
        left: player.left > width ? 0 : player.left + speed,
      }))
    } else if (moving === 'left') {
      setPlayer((player) => ({
        ...player,
        left: player.left < 0 ? width : player.left - speed,
      }))
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      handleMove()
      setTime((time) => time + 1)
    }, 100)
    return () => {
      clearTimeout(timer)
    }
  }, [time])

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={styles.minigameContainer}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={0}
    >
      <div>
        <Timer time={time} />
        <div className={styles.minigameStage}>
          <Player player={player} />
          {Object.values(players)?.map((otherPlayer) => (
            <Player key={otherPlayer?.id} player={otherPlayer} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Minigame

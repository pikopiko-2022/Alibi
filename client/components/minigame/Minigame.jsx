import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
// eslint-disable-next-line import/no-named-as-default
import io from 'socket.io-client'
import { getRandomNumber } from '../../apis/messagesApi'
import Coin from './Coin'
import styles from './Minigame.module.scss'
import Money from './Money'
import Player from './Player'

const Minigame = () => {
  const height = 600
  const width = 600
  const user = useSelector((state) => state.user)
  const [players, setPlayers] = useState({})
  const [coins, setCoins] = useState([])
  const [coinTicker, setCoinTicker] = useState(0)
  const [player, setPlayer] = useState({
    top: height / 2,
    left: width / 2,
    debt: getRandomNumber(-8000, -500),
    ...user,
  })
  const [time, setTime] = useState(0)
  const [moving, setMoving] = useState(null)
  const speed = 9

  const createNewCoin = () => {
    setCoins((coins) => [
      ...coins,
      {
        id: `${user?.id}-${coinTicker}`,
        top: getRandomNumber(0, height),
        left: getRandomNumber(0, width),
      },
    ])
    setCoinTicker((coinTicker) => coinTicker + 1)
  }

  let socket = useRef(null)

  useEffect(() => {
    socket.current = io()
    socket.current.emit('new player arrived', { player, coins })
    socket.current.on('update stage', ({ player, coins }) => {
      console.log(player)
      setPlayers({ ...players, [`${player.id}`]: player })
      setCoins(coins)
    })
    socket.current.on('new player arrived', () =>
      socket.current.emit('update stage', { player, coins })
    )
    return () => socket.current.disconnect()
  }, [])

  useEffect(() => {
    socket.current.emit('update stage', { player, coins })
  }, [player.top, player.left, coins.length])

  const handleCollectCoin = (coinId) => {
    setPlayer((player) => ({ ...player, debt: player.debt - 1 }))
    setCoins((coins) => coins.filter((coin) => coinId !== coin.id))
  }

  const checkCollisions = () => {
    let coinId = null
    const radius = 20
    coins.forEach((coin) => {
      if (
        coin.top > player.top - radius &&
        coin.top < player.top + radius &&
        coin.left > player.left - radius &&
        coin.left < player.left + radius
      ) {
        coinId = coin.id
      }
    })
    if (coinId) handleCollectCoin(coinId)
  }

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
    checkCollisions()
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      handleMove()
      setTime((time) => time + 1)
    }, 50)
    return () => {
      clearTimeout(timer)
    }
  }, [time])

  useEffect(() => {
    const timer = setTimeout(() => {
      createNewCoin()
    }, getRandomNumber(2000, 5000))
    return () => {
      clearTimeout(timer)
    }
  }, [coinTicker])

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
        <Money money={player?.debt} />
        <div className={styles.minigameStage}>
          <Player player={player} />
          {Object.values(players)?.map((otherPlayer) => (
            <Player key={otherPlayer?.id} player={otherPlayer} />
          ))}
          {coins?.map((coin) => (
            <Coin key={coin.id} coin={coin} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Minigame

import React, { useState, useEffect, useRef, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { v4 as uuid } from 'uuid'
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

  const dropCoinSound = useMemo(() => new Audio('/assets/coin-drop.wav'), [])
  const getCoinSound = useMemo(() => new Audio('/assets/treasure-coin.wav'), [])

  let socket = useRef(null)

  useEffect(() => {
    socket.current = io()
    socket.current.emit('new player arrived', { player })
    socket.current.on('update player', ({ player }) => {
      setPlayers({ ...players, [`${player.id}`]: player })
    })
    socket.current.on('update coins', ({ coins }) => {
      setCoins(coins)
    })
    socket.current.on('coin collected', ({ coinId }) => {
      handleOtherPlayerCollectsCoin(coinId)
    })
    socket.current.on('coin added', ({ coin }) => {
      handleAddCoin(coin)
    })
    return () => socket.current.disconnect()
  }, [])

  useEffect(() => {
    socket.current.on('new player arrived', () => {
      socket.current.emit('update player', { player })
      socket.current.emit('update coins', { coins })
    })
  }, [player.top, player.left, coins.length])

  useEffect(() => {
    socket.current.emit('update player', { player })
  }, [player.top, player.left])

  const handleCollectCoin = (coinId) => {
    getCoinSound.play()
    setPlayer((player) => ({ ...player, debt: player.debt + 1 }))
    setCoins((coins) => coins.filter((coin) => coinId !== coin.id))
    socket.current.emit('coin collected', { coinId })
  }

  const handleOtherPlayerCollectsCoin = (coinId) => {
    setPlayer((player) => ({ ...player, debt: player.debt - 1 }))
    setCoins((coins) => coins.filter((coin) => coinId !== coin.id))
  }

  const createNewCoin = () => {
    const coin = {
      id: uuid(),
      top: getRandomNumber(0, height),
      left: getRandomNumber(0, width),
    }
    handleAddCoin(coin)
    socket.current.emit('coin added', { coin })
    setCoinTicker((coinTicker) => coinTicker + 1)
  }

  const handleAddCoin = (coin) => {
    dropCoinSound.play()
    setCoins((coins) => [...coins, coin])
  }

  const checkCollisions = () => {
    let coinId = null
    const radius = 25
    const playerOffset = 25
    coins.forEach((coin) => {
      if (
        coin.top > player.top + playerOffset - radius &&
        coin.top < player.top + playerOffset + radius &&
        coin.left > player.left + playerOffset - radius &&
        coin.left < player.left + playerOffset + radius
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
          {coins?.map((coin) => (
            <Coin key={coin.id} coin={coin} />
          ))}
          {Object.values(players)?.map((otherPlayer) => (
            <Player key={otherPlayer?.id} player={otherPlayer} />
          ))}
          <Player player={player} />
        </div>
      </div>
    </div>
  )
}

export default Minigame

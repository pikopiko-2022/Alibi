// eslint-disable-next-line import/no-named-as-default
import io from 'socket.io-client'
import { v4 as uuid } from 'uuid'
import { useSelector } from 'react-redux'
import React, { useState, useEffect, useRef, useMemo } from 'react'
import Coin from './Coin'
import Money from './Money'
import Player from './Player'
import { getRandomNumber } from '../../apis/messagesApi'
import styles from './Minigame.module.scss'

const Minigame = () => {
  const speed = 9
  const width = 600
  const height = 600
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
  const [stunned, setStunned] = useState(false)
  const dropCoinSound = useMemo(() => new Audio('/assets/drop-coin.wav'), [])
  const dropJewelSound = useMemo(() => new Audio('/assets/drop-jewel.wav'), [])
  const dropChestSound = useMemo(() => new Audio('/assets/drop-chest.wav'), [])
  const getCoinSound = useMemo(() => new Audio('/assets/get-coin.wav'), [])
  const getJewelSound = useMemo(() => new Audio('/assets/get-jewel.wav'), [])
  const getChestSound = useMemo(() => new Audio('/assets/get-chest.wav'), [])
  const hitPlayerSound = useMemo(() => new Audio('/assets/scream.mp3'), [])

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
    socket.current.on('coin collected', ({ coin }) => {
      handleOtherPlayerCollectsCoin(coin)
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
    return () => socket.current.off('new player arrived')
  }, [player.top, player.left, coins.length])

  useEffect(() => {
    socket.current.emit('update player', { player })
  }, [player.top, player.left])

  const playDropSound = (coin) => {
    if (coin.type === 'coin') dropCoinSound.play()
    else if (coin.type === 'jewel') dropJewelSound.play()
    else if (coin.type === 'chest') dropChestSound.play()
  }

  const playGetSound = (coin) => {
    if (coin.type === 'coin') getCoinSound.play()
    else if (coin.type === 'jewel') getJewelSound.play()
    else if (coin.type === 'chest') getChestSound.play()
  }

  const handleCollectCoin = (coin) => {
    playGetSound(coin)
    setPlayer((player) => ({ ...player, debt: player.debt + coin.value }))
    setCoins((coins) =>
      coins.filter((coinCollection) => coin.id !== coinCollection.id)
    )
    socket.current.emit('coin collected', { coin })
  }

  const handlePlayerCollision = () => {
    hitPlayerSound.play()
    stunPlayer()
  }

  const handleOtherPlayerCollectsCoin = (otherCoin) => {
    setPlayer((player) => ({ ...player, debt: player.debt - otherCoin.value }))
    setCoins((coins) => coins.filter((coin) => otherCoin.id !== coin.id))
  }

  const createNewCoin = () => {
    const jewelArr = Array.from({ length: 15 }).fill('jewel')
    const coinsArr = Array.from({ length: 50 }).fill('coin')
    const options = [...jewelArr, ...coinsArr, 'chest']
    const type = options[getRandomNumber(0, options.length - 1)]
    const values = { coin: 1, jewel: 5, chest: 20 }
    const coin = {
      id: uuid(),
      top: getRandomNumber(0, height),
      left: getRandomNumber(0, width),
      type,
      value: values[type],
    }
    handleAddCoin(coin)
    socket.current.emit('coin added', { coin })
    setCoinTicker((coinTicker) => coinTicker + 1)
  }

  const handleAddCoin = (coin) => {
    playDropSound(coin)
    setCoins((coins) => [...coins, coin])
  }

  const checkCollisions = () => {
    let coinCollision = null
    let playerCollision = null
    const radius = 25
    const playerOffset = 25
    coins.forEach((coin) => {
      if (
        coin.top > player.top + playerOffset - radius &&
        coin.top < player.top + playerOffset + radius &&
        coin.left > player.left + playerOffset - radius &&
        coin.left < player.left + playerOffset + radius
      ) {
        coinCollision = coin
      }
    })
    Object.values(players)?.forEach((otherPlayer) => {
      if (
        otherPlayer.top > player.top - playerOffset &&
        otherPlayer.top < player.top + playerOffset &&
        otherPlayer.left > player.left - playerOffset &&
        otherPlayer.left < player.left + playerOffset
      ) {
        playerCollision = otherPlayer
      }
    })
    if (coinCollision) handleCollectCoin(coinCollision)
    if (playerCollision) handlePlayerCollision(playerCollision)
  }

  const stunPlayer = () => {
    setStunned(true)
    setTimeout(() => setStunned(false), 1000)
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
    }, getRandomNumber(5000, 10000))
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
          <Player player={player} stunned={stunned} />
        </div>
      </div>
    </div>
  )
}

export default Minigame

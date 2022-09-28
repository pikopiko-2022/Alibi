import React from 'react'
import styles from './Minigame.module.scss'

const Coin = ({ coin }) => {
  return coin.type === 'coin' ? (
    <div
      className={styles.minigameCoin}
      style={{ top: `${coin?.top}px`, left: `${coin?.left}px` }}
    >
      $
    </div>
  ) : coin.type === 'jewel' ? (
    <img
      src={'/assets/jewel.png'}
      className={styles.minigameImage}
      style={{ top: `${coin?.top}px`, left: `${coin?.left}px` }}
    />
  ) : coin.type === 'chest' ? (
    <img
      src={'/assets/treasure.png'}
      className={styles.minigameImage}
      style={{ top: `${coin?.top}px`, left: `${coin?.left}px` }}
    />
  ) : (
    <div />
  )
}

export default Coin

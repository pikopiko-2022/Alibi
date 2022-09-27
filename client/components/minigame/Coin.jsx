import React from 'react'
import styles from './Minigame.module.scss'

const Coin = ({ coin }) => {
  return (
    <div
      className={styles.minigameCoin}
      style={{ top: `${coin?.top}px`, left: `${coin?.left}px` }}
    >
      $
    </div>
  )
}

export default Coin

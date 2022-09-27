import React from 'react'
import styles from './Minigame.module.scss'

const Money = ({ money }) => {
  return (
    <div className={styles.moneyContainer}>
      <div className={styles.moneyText}>Flat Debt: -${Math.abs(money)}</div>
    </div>
  )
}

export default Money

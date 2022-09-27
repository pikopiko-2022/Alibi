import React from 'react'
import Avatar from '../widgets/Avatar'
import styles from './Minigame.module.scss'

const Player = ({ player }) => {
  return (
    <div
      className={styles.minigamePlayer}
      style={{ top: `${player?.top}px`, left: `${player?.left}px` }}
    >
      <Avatar seedData={player?.img_url} size={50} />
    </div>
  )
}

export default Player

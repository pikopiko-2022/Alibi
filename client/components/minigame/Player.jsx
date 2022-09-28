import React from 'react'
import Avatar from '../widgets/Avatar'
import styles from './Minigame.module.scss'

const Player = ({ player, hidden }) => {
  return (
    <div
      className={styles.minigamePlayer}
      style={{
        top: `${player?.top}px`,
        left: `${player?.left}px`,
        visibility: hidden ? 'hidden' : 'visible',
      }}
    >
      <Avatar seedData={player?.img_seed} size={50} />
    </div>
  )
}

export default Player

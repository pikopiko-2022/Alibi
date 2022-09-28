import React, { useMemo } from 'react'
import { getRandomNumber } from '../../apis/messagesApi'
import Avatar from '../widgets/Avatar'
import styles from './Minigame.module.scss'

const Player = ({ player, stunned }) => {
  const animations = [
    'jello',
    'bounce',
    'rubberBand',
    'shakeX',
    'shakeY',
    'headShake',
    'swing',
    'tada',
    'wobble',
  ]
  const animation = useMemo(
    () => animations[getRandomNumber(0, animations.length - 1)],
    [stunned]
  )
  return (
    <div
      className={`${styles.minigamePlayer} ${
        stunned && `animate__animated animate__${animation}`
      }`}
      style={{
        top: `${player?.top}px`,
        left: `${player?.left}px`,
      }}
    >
      <Avatar seedData={player?.img_seed} size={50} />
    </div>
  )
}

export default Player

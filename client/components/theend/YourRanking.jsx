import React from 'react'
import styles from './TheEnd.module.scss'
import { useSelector } from 'react-redux'

const YourRanking = () => {
  const flatmates = useSelector((state) => state.flatmates)
  const user = useSelector((state) => state.user)
  const rank = flatmates
    ?.sort((a, b) => a.rating - b.rating)
    .map((flatmate) => flatmate?.id)
    .indexOf(user?.id)

  const heading =
    rank === 0
      ? `YOU HAVE A LOT OF WORK TO DO! You were the WORST flatmate!`
      : rank === flatmates.length - 1
      ? `GREAT JOB, ${user?.name}! You were the BEST FLATMATE!`
      : `YOU DID OK, ${user?.name}.. You were the #${
          flatmates.length - rank
        } flatmate.`
  const body =
    rank === 0
      ? `Perhaps it's time to have a difficult conversation with your ex-flatmates and apologise?`
      : rank === flatmates.length - 1
      ? `Maybe the others could learn a thing or two from you?`
      : `Continue as you were, you're alright.`

  return (
    <div
      className={styles.slideContainer}
      style={{ backgroundColor: 'orange' }}
    >
      <div className={styles.slideTitle}>{heading}</div>
      <div className={styles.slideText}>{body}</div>
    </div>
  )
}

export default YourRanking

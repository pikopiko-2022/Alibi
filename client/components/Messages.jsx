import React from 'react'
import styles from './Messages.module.scss'
import Question from './Question'

const Messages = () => {
  return (
    <>
      <div className={styles.container}>
        Messages
        <Question />
      </div>
    </>
  )
}

export default Messages

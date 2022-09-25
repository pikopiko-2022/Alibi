import React from 'react'
import Question from './Question'
import styles from './Messages.module.scss'

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

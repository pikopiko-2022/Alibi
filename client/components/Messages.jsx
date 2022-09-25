import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchMessages, addMessage } from '../actions/messages'
import Question from './Question'
import LifeGuidance from './LifeGuidance'
import styles from './Messages.module.scss'

const Messages = () => {
  return (
    <div className={styles.messagesContainer}>
      Messages
      <Question />
    </div>
  )
}

export default Messages

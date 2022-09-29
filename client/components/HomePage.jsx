import React from 'react'

import Messages from './messages/Messages'
import DisplayUser from './user/DisplayUser'
import Flatmates from './flatmates/Flatmates'

import styles from './App.module.scss'

const HomePage = () => {
  return (
    <div className={styles.homepageLayout}>
      <DisplayUser />
      <Messages />
      <Flatmates />
    </div>
  )
}

export default HomePage

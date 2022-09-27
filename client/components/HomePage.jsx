import React from 'react'

import DisplayUser from './user/DisplayUser'
import Messages from './messages/Messages'
import Flatmates from './flatmates/Flatmates'
import styles from './HomePage.module.scss'

const HomePage = () => {
  return (
    <div className={styles.layout}>
      <DisplayUser />
      <Messages />
      <Flatmates />
    </div>
  )
}

export default HomePage

import React from 'react'
import Nav from './Nav'
import DisplayUser from './DisplayUser'
import Messages from './Messages'
import Flatmates from './Flatmates'
import styles from './HomePage.module.scss'

const HomePage = () => {
  return (
    <div className={styles.layout}>
      <Nav />
      <DisplayUser />
      <Messages />
      <Flatmates />
    </div>
  )
}

export default HomePage

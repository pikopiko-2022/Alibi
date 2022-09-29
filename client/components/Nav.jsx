import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { useAuth0 } from '@auth0/auth0-react'

import styles from './App.module.scss'
import navStyles from './Nav.module.scss'

import { updateUserEnough } from '../actions/user'
import { IfAuthenticated } from './widgets/Authenticated'

import videoBg from '../../server/public/videos/purplesmoke.mp4'
import alibiLogo from '../../server/public/assets/Alibi-Logo.png'

function Nav() {
  const { logout } = useAuth0()
  const dispatch = useDispatch()
  const [noNav, setNoNav] = useState(false)
  const token = useSelector((state) => state.user?.token)

  const handleLogOff = (e) => {
    e.preventDefault()
    logout({ returnTo: window.location.origin })
  }

  const handleAbort = () => {
    setNoNav(true)
    dispatch(updateUserEnough(token))
  }

  return (
    !noNav && (
      <div className={navStyles.navContainer}>
        <div className={navStyles.logoContainer}>
          <Link to="/">
            <img className={navStyles.logo} src={alibiLogo} alt="logo" />
          </Link>
        </div>
        <div className={navStyles.actionsContainer}>
          <IfAuthenticated>
            <Link to="/complaint" className={styles.actionButton}>
              Add Complaint
            </Link>
            <div className={styles.spacer} />
            <Link
              to="/waiting"
              className={styles.actionButton}
              onClick={handleAbort}
            >
              {`I've Had Enough`}
            </Link>
            <div className={styles.spacer} />
            <Link to="/" className={styles.actionButton} onClick={handleLogOff}>
              Log off
            </Link>
          </IfAuthenticated>
        </div>
        <div className={navStyles.vidDiv}>
          <video src={videoBg} autoPlay loop muted />
        </div>
      </div>
    )
  )
}

export default Nav

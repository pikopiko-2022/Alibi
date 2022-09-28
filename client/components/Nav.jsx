import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import styles from './Nav.module.scss'
import { updateUserEnough } from '../actions/user'
import { IfAuthenticated, IfNotAuthenticated } from './widgets/Authenticated'
import videoBg from '../../server/public/videos/galaxy.mp4'
import alibiLogo from '../../server/public/assets/Alibi-Logo.png'

function Nav() {
  const { logout, loginWithRedirect } = useAuth0()
  const token = useSelector((state) => state.user?.token)
  const dispatch = useDispatch()
  const [noNav, setNoNav] = useState(false)

  const handleLogOff = (e) => {
    e.preventDefault()
    logout()
  }

  const handleSignIn = (e) => {
    e.preventDefault()
    loginWithRedirect()
  }

  const handleAbort = () => {
    setNoNav(true)
    dispatch(updateUserEnough(token))
  }

  return (
    <div>
      {noNav ? (
        <div></div>
      ) : (
        <div>
          <div className={styles.logo}>
            <div className={styles.vidDiv}>
              <video src={videoBg} autoPlay loop muted />
            </div>
            <div className={styles.content}>
              <Link to="/">
                <img src={alibiLogo} alt="logo" />
              </Link>
            </div>
            <div className={styles.content}>
              <IfAuthenticated>
                <div className={styles.actionsContainer}>
                  <Link to="/complaint">
                    <button className={styles.actionButton}>
                      Add Complaint
                    </button>
                  </Link>
                  <Link to="/waiting">
                    <button
                      className={styles.actionButton}
                      onClick={handleAbort}
                    >{`I've Had Enough`}</button>
                  </Link>
                  <Link to="/">
                    <button
                      className={styles.actionButton}
                      onClick={handleLogOff}
                    >
                      Log off
                    </button>
                  </Link>
                </div>
              </IfAuthenticated>
              <IfNotAuthenticated>
                <Link to="/">
                  <button
                    className={styles.actionButton}
                    onClick={handleSignIn}
                  >
                    Sign In
                  </button>
                </Link>
              </IfNotAuthenticated>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Nav

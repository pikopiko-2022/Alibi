import React from 'react'
// import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import styles from './Nav.module.scss'

import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'

function Nav() {
  const { logout, loginWithRedirect } = useAuth0()

  const handleLogOff = (e) => {
    e.preventDefault()
    console.log('log off')
    logout()
  }

  const handleSignIn = (e) => {
    e.preventDefault()
    console.log('sign in')
    loginWithRedirect()
  }

  const handleAbort = () => {
    // TODO set user property has_aborted to true
  }

  return (
    <div className={styles.navContainer}>
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        <IfAuthenticated>
          <div className={styles.actionsContainer}>
            <Link to="/waiting">
              <button onClick={handleAbort}>{`I've Had Enough`}</button>
            </Link>
            <Link to="/" onClick={handleLogOff}>
              Log off
            </Link>
          </div>
        </IfAuthenticated>
        <IfNotAuthenticated>
          <Link to="/" onClick={handleSignIn}>
            Sign In
          </Link>
        </IfNotAuthenticated>
      </div>
    </div>
  )
}

export default Nav

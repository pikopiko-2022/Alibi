import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import styles from './Nav.module.scss'
import { updateUserEnough } from '../actions/user'
import { IfAuthenticated, IfNotAuthenticated } from './widgets/Authenticated'

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
      )}
    </div>
  )
}

export default Nav

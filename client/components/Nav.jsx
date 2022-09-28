import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import styles from './App.module.scss'
import { updateUserEnough } from '../actions/user'

function Nav() {
  const { logout } = useAuth0()
  const token = useSelector((state) => state.user?.token)
  const dispatch = useDispatch()
  const [noNav, setNoNav] = useState(false)

  const handleLogOff = (e) => {
    e.preventDefault()
    logout()
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
            <Link to="/">
              <h1>ALIBI</h1>
            </Link>
          </div>
          <div className={styles.actionsContainer}>
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
          </div>
        </div>
      )}
    </div>
  )
}

export default Nav

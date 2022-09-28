import React from 'react'
import { Link } from 'react-router-dom'
import styles from './App.module.scss'
import { useAuth0 } from '@auth0/auth0-react'

const SignIn = () => {
  const { loginWithRedirect } = useAuth0()
  const handleSignIn = (e) => {
    e.preventDefault()
    loginWithRedirect()
  }

  return (
    <div className={styles.signInPage}>
      <div className={styles.signInContainer}>
        <h1>ALIBI</h1>
        <Link to="/" className={styles.actionButton} onClick={handleSignIn}>
          Sign In
        </Link>
      </div>
    </div>
  )
}

export default SignIn

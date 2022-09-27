import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Nav.module.scss'
import { useAuth0 } from '@auth0/auth0-react'

const SignIn = () => {
  const { loginWithRedirect } = useAuth0()
  const handleSignIn = (e) => {
    e.preventDefault()
    loginWithRedirect()
  }

  return (
    <div className={styles.signInPage}>
      <h1>ALIBI</h1>
      <Link to="/">
        <button className={styles.actionButton} onClick={handleSignIn}>
          Sign In
        </button>
      </Link>
    </div>
  )
}

export default SignIn

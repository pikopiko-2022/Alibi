import React from 'react'
// import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'

function Nav() {
  const { logout, loginWithRedirect } = useAuth0()

  const handleLogOff = (e) => {
    e.preventDefault()
    logout()
  }

  const handleSignIn = (e) => {
    e.preventDefault()
    loginWithRedirect()
  }

  return (
    <>
      <Link to="/">Home</Link>
      <IfAuthenticated>
        <Link to="/" onClick={handleLogOff}>
          Log off
        </Link>
      </IfAuthenticated>
      <IfNotAuthenticated>
        <Link to="/" onClick={handleSignIn}>
          Sign In
        </Link>
      </IfNotAuthenticated>
    </>
  )
}

export default Nav

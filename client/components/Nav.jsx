import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'

function Nav() {
  const user = useSelector((state) => state.loggedInUser)
  // TODO: call the useAuth0 hook and destructure logout and loginWithRedirect

  const handleLogOff = (e) => {
    e.preventDefault()
    console.log('log off')
  }

  const handleSignIn = (e) => {
    e.preventDefault()
    console.log('sign in')
  }

  return (
    <>
      <>
        <Link to="/">Home</Link>
        <IfAuthenticated>
          <Link to="/" onClick={handleLogOff}>
            Log off
          </Link>
          <p>
            <span role="img" alt={user.icon}>
              {user.icon}
            </span>
            {' ' + user.username}
          </p>
        </IfAuthenticated>
        <IfNotAuthenticated>
          <Link to="/" onClick={handleSignIn}>
            Sign In
          </Link>
        </IfNotAuthenticated>
      </>
      <h1>Fruit FTW!</h1>
    </>
  )
}

export default Nav

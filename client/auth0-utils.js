import { useDispatch, useSelector } from 'react-redux'

import { useAuth0 } from '@auth0/auth0-react'

import { updateLoggedInUser } from './actions/loggedInUser'

export function useCacheUser() {
  const dispatch = useDispatch()
  const tokenInRedux = useSelector((state) =>
    Boolean(state.loggedInUser?.token)
  )

  const { isAuthenticated, getAccessTokenSilently, user } = useAuth0()

  if (isAuthenticated && !tokenInRedux) {
    try {
      getAccessTokenSilently()
        .then((token) => {
          console.log(token)
          const userToSave = {
            auth0Id: user?.sub,
            email: user?.email,
            token,
          }
          dispatch(updateLoggedInUser(userToSave))
        })
        .catch((err) => console.log('err', err))
    } catch (err) {
      console.error(err)
    }
  }
}

import { getUser } from '../apis/authentication'

export const UPDATE_LOGGED_IN_USER = 'UPDATE_LOGGED_IN_USER'
export const CLEAR_LOGGED_IN_USER = 'CLEAR_LOGGED_IN_USER'

export function updateLoggedInUser(userToSave) {
  console.log('loggedInUser action', userToSave)
  return {
    type: UPDATE_LOGGED_IN_USER,
    payload: userToSave,
  }
}

export function clearLoggedInUser() {
  return {
    type: CLEAR_LOGGED_IN_USER,
  }
}

export function fetchUser() {
  return (dispatch) => {
    return getUser()
      .then((user) => dispatch(updateLoggedInUser(user)))
      .catch((err) => console.error(err.message))
  }
}

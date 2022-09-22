import { getUsersApi } from '../apis/usersApi'

export const SET_USERS = 'SET_USERS'

export function setUsers(users) {
  return {
    type: SET_USERS,
    payload: users,
  }
}

export function fetchUsers() {
  return (dispatch) => {
    return getUsersApi()
      .then((users) => {
        dispatch(setUsers(users))
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

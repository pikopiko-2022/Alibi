import { UPDATE_LOGGED_IN_USER, CLEAR_LOGGED_IN_USER } from '../actions/user'

const emptyUser = {}

export default function user(state = emptyUser, action) {
  const { type, payload } = action

  switch (type) {
    case UPDATE_LOGGED_IN_USER:
      return { ...state, ...payload }
    case CLEAR_LOGGED_IN_USER:
      return emptyUser
    default:
      return state
  }
}

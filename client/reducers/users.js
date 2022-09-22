import { SET_USERS, SET_USER } from '../actions/users'

const initialState = { users: [], user: null }

const reducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case SET_USERS:
      return { ...state, users: payload }
    case SET_USER:
      return { ...state, user: payload }
    default:
      return state
  }
}

export default reducer

import { SET_USERS, SET_USER } from '../actions/users'

const initialState = { users: [], user: null }

const reducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case SET_USERS:
<<<<<<< HEAD
      return payload
=======
      return { ...state, users: payload }
    case SET_USER:
      return { ...state, user: payload }
>>>>>>> 4e922c964baf22a5cb67eac6fa6721e9dff05d9f
    default:
      return state
  }
}

export default reducer

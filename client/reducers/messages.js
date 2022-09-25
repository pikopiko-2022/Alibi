import { SET_MESSAGES } from '../actions/messages'

const initialState = []

const reducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case SET_MESSAGES:
      return payload
    default:
      return state
  }
}

export default reducer

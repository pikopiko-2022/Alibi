import { SET_COMPLAINT, SET_COMPLAINTS } from '../actions/complaints'

const initialState = []

const reducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case SET_COMPLAINT:
      return payload

    case SET_COMPLAINTS:
      return payload

    default:
      return state
  }
}

export default reducer

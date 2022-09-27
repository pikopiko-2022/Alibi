import { SET_COMPLAINT } from '../actions/complaints'

const initialState = []

const reducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case SET_COMPLAINT:
      return payload
    default:
      return state
  }
}

export default reducer

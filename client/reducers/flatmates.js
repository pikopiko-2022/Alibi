import { SET_FLATMATES } from '../actions/flatemates'

const initialState = []

const reducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case SET_FLATMATES:
      return payload
    default:
      return state
  }
}

export default reducer

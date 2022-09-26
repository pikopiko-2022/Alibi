import { SET_FLAT } from '../actions/flat'

const initialState = []

const reducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case SET_FLAT:
      return payload

    default:
      return state
  }
}

export default reducer

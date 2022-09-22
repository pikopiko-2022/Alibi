import { SET_FLATS } from '../actions/flats'

const initialState = []

const reducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case SET_FLATS:
      return payload

    default:
      return state
  }
}

export default reducer

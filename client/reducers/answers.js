import { SET_ANSWERS } from '../actions/answers'

const initialState = []

const reducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case SET_ANSWERS:
      return payload

    default:
      return state
  }
}

export default reducer

import { SET_ISSUES } from '../actions/issues'

const initialState = []

const reducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case SET_ISSUES:
      return payload
    default:
      return state
  }
}

export default reducer

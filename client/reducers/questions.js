import { SET_QUESTIONS } from '../actions/questions'

const initialState = []

const reducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case SET_QUESTIONS:
      return payload

    default:
      return state
  }
}

export default reducer

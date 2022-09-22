import { SET_LIFEG } from '../actions/lifeG'

const initialState = []

const reducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case SET_LIFEG:
      return payload

    default:
      return state
  }
}

export default reducer

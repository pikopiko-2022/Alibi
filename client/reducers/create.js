import { SET_ISSUES, SET_COMPLAINT } from '../actions/create'

const initialState = []

const create = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case SET_ISSUES:
      return payload
    case SET_COMPLAINT:
      return payload
    default:
      return state
  }
}

export default create

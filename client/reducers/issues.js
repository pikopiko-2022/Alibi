import { SET_ISSUES } from '../actions/issues'
import { SET_COMPLAINT } from '../actions/complaints'

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

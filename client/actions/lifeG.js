import { getLifeGApi } from '../apis/lifeGApi'

export const SET_LIFEG = 'SET_LIFEG'

export function setLifeG(advice) {
  return {
    type: SET_LIFEG,
    payload: advice,
  }
}

export function fetchLifeG() {
  return (dispatch) => {
    return getLifeGApi()
      .then((advice) => {
        dispatch(setLifeG(advice))
      })
      .catch((err) => {
        console.error(err.message)
      })
  }
}

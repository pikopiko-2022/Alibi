import { getFlatApi } from '../apis/flatApi'

export const SET_FLAT = 'SET_FLAT'

export function setFlat(flat) {
  return {
    type: SET_FLAT,
    payload: flat,
  }
}

export function fetchFlat() {
  return (dispatch) => {
    return getFlatApi()
      .then((flat) => {
        dispatch(setFlat(flat))
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

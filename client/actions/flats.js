import { getFlatsApi } from '../apis/flatsApi'

export const SET_FLATS = 'SET_FLATS'

export function setFlats(flats) {
  return {
    type: SET_FLATS,
    payload: flats,
  }
}

export function fetchAnswers() {
  return (dispatch) => {
    return getFlatsApi()
      .then((flats) => {
        dispatch(setFlats(flats))
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

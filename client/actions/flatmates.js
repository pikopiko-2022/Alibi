import { getflatmatesApi } from '../apis/flatmatesApi'

export const SET_FLATMATES = 'SET_FLATMATES'

export function setFlatmates(flatmates) {
  return {
    type: SET_FLATMATES,
    payload: flatmates,
  }
}

export function fetchFlatmates(token) {
  return (dispatch) => {
    return getflatmatesApi(token)
      .then((flatmates) => {
        dispatch(setFlatmates(flatmates))
      })
      .catch((err) => {
        console.error(err.message)
      })
  }
}

import { getAnswersApi } from '../apis/answersApi'
import { addCulpritToComplaint } from '../apis/complaintsApi'

export const SET_ANSWERS = 'SET_ANSWERS'

export function setAnswers(answers) {
  return {
    type: SET_ANSWERS,
    payload: answers,
  }
}

export function fetchAnswers() {
  return (dispatch) => {
    return getAnswersApi()
      .then((answers) => {
        dispatch(setAnswers(answers))
      })
      .catch((err) => {
        console.error(err.message)
      })
  }
}

export function updateCulprit(complaintId, token) {
  return (dispatch) => {
    return addCulpritToComplaint(complaintId, token)
      .then((answers) => dispatch(setAnswers(answers)))
      .catch((err) => console.error(err.message))
  }
}

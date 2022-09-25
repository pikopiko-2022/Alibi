import { getAnswersApi } from '../apis/answersApi'
import { addCulpritToComplaint } from '../apis/complaints'

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
        console.error(err)
      })
  }
}

//get answers at answers.question_ID

export function updateCulprit(complaintId, culpritId, token) {
  return (dispatch) => {
    return addCulpritToComplaint(complaintId, culpritId, token)
      .then((answers) => dispatch(setAnswers(answers)))
      .catch((err) => console.error(err.message))
  }
}

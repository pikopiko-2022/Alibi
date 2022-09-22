import { getAnswersApi } from '../apis/answersApi'

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

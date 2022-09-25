import { getQuestionsApi } from '../apis/questionsApi'

export const SET_QUESTIONS = 'SET_QUESTIONS'

export function setQuestions(questions) {
  return {
    type: SET_QUESTIONS,
    payload: questions,
  }
}

export function fetchQuestions() {
  return (dispatch) => {
    return getQuestionsApi()
      .then((questions) => dispatch(setQuestions(questions)))
      .catch((err) => {
        console.error(err)
      })
  }
}

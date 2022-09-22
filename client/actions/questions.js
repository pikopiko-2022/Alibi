import { getQuestionsApi } from '../apis/questionsApi'

export const SET_QUESTIONS = 'SET_QUESTIONS'

export function setQuestions(questions) {
  return {
    type: SET_QUESTIONS,
    payload: questions,
  }
}

export function fetchQuestion() {
  return (dispatch) => {
    return getQuestionsApi()
      .then((questions) => {
        dispatch(setQuestions(questions))
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

//get single question_id
//get answers -> at question_id

import { getIssues, getQuestions } from '../apis/create'

export const SET_ISSUES = 'SET_ISSUES'
export const SET_QUESTIONS = 'SET_QUESTIONS'

export function setIssues(issues) {
  return {
    type: SET_ISSUES,
    payload: issues,
  }
}

export function setQuestions(questions) {
  return {
    type: SET_QUESTIONS,
    payload: questions,
  }
}

export function fetchIssues() {
  return (dispatch) => {
    return getIssues().then((issues) => {
      dispatch(setIssues(issues))
    })
  }
}

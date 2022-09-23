import { getIssues } from '../apis/create'

export const SET_ISSUES = 'SET_ISSUES'
export const SET_COMPLAINT = 'SET_COMPLAINT'
//export const SET_QUESTIONS = 'SET_QUESTIONS'

export function setIssues(issues) {
  return {
    type: SET_ISSUES,
    payload: issues,
  }
}

// export function setQuestions(questions) {
//   return {
//     type: SET_QUESTIONS,
//     payload: questions,
//   }
// }

export function setComplaint(complaint) {
  return {
    type: SET_COMPLAINT,
    payload: complaint,
  }
}

export function fetchIssues() {
  return (dispatch) => {
    return getIssues().then((issues) => {
      dispatch(setIssues(issues))
    })
  }
}

// export function fetchComplaint(complaint) {
//   return (dispatch) => {
//     return sendComplaint(complaint).then((complaint) => {
//       dispatch(setComplaint(complaint))
//     })
//   }
// }

import { getIssues } from '../apis/issues'

export const SET_ISSUES = 'SET_ISSUES'

export function setIssues(issues) {
  return {
    type: SET_ISSUES,
    payload: issues,
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

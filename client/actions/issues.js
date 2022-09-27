import { getIssues } from '../apis/issuesApi'

export const SET_ISSUES = 'SET_ISSUES'

export function setIssues(issues) {
  return {
    type: SET_ISSUES,
    payload: issues,
  }
}

export function fetchIssues() {
  return (dispatch) => {
    return getIssues()
      .then((issues) => {
        dispatch(setIssues(issues))
      })
      .catch((err) => {
        console.error(err.message)
      })
  }
}

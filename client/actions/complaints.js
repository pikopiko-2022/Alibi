import { getAllComplaints, getComplaintCount } from '../apis/complaintsApi'

export const SET_COMPLAINT = 'SET_COMPLAINT'
export const SET_COMPLAINTS = 'SET_COMPLAINTS'

export function setComplaint(complaint) {
  return {
    type: SET_COMPLAINT,
    payload: complaint,
  }
}

export function setComplaints(complaints) {
  return {
    type: SET_COMPLAINTS,
    payload: complaints,
  }
}

export function fetchComplaints() {
  return (dispatch) => {
    return getAllComplaints()
      .then((complaints) => {
        dispatch(setComplaints(complaints))
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

export function fetchComplaintCount() {
  return (dispatch) => {
    return getComplaintCount()
      .then((complaints) => {
        dispatch(setComplaints(complaints))
        console.log(complaints)
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

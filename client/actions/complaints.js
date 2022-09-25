export const SET_COMPLAINT = 'SET_COMPLAINT'

export function setComplaint(complaint) {
  return {
    type: SET_COMPLAINT,
    payload: complaint,
  }
}

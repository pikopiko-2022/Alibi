import { setComplaint, SET_COMPLAINT } from '../complaints'

const mockComplaint = {
  issue_id: 1,
  image: null,
  complaint_raised_by: 1,
}

describe('setComplaint', () => {
  it('sets the complaint to be the complaint', () => {
    expect(setComplaint(mockComplaint).type).toBe(SET_COMPLAINT)
    expect(setComplaint(mockComplaint).payload).toBe(mockComplaint)
  })
})

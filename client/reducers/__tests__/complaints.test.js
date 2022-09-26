import { SET_COMPLAINT } from '../../actions/complaints'

import complaints from '../complaints'

const mockComplaints = [
  {
    id: 3,
    issue_id: 3,
    image: null,
    complaint_raised_by: 1,
    date_raised: new Date(Date.now()),
    culprit_id: null,
    resolved: 0,
  },
]

describe('complaints reducer', () => {
  it('returns complaints payload for the type SET_COMPLAINTS', () => {
    expect.assertions(2)
    const action = {
      type: SET_COMPLAINT,
      payload: mockComplaints,
    }
    const initialState = []
    const expectedState = mockComplaints
    const outputState = complaints(initialState, action)
    expect(outputState).toEqual(expectedState)
    expect(outputState).not.toEqual(initialState)
  })
  it('returns the default initial state for an undefined state and no action type.', () => {
    const expectedState = []
    const outputState = complaints(undefined, [])

    expect(outputState).toEqual(expectedState)
  })
})

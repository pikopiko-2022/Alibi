import { SET_MESSAGES } from '../../actions/messages'

import messages from '../messages'

const mockMessages = [
  {
    id: 1,
    complaint_id: 1,
    recipient_id: 2,
    question_id: 6,
    answer_id: 17,
    life_guidance_id: null,
    date_sent: new Date(Date.now()),
    date_responded: new Date(Date.now()),
  },
]

describe('messages reducer', () => {
  it('returns messages payload for the type SET_MESSAGES', () => {
    expect.assertions(2)
    const action = {
      type: SET_MESSAGES,
      payload: mockMessages,
    }
    const initialState = []
    const expectedState = mockMessages
    const outputState = messages(initialState, action)
    expect(outputState).toEqual(expectedState)
    expect(outputState).not.toEqual(initialState)
  })
  it('returns the default initial state for an undefined state and no action type.', () => {
    const expectedState = []
    const outputState = messages(undefined, [])

    expect(outputState).toEqual(expectedState)
  })
})

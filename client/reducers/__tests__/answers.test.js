import { SET_ANSWERS } from '../../actions/answers'

import answers from '../answers'

const mockAnswers = [
  {
    id: 1,
    question_id: 1,
    answer: 'This is a test',
    is_bad: 1,
    is_alibi: 0,
  },
  {
    id: 2,
    question_id: 2,
    answer: 'Test passed',
    is_bad: 0,
    is_alibi: 1,
  },
]

describe('answers reducer', () => {
  it('returns answers payload for the type SET_ANSWERS', () => {
    expect.assertions(2)
    const action = {
      type: SET_ANSWERS,
      payload: mockAnswers,
    }
    const initialState = []
    const expectedState = mockAnswers
    const outputState = answers(initialState, action)
    expect(outputState).toEqual(expectedState)
    expect(outputState).not.toEqual(initialState)
  })
  it('returns the default initial state for an undefined state and no action type.', () => {
    const expectedState = []
    const outputState = answers(undefined, [])

    expect(outputState).toEqual(expectedState)
  })
})

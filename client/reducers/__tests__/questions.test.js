import { SET_QUESTIONS } from '../../actions/questions'

import questions from '../questions'

const mockQuestions = [
  { id: 1, issue_id: 1, question: `This is a test?` },
  { id: 2, issue_id: 1, question: `I think?` },
  { id: 3, issue_id: 1, question: `Wait, is it?` },
  {
    id: 4,
    issue_id: 1,
    question: `I don't know?`,
  },
]

describe('questions reducer', () => {
  it('returns questions payload for the type SET_QUESTIONS', () => {
    expect.assertions(2)
    const action = {
      type: SET_QUESTIONS,
      payload: mockQuestions,
    }
    const initialState = []
    const expectedState = mockQuestions
    const outputState = questions(initialState, action)
    expect(outputState).toEqual(expectedState)
    expect(outputState).not.toEqual(initialState)
  })
  it('returns the default initial state for an undefined state and no action type.', () => {
    const expectedState = []
    const outputState = questions(undefined, [])

    expect(outputState).toEqual(expectedState)
  })
})

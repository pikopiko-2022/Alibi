import { SET_ISSUES } from '../../actions/issues'

import issues from '../issues'

const mockIssues = [
  {
    id: 0,
    name: `Please select an issue being tested`,
    details: null,
  },
  {
    id: 1,
    name: `There's no hot water left being tested`,
    details: `I'm involuntarily doing the Wim Hof method being tested`,
  },
  {
    id: 2,
    name: `Dishes in the sink being tested`,
    details: `I can't make dinner because you used my favourite pan being tested`,
  },
  {
    id: 3,
    name: `Why is the power bill so high being tested`,
    details: `I can't afford avocados because you won't wear socks being tested`,
  },
]

describe('issues reducer', () => {
  it('returns issues payload for the type SET_ISSUES', () => {
    expect.assertions(2)
    const action = {
      type: SET_ISSUES,
      payload: mockIssues,
    }
    const initialState = []
    const expectedState = mockIssues
    const outputState = issues(initialState, action)
    expect(outputState).toEqual(expectedState)
    expect(outputState).not.toEqual(initialState)
  })
  it('returns the default initial state for an undefined state and no action type.', () => {
    const expectedState = []
    const outputState = issues(undefined, [])

    expect(outputState).toEqual(expectedState)
  })
})

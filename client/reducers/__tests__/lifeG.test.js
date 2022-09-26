import { SET_LIFEG } from '../../actions/lifeG'

import lifeG from '../lifeG'

const mockLifeG = [
  {
    id: 1,
    issue_id: 1,
    message: `Here's a handy timer is being tested`,
    url: `https://www.timerminutes.com/7-minutes-timer`,
  },
]

describe('lifeG reducer', () => {
  it('returns lifeG payload for the type SET_LIFEG', () => {
    expect.assertions(2)
    const action = {
      type: SET_LIFEG,
      payload: mockLifeG,
    }
    const initialState = []
    const expectedState = mockLifeG
    const outputState = lifeG(initialState, action)
    expect(outputState).toEqual(expectedState)
    expect(outputState).not.toEqual(initialState)
  })
  it('returns the default initial state for an undefined state and no action type.', () => {
    const expectedState = []
    const outputState = lifeG(undefined, [])

    expect(outputState).toEqual(expectedState)
  })
})

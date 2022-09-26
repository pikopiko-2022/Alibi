import { SET_FLATS } from '../../actions/flats'

import flats from '../flats'

const mockFlats = [
  {
    id: 1,
    name: `Testing the cool kids' pad`,
    address: 'Testing 5 Victoria Court',
  },
]

describe('flats reducer', () => {
  it('returns flats payload for the type SET_FLATS', () => {
    expect.assertions(2)
    const action = {
      type: SET_FLATS,
      payload: mockFlats,
    }
    const initialState = []
    const expectedState = mockFlats
    const outputState = flats(initialState, action)
    expect(outputState).toEqual(expectedState)
    expect(outputState).not.toEqual(initialState)
  })
  it('returns the default initial state for an undefined state and no action type.', () => {
    const expectedState = []
    const outputState = flats(undefined, [])

    expect(outputState).toEqual(expectedState)
  })
})

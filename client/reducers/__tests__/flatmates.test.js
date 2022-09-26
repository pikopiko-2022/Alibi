import { SET_FLATMATES } from '../../actions/flatmates'

import flatmates from '../flatmates'

const mockFlatmates = [
  {
    id: 1,
    auth0_id: 1,
    flat_id: 1,
    name: 'Gertrude Test',
    description: 'lazy and selfish being tested',
    img_url: 'https://pbs.twimg.com/media/EVU8UYAUEAI-csw.jpg',
    rating: 3,
  },
  {
    id: 2,
    auth0_id: 2,
    flat_id: 1,
    name: 'Bartholomeow Test',
    description: 'uptight and controlling being tested',
    img_url:
      'https://imageresizer.static9.net.au/FUR-nf6ZUQBmQ_sBZvb3nRpSy58=/400x0/https%3A%2F%2Fprod.static9.net.au%2Ffs%2F06d1a684-e25e-47e9-98ce-9b18323a0f0e',
    rating: 8,
  },
]

describe('flatmates reducer', () => {
  it('returns flatmates payload for the type SET_FLATMATES', () => {
    expect.assertions(2)
    const action = {
      type: SET_FLATMATES,
      payload: mockFlatmates,
    }
    const initialState = []
    const expectedState = mockFlatmates
    const outputState = flatmates(initialState, action)
    expect(outputState).toEqual(expectedState)
    expect(outputState).not.toEqual(initialState)
  })
  it('returns the default initial state for an undefined state and no action type.', () => {
    const expectedState = []
    const outputState = flatmates(undefined, [])

    expect(outputState).toEqual(expectedState)
  })
})

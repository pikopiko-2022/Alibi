import { setLifeG, fetchLifeG, SET_LIFEG } from '../lifeG'

import { getLifeGApi } from '../../apis/lifeGApi'

jest.mock('../../apis/lifeGApi')

jest.spyOn(console, 'error')

const mockLifeG = [
  {
    id: 1,
    issue_id: 1,
    message: "Here's a handy timer",
    url: 'https://www.timerminutes.com/7-minutes-timer',
  },
  {
    id: 2,
    issue_id: 2,
    message: 'How to hand-wash dishes',
    url: 'https://www.livingonadime.com/hand-wash-dishes/#:~:text=How%20To%20Hand%20Wash%20Dishes%20Rinse%20dishes%20and,%28or%20more%20if%20you%20have%20a%20large%20sink%29.',
  },
]

getLifeGApi.mockReturnValue(Promise.resolve(mockLifeG))

const fakeDispatch = jest.fn()

beforeEach(() => {
  jest.clearAllMocks()
})

describe('setFlat', () => {
  it('sets the flat to be the flat', () => {
    expect(setLifeG(mockLifeG).type).toBe(SET_LIFEG)
    expect(setLifeG(mockLifeG).payload).toBe(mockLifeG)
  })
})

describe('fetchFlat', () => {
  it('dispatches setFlat after api call', () => {
    return fetchLifeG(mockLifeG)(fakeDispatch).then(() => {
      const fakeDispatchAction = fakeDispatch.mock.calls[0][0]
      expect(fakeDispatchAction.type).toBe(SET_LIFEG)
      expect(fakeDispatchAction.payload).toEqual(mockLifeG)
    })
  })
  it('Should console.error if request fails', () => {
    console.error.mockImplementation(() => {})
    getLifeGApi.mockImplementation(() => Promise.reject(new Error('error')))
    return fetchLifeG()(fakeDispatch).then(() => {
      expect(console.error).toHaveBeenCalledWith('error')
    })
  })
})

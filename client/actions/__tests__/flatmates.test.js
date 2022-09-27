import { setFlatmates, fetchFlatmates, SET_FLATMATES } from '../flatmates'

import { getflatmatesApi } from '../../apis/flatmatesApi'

jest.mock('../../apis/flatmatesApi')

jest.spyOn(console, 'error')

const mockFlatmates = [
  {
    id: 1,
    auth0_id: '1',
    flat_id: 1,
    name: 'Gertrude',
    description: 'lazy and selfish',
    img_url: 'https://pbs.twimg.com/media/EVU8UYAUEAI-csw.jpg',
    rating: 5,
  },
  {
    id: 2,
    auth0_id: '2',
    flat_id: 1,
    name: 'Bartholomeow',
    description: 'uptight and controlling',
    img_url:
      'https://imageresizer.static9.net.au/FUR-nf6ZUQBmQ_sBZvb3nRpSy58=/400x0/https%3A%2F%2Fprod.static9.net.au%2Ffs%2F06d1a684-e25e-47e9-98ce-9b18323a0f0e',
    rating: 6,
  },
]

getflatmatesApi.mockReturnValue(Promise.resolve(mockFlatmates))

const fakeDispatch = jest.fn()

beforeEach(() => {
  jest.clearAllMocks()
})

describe('setFlatmates', () => {
  it('sets the flat to be the flat', () => {
    expect(setFlatmates(mockFlatmates).type).toBe(SET_FLATMATES)
    expect(setFlatmates(mockFlatmates).payload).toBe(mockFlatmates)
  })
})
describe('fetchFlatmates', () => {
  it('dispatches setFlatmates after api call', () => {
    return fetchFlatmates(mockFlatmates)(fakeDispatch).then(() => {
      const fakeDispatchAction = fakeDispatch.mock.calls[0][0]
      expect(fakeDispatchAction.type).toBe(SET_FLATMATES)
      expect(fakeDispatchAction.payload).toEqual(mockFlatmates)
    })
  })
  it('Should console.error if request fails', () => {
    console.error.mockImplementation(() => {})
    getflatmatesApi.mockImplementation(() => Promise.reject(new Error('error')))
    return fetchFlatmates()(fakeDispatch).then(() => {
      expect(console.error).toHaveBeenCalledWith('error')
    })
  })
})

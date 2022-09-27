import { setFlat, fetchFlat, SET_FLAT } from '../flat'

import { getFlatApi } from '../../apis/flatApi'

jest.mock('../../apis/flatApi')

jest.spyOn(console, 'error')

const mockFlat = {
  id: 1,
  name: "The cool kids' pad",
  address: '5 Victoria Court',
  date_established: '2022-09-25 21:51:38',
  date_disolved: null,
}

getFlatApi.mockReturnValue(Promise.resolve(mockFlat))

const fakeDispatch = jest.fn()

beforeEach(() => {
  jest.clearAllMocks()
})

describe('setFlat', () => {
  it('sets the flat to be the flat', () => {
    expect(setFlat(mockFlat).type).toBe(SET_FLAT)
    expect(setFlat(mockFlat).payload).toBe(mockFlat)
  })
})

describe('fetchFlat', () => {
  it('dispatches setFlat after api call', () => {
    return fetchFlat(mockFlat)(fakeDispatch).then(() => {
      const fakeDispatchAction = fakeDispatch.mock.calls[0][0]
      expect(fakeDispatchAction.type).toBe(SET_FLAT)
      expect(fakeDispatchAction.payload).toEqual(mockFlat)
    })
  })
  it('Should console.error if request fails', () => {
    console.error.mockImplementation(() => {})
    getFlatApi.mockImplementation(() => Promise.reject(new Error('error')))
    return fetchFlat()(fakeDispatch).then(() => {
      expect(console.error).toHaveBeenCalledWith('error')
    })
  })
})

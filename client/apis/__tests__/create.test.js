import { SET_LOADING, setLoading, SET_ERROR, setError } from '../create'

const setLoadingMockData = false
const mockSetLoading = { type: SET_LOADING, payload: setLoadingMockData }
const setErrorMockData = 'error'
const mockSetError = { type: SET_ERROR, payload: setErrorMockData }

describe('setLoading', () => {
  it('dispatches the SET_LOADING action', () => {
    expect(setLoading(setLoadingMockData)).toEqual(mockSetLoading)
  })
})

describe('setError', () => {
  it('dispatches the SET_ERROR action', () => {
    expect(setError(setErrorMockData)).toEqual(mockSetError)
  })
})

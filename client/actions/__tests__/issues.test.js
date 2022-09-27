import { setIssues, fetchIssues, SET_ISSUES } from '../issues'

import { getIssues } from '../../apis/issuesApi'

jest.mock('../../apis/issuesApi')

jest.spyOn(console, 'error')

const mockIssues = [
  {
    id: 2,
    name: `Testing Dishes in the sink`,
    details: `Testing I can't make dinner because you used my favourite pan`,
  },
  {
    id: 3,
    name: `Testing Why is the power bill so high`,
    details: `Testing I can't afford avocados because you won't wear socks`,
  },
]

getIssues.mockReturnValue(Promise.resolve(mockIssues))

const fakeDispatch = jest.fn()

beforeEach(() => {
  jest.clearAllMocks()
})

describe('setIssues', () => {
  it('sets the issues to be the issues', () => {
    expect(setIssues(mockIssues).type).toBe(SET_ISSUES)
    expect(setIssues(mockIssues).payload).toBe(mockIssues)
  })
})

describe('fetchIssues', () => {
  it('dispatches setIssues after api call', () => {
    return fetchIssues(mockIssues)(fakeDispatch).then(() => {
      const fakeDispatchAction = fakeDispatch.mock.calls[0][0]
      expect(fakeDispatchAction.type).toBe(SET_ISSUES)
      expect(fakeDispatchAction.payload).toEqual(mockIssues)
    })
  })
  it('Should console.error if request fails', () => {
    console.error.mockImplementation(() => {})
    getIssues.mockImplementation(() => Promise.reject(new Error('error')))
    return fetchIssues()(fakeDispatch).then(() => {
      expect(console.error).toHaveBeenCalledWith('error')
    })
  })
})

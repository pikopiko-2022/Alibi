import { fetchIssues, SET_ISSUES } from '../create'

import { getIssues } from '../../apis/create'

jest.spyOn(console, 'error')

jest.mock('../../apis/create')

const mockIssues = [
  {
    id: 1,
    name: "There's no hot water left",
    details: "I'm involuntarily doing the Wim Hof method",
  },
  {
    id: 2,
    name: 'Dishes in the sink',
    details: "I can't make dinner because you used my favourite pan",
  },
  {
    id: 3,
    name: 'Why is the power bill so high',
    details: "I can't afford avocados because you won't wear socks",
  },
]

getIssues.mockReturnValue(Promise.resolve(mockIssues))

const fakeDispatch = jest.fn()
beforeEach(() => {
  jest.clearAllMocks()
})

describe('fetchIssues', () => {
  it('dispatches the mock call and returns the correct type', () => {
    const thunkFn = fetchIssues()
    return thunkFn(fakeDispatch).then(() => {
      const fakeDispatchFirstCallFirstArgument = fakeDispatch.mock.calls[0][0]
      expect(fakeDispatchFirstCallFirstArgument.type).toBe(SET_ISSUES)
      return null
    })
  })
  it('consoles error', () => {
    getIssues.mockImplementation(() =>
      Promise.reject(new Error('mock no worky action'))
    )
    console.error.mockImplementation(() => {})
    return fetchIssues()(fakeDispatch).then(() => {
      expect(console.error).toHaveBeenCalledWith('mock no worky action')
    })
  })
})
